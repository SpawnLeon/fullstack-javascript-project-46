import { describe, test, expect } from '@jest/globals';

import path from 'path';
import { readFileSync } from 'fs';

import generateDiff from '../src/index.js';

const dirname = process.cwd();

describe('Testing gendiff', () => {
  const getFilePathInFixtures = (filename) => path.join(dirname, '__fixtures__', filename);
  const expectedContent = readFileSync(getFilePathInFixtures('expected.txt'), 'utf-8');

  test.each([['json'], ['yml']])('%s files comparison', (extension) => {
    const filepath1 = getFilePathInFixtures(`file1.${extension}`);
    const filepath2 = getFilePathInFixtures(`file2.${extension}`);

    const result = generateDiff(filepath1, filepath2);

    expect(result).toBe(expectedContent);
  });
});
