import axios from 'axios';
import { logWarning } from './errors.js';

// Default documentation files to exclude from command installation
const DEFAULT_EXCLUDED_FILES = [
  'readme',
  'claude'
];

/**
 * Check if a markdown file should be excluded from command installation
 * @param {string} fileName - File name without extension
 * @returns {boolean} True if file should be excluded
 */
export function shouldExcludeFile(fileName) {
  // Handle invalid inputs
  if (typeof fileName !== 'string' || !fileName) {
    return false;
  }
  
  // Simple case-insensitive check
  const normalizedName = fileName.toLowerCase();
  return DEFAULT_EXCLUDED_FILES.includes(normalizedName);
}

export function parseRepositoryPath(repoPath) {
  const parts = repoPath.split('/');
  
  if (parts.length < 2) {
    throw new Error('Invalid repository path format. Expected user/repo or user/repo/command');
  }
  
  const user = parts[0];
  const repo = parts[1];
  const commandPath = parts.slice(2).join('/') || null;
  
  return { user, repo, commandPath };
}

export async function getLatestCommitHash(user, repo, branch = 'main') {
  try {
    const url = `https://api.github.com/repos/${user}/${repo}/branches/${branch}`;
    const response = await axios.get(url);
    return response.data.commit.sha;
  } catch (error) {
    if (error.response?.status === 404) {
      // Try 'master' branch if 'main' doesn't exist
      if (branch === 'main') {
        return await getLatestCommitHash(user, repo, 'master');
      }
      throw new Error(`Repository ${user}/${repo} not found or branch ${branch} does not exist`);
    }
    throw new Error(`Failed to fetch latest commit: ${error.message}`);
  }
}

export async function getRepositoryContents(user, repo, path = '', branch = 'main') {
  const url = `https://api.github.com/repos/${user}/${repo}/contents/${path}`;
  
  try {
    const response = await axios.get(url, {
      params: { ref: branch }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      if (branch !== 'main') {
        throw new Error(`Repository ${user}/${repo} not found, path ${path} does not exist, or branch '${branch}' does not exist`);
      }
      throw new Error(`Repository ${user}/${repo} not found or path ${path} does not exist`);
    }
    throw new Error(`Failed to fetch repository contents: ${error.message}`);
  }
}

export async function getFileContent(user, repo, filePath, branch = 'main') {
  try {
    const contents = await getRepositoryContents(user, repo, filePath, branch);
    
    if (contents.type !== 'file') {
      throw new Error(`${filePath} is not a file`);
    }
    
    const content = Buffer.from(contents.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to get file content: ${error.message}`);
  }
}

export async function findMarkdownFiles(user, repo, basePath = '', branch = 'main') {
  const files = [];
  
  try {
    const contents = await getRepositoryContents(user, repo, basePath, branch);
    
    for (const item of contents) {
      if (item.type === 'file' && item.name.endsWith('.md')) {
        const fileName = item.name.replace('.md', '');
        
        // Skip documentation files
        if (shouldExcludeFile(fileName)) {
          continue;
        }
        
        const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
        files.push({
          path: relativePath,
          name: fileName,
          fullPath: item.path
        });
      } else if (item.type === 'dir') {
        const subPath = basePath ? `${basePath}/${item.name}` : item.name;
        const subFiles = await findMarkdownFiles(user, repo, subPath, branch);
        files.push(...subFiles);
      }
    }
    
    return files;
  } catch (error) {
    throw new Error(`Failed to find markdown files: ${error.message}`);
  }
}

/**
 * Resolves repository revision (commit hash) based on configuration
 * @param {string} user - GitHub username
 * @param {string} repo - Repository name
 * @param {object} repoConfig - Repository configuration object
 * @param {string} [repoConfig.branch] - Branch name (defaults to 'main')
 * @param {string} [repoConfig.version] - Version/tag name
 * @param {string} [repoConfig.tag] - Tag name
 * @returns {Promise<string>} Repository commit hash
 * @throws {Error} If parameters are invalid or repository cannot be resolved
 */
export async function resolveRepositoryRevision(user, repo, repoConfig) {
  // Parameter validation
  if (typeof user !== 'string' || !user.trim()) {
    throw new Error('User parameter must be a non-empty string');
  }
  if (typeof repo !== 'string' || !repo.trim()) {
    throw new Error('Repo parameter must be a non-empty string');
  }
  if (!repoConfig || typeof repoConfig !== 'object') {
    throw new Error('RepoConfig parameter must be an object');
  }
  
  const branch = (repoConfig.branch && typeof repoConfig.branch === 'string') 
    ? repoConfig.branch 
    : 'main';
  
  if (repoConfig.version && typeof repoConfig.version === 'string') {
    const tagName = repoConfig.version.replace(/^[~^>=<\s]+/, '');
    try {
      const response = await axios.get(`https://api.github.com/repos/${user}/${repo}/git/refs/tags/${tagName}`);
      return response.data.object.sha;
    } catch (error) {
      logWarning(`Failed to resolve version ${repoConfig.version} for ${user}/${repo}, falling back to latest commit`);
    }
    return await getLatestCommitHash(user, repo, branch);
  } else if (repoConfig.tag && typeof repoConfig.tag === 'string') {
    try {
      const response = await axios.get(`https://api.github.com/repos/${user}/${repo}/git/refs/tags/${repoConfig.tag}`);
      return response.data.object.sha;
    } catch (error) {
      logWarning(`Failed to resolve tag ${repoConfig.tag} for ${user}/${repo}, falling back to latest commit`);
    }
    return await getLatestCommitHash(user, repo, branch);
  } else {
    return await getLatestCommitHash(user, repo, branch);
  }
}