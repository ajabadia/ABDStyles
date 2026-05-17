#!/usr/bin/env node
/**
 * ABDStyles ARCHITECTURAL GUARD - LIBRARY EDITION
 * Checks structural rules and code purity (zero-any) for styling assets.
 */

import fs from 'node:fs';
import path from 'node:path';

const WARN_LINES = 150;
const MAX_LINES = 500;
const roots = ['src'];
const logFile = "abd-audit-results.log";
const phase = process.argv[2] || 'all';

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!['node_modules', '.git', '.next', 'dist'].includes(file)) {
          getAllFiles(fullPath, fileList);
        }
      } else if (['.ts'].includes(path.extname(file))) {
        fileList.push(fullPath);
      }
    });
  } catch (e) {}
  return fileList;
}

let violationCount = 0;
let warningCount = 0;
let highViolations = 0;

function addFinding(severity, pattern, file, line, message, allLines) {
  if (severity === 'HIGH') {
    violationCount++;
    highViolations++;
  } else {
    warningCount++;
  }
  const context = linesContext(allLines, line);
  const report = `\n[${severity}:${pattern}] ${file}:${line}\nMessage: ${message}\n${context}\n`;
  fs.appendFileSync(logFile, report, 'utf8');
}

function linesContext(lines, lineNum) {
  const start = Math.max(0, lineNum - 2);
  const end = Math.min(lines.length, lineNum + 1);
  return lines.slice(start, end).map((l, i) => {
    const currentLine = start + i + 1;
    const prefix = currentLine === lineNum ? '> ' : '  ';
    return `${prefix}${currentLine.toString().padStart(3)} | ${l.trim()}`;
  }).join('\n');
}

try {
  const allFiles = roots.flatMap(root => getAllFiles(path.resolve(root)));
  const totalFiles = allFiles.length;

  allFiles.forEach((filePath, index) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    const relPath = path.relative(process.cwd(), filePath);

    // Structural length checks
    if (phase === 'all' || phase === 'structural') {
      if (lines.length > MAX_LINES) {
        addFinding('HIGH', 'STYLE:MAX_LINES', relPath, 1, `CRITICAL: File too long (${lines.length} lines).`, lines);
      } else if (lines.length > WARN_LINES) {
        addFinding('MEDIUM', 'STYLE:LARGE_FILE', relPath, 1, `WARNING: File is long (${lines.length} lines).`, lines);
      }
    }

    // Purity Checks (No 'any')
    if (phase === 'all' || phase === 'purity') {
      lines.forEach((line, idx) => {
        if (line.includes(': any') || line.includes('as any')) {
          if (!line.includes('//') && !line.includes('unknown as any') && !line.includes('config: unknown')) {
            addFinding('HIGH', 'STYLE:PURITY', relPath, idx + 1, 'Avoid usage of "any" type definitions.', lines);
          }
        }
      });
    }

    // PROGRESS:FILE_INDEX:TOTAL_FILES:ERRORS:WARNINGS
    process.stdout.write(`PROGRESS:${index + 1}:${totalFiles}:${violationCount}:${warningCount}\n`);
  });

  if (highViolations > 0) process.exit(1);
  process.exit(0);

} catch (err) {
  fs.appendFileSync(logFile, `FATAL: ${err.message}\n`);
  process.exit(1);
}
