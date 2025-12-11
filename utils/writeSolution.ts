import fsPromise from 'node:fs/promises';

export async function writeSolution(pathOfSolution: string, solution: string) {
  try {
    await fsPromise.writeFile(`${pathOfSolution}.txt`, solution);
  } catch (err) {
    console.log(err);
  }
}
