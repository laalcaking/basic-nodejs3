const fs = require('fs');
const stream = require('stream');
const util = require('util');
const program = require('commander');

const TransformChoise = require('./module/choise.js')
const valid = require('./module/valid.js');

const pipeline = util.promisify(stream.pipeline);

const actions = async _ => {
    const {input, output, action} = program.opts();

    if (action !== 'first' && action !== 'secound') {
        process.stderr.write(`Action must be "first" or "secound"\n`);
        process.exit(1);
    }

    valid.isEmpty(input) && process.stdout.write('Enter the text and press ENTER to first/secound task | press CTRL + C to exit: ')

    const ReadableStream = !valid.isEmpty(input) ? fs.createReadStream(input) : process.stdin;
    const WriteableStream = !valid.isEmpty(output) ? fs.createWriteStream((output), { flags: 'a' }) : process.stdout;

    try {
        await pipeline(
          ReadableStream,
          new TransformChoise(action),
          WriteableStream
        );
        process.stdout.write(`Task ${action} was done\n`);
      } catch (e) {
        process.stderr.write(` ${e.message}\n`);
        process.exit(1);
    }

    process.stdin.setEncoding('utf8');
    process.on('exit', _ => console.log("End of program"));
    process.on('SIGINT', _ => { process.exit(0); });
}

program
    .requiredOption('-a --action <action>', 'An action first/secound')
    .option('-i, --input <filename>', 'An input file')
    .option('-o --output <filename>', 'An output file')
    .action(actions)

program.parse(process.argv);