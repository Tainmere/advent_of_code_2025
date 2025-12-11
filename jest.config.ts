import type {Config} from 'jest';

const config: Config = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};

export default config;