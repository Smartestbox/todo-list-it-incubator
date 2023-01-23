import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: any) => void
    addTask:(title:string)=>void
    changeTaskStatus:(taskId: string, isDone: boolean) => void
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
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
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
        if(trimmedTitle !== '') {
            props.addTask(title)
        }else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onClickAllHandler = () => props.changeFilter('all')
    const onClickActiveHandler = () => props.changeFilter('active')
    const onClickCompletedHandler = () => props.changeFilter('completed')

    const errorMessage = error && <p style={{color: 'red', fontWeight: 'bold', margin: 0}}>Title is required</p>
    const inputErrorClass = error ? 'input-error' : ''

    // React под капотом автоматически отрисовывает Array как список элементов
    return (
        <div>
            <h3>{props.title}</h3>
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
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''} onClick={onClickActiveHandler}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''} onClick={onClickCompletedHandler}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;