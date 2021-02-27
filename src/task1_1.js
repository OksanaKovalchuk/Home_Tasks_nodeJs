console.log('Task1 stdin stdout processing!')

process.stdin.setEncoding('utf8');
process.stdout.write('Enter data: \n');

process.stdin.on('readable', () => {
    var inputString = process.stdin.read();
    if (inputString !== null) {
        process.stdout.write(`${[...inputString].reverse().join("")} \n`);
    }
    process.stdout.write('Enter data: \n');
    process.stdin.resume();
});
