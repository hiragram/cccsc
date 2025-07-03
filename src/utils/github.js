import axios from 'axios';

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
        const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
        files.push({
          path: relativePath,
          name: item.name.replace('.md', ''),
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