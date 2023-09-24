import { describe, test, expect } from '@jest/globals';

import path from 'path';
import { readFileSync } from 'fs';

import generateDiff from '../src/index.js';

const dirname = process.cwd();

describe('Testing gendiff', () => {
  const getFilePathInFixtures = (filename) => path.join(dirname, '__fixtures__', filename);
  const expectedContent = readFileSync(getFilePathInFixtures('expected.txt'), 'utf-8');

  test('json', () => {
    const pathToFirstFile = getFilePathInFixtures('file1.json');
    const pathToSecondFile = getFilePathInFixtures('file2.json');

    const resultContent = generateDiff(pathToFirstFile, pathToSecondFile);

    expect(resultContent).toBe(expectedContent);
  });
});
