import * as fs from 'fs';

function calculateTotalDistance(leftList: number[], rightList: number[]): number {
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }
  return totalDistance;
}

function readFileToList(filePath: string): { leftList: number[], rightList: number[] } {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    const leftList: number[] = [];
    const rightList: number[] = [];

    for (const line of lines) {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    }
    return { leftList, rightList };
}

function calculateSimilarityScore(leftList: number[], rightList: number[]): number {
    const frequencyMap = new Map<number, number>();

    for (const num of rightList) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let similarityScore = 0;
    for (const num of leftList) {
        const count = frequencyMap.get(num) || 0;
        similarityScore += num * count;
    }

    return similarityScore;
}

const filePath = 'day01.txt';
const { leftList, rightList } = readFileToList(filePath);

const totalDistance = calculateTotalDistance(leftList, rightList);
console.log(`[PART 01] The total distance is: ${totalDistance}`);

const similarityScore = calculateSimilarityScore(leftList, rightList);
console.log(`[PART 02] The similarity score is: ${similarityScore}`)
