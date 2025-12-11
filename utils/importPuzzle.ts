import fsPromise from 'node:fs/promises';
import fs from 'node:fs';

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs

export const readPuzzleInput = async (path_to_puzzle: string) => {
  let dataAsString = await fsPromise.readFile(path_to_puzzle, { encoding: 'utf8' });

  const data = dataAsString.split('\n');

  if (data.at(-1) === '') {
    // Last line is empty
    return data.slice(0, -1);
  }
  return data;
};

export const readPuzzleInputAsStream = (path_to_puzzle: string) => {
  const readStream = fs.createReadStream(path_to_puzzle, { encoding: 'utf8' });
  return readStream;
};
