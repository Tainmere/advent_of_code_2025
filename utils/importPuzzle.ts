import fsPromise from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';

const carriageReturn = '\r';

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs

export const readPuzzleInput = async (path_to_puzzle: string) => {
  const loadingFileMessage = `Loading file '${path_to_puzzle} took`;
  console.time(loadingFileMessage);
  let data = await fsPromise.readFile(path_to_puzzle, { encoding: 'utf8' });
  console.timeEnd(loadingFileMessage);

  return data;
};

export const readMultilinePuzzleInput = async (path_to_puzzle: string) => {
  let dataAsString = await readPuzzleInput(path_to_puzzle);

  if (dataAsString.includes(carriageReturn)) {
    dataAsString = dataAsString.replaceAll(carriageReturn, '');
  }

  const parsingFileMessage = `Parsing file '${path_to_puzzle} took`;
  console.time(parsingFileMessage);
  const data = dataAsString.split('\n');
  console.timeEnd(parsingFileMessage);

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
