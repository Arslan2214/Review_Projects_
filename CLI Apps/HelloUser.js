const name = process.argv[2] || 'User'
const age = process.argv[3] 

if (age) {
    return console.log(`Hi, I'm ${name} and I'm ${age} years old.`)
}
return console.log(`Hello, ${name}`)
