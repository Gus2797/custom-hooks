import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const initialState = [
    // {
        //     id: new Date().getTime(),
        //     description: 'Recolectar la piedra del alma',
        //     done: false,
        // },
    ];
    
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
    
export const useTodos = () => {
    
    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);
    
    useEffect(() => {
        // console.log(todos);
        localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos])
    
    const handleNewTodo = ( todo ) => {
        // console.log({ todo });
        dispatchTodo({
            type: '[TODO] Add Todo',
            payload: todo
        });
    }

    const handleDeleteTodo = (id) => {
        // console.log({ id });
        dispatchTodo({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = (id) => {
        // console.log({ id });
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    return {
        todos, 
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
        handleNewTodo, 
        handleDeleteTodo, 
        handleToggleTodo
    }
}
