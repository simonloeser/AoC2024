import * as fs from 'fs';


function isSafeReport(report: number[]): boolean {
    if (report.length < 2) {
        return false;
    }
    const isDecreasing = report[0] > report[1];
    const isIncreasing = report[0] < report[1];

    if (!isDecreasing && !isIncreasing) return false;

    for (let i = 0; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        if ((isIncreasing && diff < 0) || (isDecreasing && diff > 0)) {
            return false;
        }
    }
    return true;
}

function countSafeReports(filePath: string, part: number) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    let safeReports = 0;

    for (const line of lines) {
        const report = line.split(/\s+/).map(Number);
        if (part == 1 ? isSafeReport(report) : isSafeWithProblemDampener(report)) {
            safeReports++;
        }
    }
    return safeReports;
}

function isSafeWithProblemDampener(report: number[]): boolean {
    if (isSafeReport(report)) {
        return true;
    }

    for (let i = 0; i < report.length; i++) {
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafeReport(modifiedReport)) {
            return true;
        }
    }
    return false;
}

const filePath = 'day02.txt';
console.log(`[PART 01] Number of safe reports: ${countSafeReports(filePath, 1)}`);
console.log(`[PART 02] Number of safe reports with Problem Dampener: ${countSafeReports(filePath, 2)}`);
