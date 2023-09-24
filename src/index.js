import fs from 'fs';
import path from 'path';

export default function gendiff(filepath1, filepath2) {
  const fileData1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf8'));
  const fileData2 = JSON.parse(fs.readFileSync(path.resolve(filepath2), 'utf8'));

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
