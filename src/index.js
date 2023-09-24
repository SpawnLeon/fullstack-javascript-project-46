import fs from 'fs';
import path from 'path';
import parseData from './parser.js';

const buildPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);

const getData = (filepath) => {
  const data = fs.readFileSync(buildPath(filepath), 'utf8');
  const fileFormat = getFileFormat(filepath);
  return parseData(data, fileFormat);
};

export default function gendiff(filepath1, filepath2) {
  const fileData1 = getData(filepath1);
  const fileData2 = getData(filepath2);

  const keys = new Set([...Object.keys(fileData1), ...Object.keys(fileData2)]);
  const sortedKeys = [...keys].sort();

  const result = [];

  sortedKeys.forEach((key) => {
    if (!Object.hasOwn(fileData2, key)) {
      result.push(`  - ${key}: ${fileData1[key]}`);
    } else if (!Object.hasOwn(fileData1, key)) {
      result.push(`  + ${key}: ${fileData2[key]}`);
    } else if (fileData1[key] !== fileData2[key]) {
      result.push(`  - ${key}: ${fileData1[key]}`);
      result.push(`  + ${key}: ${fileData2[key]}`);
    } else {
      result.push(`    ${key}: ${fileData1[key]}`);
    }
  });

  // Возвращаем результат в виде отформатированной строки
  return `{\n${result.join('\n')}\n}`;
}
