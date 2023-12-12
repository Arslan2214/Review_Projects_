const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const getAlpha = (len) => {
    const arr = []
    for (let i = 0; i <= len; i++) {
        arr.push(alphabet[Math.floor(Math.random() * len)])
    }
    return arr.join('');
}

(() => {
    const len = process.argv[3];
    const formate = process.argv[2];
    let numNo = 18 - len +1;


    // Explanation:
    // 1. Math.random(): Generates a random number between 0 and 1.
    // 2. .toString(36): Converts the random number to a base-36 string (using alphanumeric characters).
    // 3. .slice(2): Removes the '0.' part from the beginning of the string.

    switch (formate) {
        case 'alphaNum':
            numNo -= 5;
            console.log(Math.random().toString(36).slice(numNo));
            process.exit(0);
        case 'alpha':
            console.log(getAlpha(len - 1))
            process.exit(0);
        case 'hex':
            console.log(Math.random().toString(16).slice(numNo));
            process.exit(0);
        case 'oct':
            console.log(Math.random().toString(8).slice(numNo));
            process.exit(0);
        case 'bin':
            console.log(Math.random().toString(2).slice(numNo));
            process.exit(0);
        default:
            console.log(Math.random().toString(9).slice(numNo));
            process.exit(0);
    }
})();