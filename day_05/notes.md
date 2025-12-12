## Puzzle 1

- split input txt based on empty line
  - first half are the ranges of fresh ingredients
  - second half are the available ingredients
- an ingredient is fresh if it is within a range
  - the range is inclusive on both ends

## Puzzle 2

- just get the count of all fresh ingredients given by the ranges
- pretty much just blowing up the ranges
- main challenge is avoid duplicates
- did some optimization by sorting the ranges by their start and keeping track what the highest fresh ingredient already is
  - no need to insert
- originally used the keys of an object to ensure there's no duplication, but since I already go through ingredients from lowest value to highest and keep track of the highest ingredient, I can just compare to that
- this works for the given test cases, but fails for the puzzle input due to how big the ranges are
  - first range goes from `1183329419271` to `8060935578618`
    - method fails at `1183442233129` with a length of `112813858`

- need to change approach, first need to combine all the ranges and then get how many ingredients they span
  1. e.g. combine `[4,9]`, `[14, 15]` and `[8, 18]` to `[4, 18]`
  2. for a range `[4, 16]` we know that it spans `18 - 4 + 1`, i.e. 15 items
     - need the `+1` as both `18` and the `4` count as fresh ingredients
