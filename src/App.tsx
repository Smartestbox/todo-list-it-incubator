import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {TaskType} from './TodoList';
import {v1} from "uuid";

type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    console.log(v1())
    const todoListTitle_1: string = 'What to learn';
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: false}
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
        // console.log(tasks)
    }

    const addTask = (title:string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }

    // нужно ко вторнику
    // useEffect(() => {
    //     console.log(tasks)
    // }, [tasks])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTaskForRender =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            if (filter === 'active') {
                return tasks.filter(task => task.isDone === false)
            }
            if (filter === 'completed') {
                return tasks.filter(task => task.isDone === true)
            } else {
                return tasks
            }
        }

    const filteredTasksForRender = getFilteredTaskForRender(tasks, filter)

    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            {/* <TodoList title={todoListTitle_2}/> */}
        </div>
    );
};

export default App;
