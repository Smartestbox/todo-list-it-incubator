import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import './App.css';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: any, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoList: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    let tasksList = props.tasks.length
        ? props.tasks.map((task: TaskType, index) => {
            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const taskClass = task.isDone ? 'task-done' : ''
            return (
                <li key={index} className={taskClass}>
                    <input onChange={changeTaskStatus} type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(title, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    // const handlerCreator = (filter: FilterValuesType): () => void =
    const onClickAllHandler = () => props.changeTodoListFilter('all', props.todoListId)
    const onClickActiveHandler = () => props.changeTodoListFilter('active', props.todoListId)
    const onClickCompletedHandler = () => props.changeTodoListFilter('completed', props.todoListId)

    const errorMessage = error && <p style={{color: 'red', fontWeight: 'bold', margin: 0}}>Title is required</p>
    const inputErrorClass = error ? 'input-error' : ''
    const removeTodoList = () => props.removeTodoList(props.todoListId, props.todoListId)


    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    type='text'
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={inputErrorClass}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''} onClick={onClickAllHandler}
                >
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''} onClick={onClickActiveHandler}
                >
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''} onClick={onClickCompletedHandler}
                >
                    Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;