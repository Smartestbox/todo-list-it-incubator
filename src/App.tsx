import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import { TaskType } from './TodoList';

type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1: string = 'What to learn';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false}
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
        // console.log(tasks)
    }

    // нужно ко вторнику
    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTaskForRender =
        (tasks: Array<TaskType>, filter: FilterValuesType):Array<TaskType> => {
        if(filter === 'active') {
            return tasks.filter(task => task.isDone === false)
        } if(filter === 'completed') {
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
            />
            {/* <TodoList title={todoListTitle_2}/> */}
        </div>
    );
};

export default App;
