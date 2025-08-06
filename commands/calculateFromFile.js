import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function calculateFromFile(filePath, operation, outputFile) {
  if (!fs.existsSync(filePath)) {
    return { error: 'File not found: ' + filePath };
  }
  let data;
  if (filePath.endsWith('.json')) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      return { error: 'Invalid JSON file.' };
    }
  } else if (filePath.endsWith('.csv')) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      // Normalizează linii cu \n literal (dacă există)
      content = content.replace(/\\n/g, '\n');
      data = parse(content, { columns: true });
    } catch (err) {
      return { error: 'Invalid CSV file.' };
    }
  } else {
    return { error: 'Unsupported file type. Use .csv or .json' };
  }

  const match = operation.match(/sum\(([^)]+)\)/);
  if (match) {
    const col = match[1];
    let sum = 0;
    for (const row of data) {
      const val = parseFloat(row[col]);
      if (!isNaN(val)) sum += val;
    }
    if (outputFile) {
      if (outputFile.endsWith('.json')) {
        fs.writeFileSync(outputFile, JSON.stringify({ column: col, sum }, null, 2));
      } else if (outputFile.endsWith('.csv')) {
        fs.writeFileSync(outputFile, `column,sum\n${col},${sum}\n`);
      } else {
        return { error: 'Unsupported output file type. Use .json or .csv' };
      }
    }
    return { column: col, sum };
  }
  return { error: 'Unsupported operation. Example: sum(column1)' };
}
