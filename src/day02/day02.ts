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

function countSafeReports(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    let safeReports = 0;

    for (const line of lines) {
        const report = line.split(/\s+/).map(Number);
        if (isSafeReport(report)) {
            safeReports++;
        }
    }
    return safeReports;
}

const filePath = 'day02.txt';
console.log(`[PART 01] Number of safe reports: ${countSafeReports(filePath)}`)
