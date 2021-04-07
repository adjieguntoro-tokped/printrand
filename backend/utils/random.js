import { Random } from 'random-js';
import randomstring from 'randomstring';

const random = new Random();

const getAlphabeticalString = (limit) => {
  return randomstring.generate({
    length: limit,
    charset: 'alphabetic',
  });
};

const getAlphanumericString = (limit) => {
  return randomstring.generate({
    length: limit,
    charset: 'alphanumeric'
  });
};

const getRealNumber = (limit) => {
  const real = random.real(-limit, limit);
  const fixer = random.integer(1, 19);

  return real.toFixed(fixer);
}

const getInteger = (limit) => {
  return random.integer(limit, limit*200);
}


export {
  getAlphabeticalString,
  getAlphanumericString,
  getRealNumber,
  getInteger
};