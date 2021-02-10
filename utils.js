import { Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'screen',
);

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const hp = (percentage) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
};

const margin = 5;

export { wp, hp, margin };
