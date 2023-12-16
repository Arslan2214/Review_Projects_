import { createContext } from 'react'

export const TodoContext = createContext([])

const TodoProvider = ({ children }) => {
    return (
        <TodoContext>
            {children}
        </TodoContext>
    );
}

export default TodoProvider;