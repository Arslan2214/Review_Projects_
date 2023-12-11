const expression = process.argv[3]
const regexp = RegExp('pattern');
const tokens = expression.match(/\S+/g);

// console.log(`Result: ${eval(2*3+6)}`)
console.log(`Tokens: ${tokens}`)
