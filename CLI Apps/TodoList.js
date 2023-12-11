import { createInterface } from 'readline'

const todos = []
const show = msg => console.log(msg)
// Welcome Screen + Options
show("\n\t\t----| Welcome to Todo App |----")

const reset = () => {
    showOptions()
}

const getInput = async (Ques) => {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        readline.question(Ques, (input) => {
            resolve(input);
            readline.close();
        });
    });
}
// Add Todo
const addTodo = async () => {
    const input = await getInput('=> Enter Text: ');
    try {
        if (input) {
            todos.push(input)
        }
        console.log('\t\nTodo Added... OK')
    } catch (error) {
        console.log('|Error| => Todo Not Added...\n', error)
    }
    reset()
}
// Delete Todo
const deleteTodo = async () => {
    let deleteIndex = await getInput('=> Enter Todo No.: ')
    try {
        todos.splice(deleteIndex - 1, 1)
        console.log('\t\nTodo Deleted... OK')
    } catch (error) {
        console.log('|Error| => Todo Not deleted...\n', error)
    }
    reset()
}
// View Todos
const showTodos = () => {
    console.log(`\n\t\t--------------------\n`)
    if (todos.length === 0) {
        console.log('\t\tSorry, No Data Yet')
    } else {
        todos.forEach((todo, i) => show(`\t\t ${i + 1}: ${todo}`));
    }
    console.log(`\n\t\t--------------------\n`)
    reset()
}
// Exit Procedure
const exit = () => process.exit(0);
const showOptions = async () => {
    console.log(` 
        a => 'For Add Todo'
        s => 'For Show Todos'
        d => 'For Delete Todo'
        e => 'To Exit'
        `)
    const userOption = await getInput('=> Enter Option: ');

    switch (userOption) {
        case 'a':
            addTodo()
            break;
        case 's':
            showTodos()
            break;
        case 'd':
            deleteTodo()
            break;
        case 'e':
            exit()
            break;

        default:
            console.log('|------- Please Enter valid Option. -------|')
            reset()
            break;
    }
}

showOptions()