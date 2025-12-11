import fsPromise from 'node:fs/promises';
import fs from 'node:fs';

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs

export const readPuzzleInput = async (path_to_puzzle: string) => {
  const data = await fsPromise.readFile(path_to_puzzle, { encoding: 'utf8' });
  return data.split('\n');
};

export const readPuzzleInputAsStream = (path_to_puzzle: string) => {
  const readStream = fs.createReadStream(path_to_puzzle, { encoding: 'utf8' });
  return readStream;
};
