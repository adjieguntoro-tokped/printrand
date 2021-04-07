import express from 'express';
import cors from 'cors';
import { Random } from 'random-js';
import bytes from 'bytes';
import fs from 'fs';
import path from 'path';
import {
  getAlphabeticalString,
  getAlphanumericString,
  getRealNumber,
  getInteger
} from './utils/random.js';


const app = express();
const port = 3001;

app.use(cors());

const random = new Random();

// const MAX_SIZE = 2097152; // 2MB
const MAX_SIZE = 1024*1024*2; // 2MB

const randomStuff = [getAlphabeticalString, getAlphanumericString, getRealNumber, getInteger];

const randomToFile = (content, filename) => {
  // fs.renameSync(`./assets/${filename}.txt`, './assets/therandobject.txt.bak');
  fs.appendFileSync(`./assets/${filename}.txt`, content, err => {
    if(err) {
      throw err;
    }

    console.log('The random file is saved!!!');
  })
}

const generateTheRandomObject = () => {
  const results = [];
  const counter = [0,0,0,0];

  const timestamp = Date.now();

  while(String(results).length < MAX_SIZE) {

    let randomLimit = random.integer(5555, 55555);
    const currentLength = String(results).length;

    const currentDiff = MAX_SIZE - currentLength - 1;

    // check diff
    if (currentDiff === 0) {
      break;
    };

    randomLimit = randomLimit > currentDiff ? currentDiff : randomLimit;

    const randomPick = random.integer(0, randomStuff.length - 1);
    const doRandom = randomStuff[randomPick];
    counter[randomPick] = counter[randomPick] + 1;
    let doRandomRes = doRandom(randomLimit);

    while (randomLimit !== 0 && String(doRandomRes).length > randomLimit) {
      const randomPick = random.integer(0, randomStuff.length - 1);
      const doRandom = randomStuff[randomPick];
      counter[randomPick] = counter[randomPick] + 1;
      doRandomRes = doRandom(randomLimit);
    }

    results.push(doRandomRes);
  }

  const resultToString = String(results.join(','));

  console.log('File size: ', bytes(resultToString.length), counter);

  randomToFile(resultToString, timestamp);

  return {
    alphabetical: counter[0],
    alphanumeric: counter[1],
    real: counter[2],
    integer: counter[3],
    file: `http://localhost:3001/files/${timestamp}`
  }
}


app.get('/generate', (req, res) => {

  const results = generateTheRandomObject();

  res.send(results);
});

app.get('/files/:filename', (req, res, next) => {
  const filePath = path.resolve('assets', `${req.params.filename}.txt`);

  res.download(filePath, function (err) {
    if (!err) return; // file sent

    if (err.status !== 404) return next(err); // non-404 error

    // file for download not found
    res.statusCode = 404;

    res.send('Cant find that file, sorry!');
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});