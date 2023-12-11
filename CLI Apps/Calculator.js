const expression = process.argv[2]

if (!expression) {
    console.log('\n\tInvalid Expression =>', expression, '\n');
    process.exit(1);
}

// check is there any non-whitespace character
const isAnyCharacter = expression.match(/\S+/g)

if (isAnyCharacter) {
    try {
        const result = eval(expression)      // eval() => built-in-func to solve math-equation
        console.log(`\n\tAnswer: ${result}\n`)
    } catch (error) {
        console.error(`\n|Error|: ${error}\n`)
    }
} else {
    console.log('Please enter a valid expression')
    console.log('Example: node index.js "2 + 2 * 2"')
}
