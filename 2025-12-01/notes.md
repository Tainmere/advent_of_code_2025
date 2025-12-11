## Puzzle 1

- figure out password
- unlock a safe
  - digit 0 to 99
  - puzzle input describes number of rotation
    - -> modulo arithmatic?
  - `L` / `R` for Left or RIght
    - `L` -> decrease
    - `R` -> increase
  - 11 + `R8` -> 19
  - 19 + `L19` -> 0
  - dial is initialized at `50`
- _"The actual password is the number of times the dial is left pointing at 0 after any rotation in the sequence."_
  - i.e. count how often we land at `0`

## Puzzle 2

- also count when crossing over 0
  - they explicitly mention high rotations
