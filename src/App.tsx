import React from 'react';
import './App.css';
import TodoList from './TodoList';
import { TaskType } from './TodoList';

function App() {
    const todoListTitle_1: string = 'What to learn';
    const todoListTitle_2: string = 'What to buy';
    const tasks_1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            {/* <TodoList title={todoListTitle_2}/> */}
        </div>
    );
};

export default App;
