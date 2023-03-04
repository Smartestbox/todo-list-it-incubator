import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import './App.css';
import AddItemForm from "./AddItemForm";
import EtitableSpan from "./EtitableSpan";
import {Button, Checkbox, IconButton, List, Typography} from "@mui/material";
import {DeleteForeverRounded} from "@mui/icons-material";


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
                <li key={index} className={'task-list-item'}>
                    <div className={taskClass}>
                        <Checkbox
                            size='small'
                            onChange={changeTaskStatus}
                            checked={task.isDone}
                        />
                        <EtitableSpan  title={task.title} changeTitle={changeTaskTitle}/>
                    </div>
                    <IconButton onClick={removeTask} size='small'>
                        <DeleteForeverRounded />
                    </IconButton>
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
            <Typography align='center' variant='h5' sx={{fontWeight: 'bold'}}>
                <EtitableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <IconButton onClick={removeTodoList} size='small'>
                    <DeleteForeverRounded />
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List className='tasks-list'>
                {tasksList}
            </List>
            <div>
                <Button
                    sx={{marginRight: '10px'}}
                    size='small'
                    variant='contained'
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={onClickAllHandler}

                >
                    All
                </Button>
                <Button
                    sx={{marginRight: '10px'}}
                    size='small'
                    variant='contained'
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={onClickActiveHandler}
                >
                    Active
                </Button>
                <Button
                    size='small'
                    variant='contained'
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    disableElevation
                    onClick={onClickCompletedHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;