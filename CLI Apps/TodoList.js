import { createInterface } from 'readline'

const todos = []
const show = msg => console.log(msg)

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

const addTodo = async () => {
    const input = await getInput('=> Enter Text: ');
    try {
        if (input) {
            todos.push(input)
        }
        show('\t\nTodo Added... OK')
    } catch (error) {
        show('|Error| => Todo Not Added...\n', error)
    }
    reset()
}

const deleteTodo = async () => {
    let deleteIndex = await getInput('=> Enter Todo No.: ')
    try {
        todos.splice(deleteIndex - 1, 1)
        show('\t\nTodo Deleted... OK')
    } catch (error) {
        show('|Error| => Todo Not deleted...\n', error)
    }
    reset()
}

const showTodos = () => {
    show(`\n\t\t--------------------\n`)
    if (todos.length === 0) {
        show('\t\tSorry, No Data Yet')
    } else {
        todos.forEach((todo, i) => show(`\t\t ${i + 1}: ${todo}`));
    }
    show(`\n\t\t--------------------\n`)
    reset()
}

const exit = () => process.exit(0);
const showOptions = async () => {
    show(` 
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
            show('\n|------- Please Enter valid Option. -------|')
            reset()
            break;
    }
}

showOptions()