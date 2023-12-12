const input = document.querySelector('#inputTodo');
const getById = id => document.getElementById(id);
const todos_List = document.querySelector('#todo_List');


const addTodo = () => {
    event.preventDefault();

    if (/^\s*$/.test(input.value)) {
        return alert('Invalid Input\n(Please write some Charecters)');
    }
    const newTodo = document.createElement('li');
    newTodo.setAttribute('id', Math.random().toString(36).slice(4))
    newTodo.classList.add('todo');

    newTodo.innerHTML = `<p class="text">${input.value}</p>
    <div class="btnContainer">
    <button onclick="editTodo(event)" id="editBtn"><i class="fa-regular fa-pen-to-square"></i></button>
    <button onclick="deleteTodo(event)" id="deleteBtn"><i class="fa-solid fa-minus"></i></button>
    </div>`;

    todos_List.appendChild(newTodo);
    console.log('Todo addded ...OK');
    input.value = '';
}

const deleteTodo = (e) => {
    e.target.parentElement.parentElement.parentElement.remove();
    console.log('Todo Deleted ...OK');
}

const editTodo = (e) => {

    const idToChange = e.target.parentElement.parentElement.parentElement.id;
    input.focus()
    input.value = getById(idToChange).children[0].innerText

    getById('goEditBtn').style.display = 'inline-block';
    getById('addBtn').style.display = 'none';

    getById('goEditBtn').onclick = () => {
        event.preventDefault();

        getById(idToChange).children[0].innerText = input.value;
        input.value = '';

        getById('goEditBtn').style.display = 'none';
        getById('addBtn').style.display = 'inline-block';
    };
    console.log('Todo Edited ...OK');
};