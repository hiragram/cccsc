import { describe, test, expect } from 'vitest';
import { parseRepositoryPath, shouldExcludeFile } from '../../src/utils/github.js';

describe('GitHub Utils - Simple Tests', () => {
  describe('parseRepositoryPath', () => {
    test('should parse user/repo format', () => {
      const result = parseRepositoryPath('user/repo');
      expect(result).toEqual({
        user: 'user',
        repo: 'repo',
        commandPath: null
      });
    });

    test('should parse user/repo/command format', () => {
      const result = parseRepositoryPath('user/repo/command');
      expect(result).toEqual({
        user: 'user',
        repo: 'repo',
        commandPath: 'command'
      });
    });

    test('should parse user/repo/path/to/command format', () => {
      const result = parseRepositoryPath('user/repo/path/to/command');
      expect(result).toEqual({
        user: 'user',
        repo: 'repo',
        commandPath: 'path/to/command'
      });
    });

    test('should throw error for invalid format', () => {
      expect(() => parseRepositoryPath('invalid')).toThrow('Invalid repository path format. Expected user/repo or user/repo/command');
      expect(() => parseRepositoryPath('')).toThrow('Invalid repository path format. Expected user/repo or user/repo/command');
    });
  });

  describe('shouldExcludeFile', () => {
    test('should exclude README and CLAUDE files', () => {
      expect(shouldExcludeFile('README')).toBe(true);
      expect(shouldExcludeFile('readme')).toBe(true);
      expect(shouldExcludeFile('CLAUDE')).toBe(true);
      expect(shouldExcludeFile('claude')).toBe(true);
    });

    test('should not exclude command files', () => {
      expect(shouldExcludeFile('NOT_TO_INCLUDE_FILE')).toBe(false);
    });

    test('should handle invalid input', () => {
      expect(shouldExcludeFile('')).toBe(false);
      expect(shouldExcludeFile(null)).toBe(false);
      expect(shouldExcludeFile(undefined)).toBe(false);
    });
  });
});