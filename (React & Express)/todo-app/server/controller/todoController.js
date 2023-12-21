const Todo = require('../model/todo.js')

const showTodos = async (req, res) => {
    if (Object.keys(req.query).length <= 0) {
        try {
            const todos = await Todo.find()
            if (todos.length === 0) {
                console.log(todos)
                return res.send('No Todos Found')
            }
            res.send(todos);
            return
        } catch (error) {
            throw error
        }
    }
    const todos = await Todo.find(req.query)
    res.json(todos);
}

const viewTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id })
        res.json(todo);
    } catch (error) {
        throw error
    }
}

const createTodo = async (req, res) => {
    try {
        const { title, discription, tags = [], status = false } = req.body
        const todo = await Todo({
            title: title,
            discription: discription,
            tags: tags,
            status: status,
        })
        await todo.save()
        res.json(todo);
        console.log("Todo Created ... Ok")
    } catch (error) {
        throw error
    }
}

const updateTodo = async (req, res) => {
    try {
        const pvrsTodo = await Todo.findById({ _id: req.params.id })
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { pvrsTodo, ...req.body }, { new: true })
        res.json(updatedTodo);
        console.log("Todo Updated ... Ok")
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete({ _id: req.params.id })
        res.json(todo);
        console.log("Todo Deleted ... Ok")
    } catch (error) {
        throw error;
    }
}

module.exports = { showTodos, viewTodo, createTodo, updateTodo, deleteTodo }