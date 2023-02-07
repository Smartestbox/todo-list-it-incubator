import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import './App.css';
import AddItemForm from "./AddItemForm";
import EtitableSpan from "./EtitableSpan";

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: any, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    removeTodoList: (todoList: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    let tasksList = props.tasks.length
        ? props.tasks.map((task: TaskType, index) => {
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListId)
            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const taskClass = task.isDone ? 'task-done' : ''
            return (
                <li key={index} className={taskClass}>
                    <input onChange={changeTaskStatus} type="checkbox" checked={task.isDone}/>
                    <EtitableSpan  title={task.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)
    const onClickAllHandler = () => props.changeTodoListFilter('all', props.todoListId)
    const onClickActiveHandler = () => props.changeTodoListFilter('active', props.todoListId)
    const onClickCompletedHandler = () => props.changeTodoListFilter('completed', props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId, props.todoListId)

    return (
        <div>
            <h3>
                <EtitableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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