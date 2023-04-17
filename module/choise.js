import { Transform } from 'stream';

import { removeDuplicates } from './first.js';
import { sortOddNumbers } from './second.js';

class TransformChoise extends Transform {
  constructor(action) {
    super();
    this.action = action;
  }

  _transform(chunk, _, done) {
    let result = '';

    switch (this.action) {
      case 'first':
        result = removeDuplicates(chunk.toString('utf8'));
        break;
      case 'secound':
        result = sortOddNumbers(chunk.toString('utf8'));
        break;
      default:
        process.stderr.write(' Erorr: Action not found\n');
        process.exit(1);
    }

    this.push(result);
    done();
  }
}

export default TransformChoise;