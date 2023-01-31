import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {TaskType} from './TodoList';
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    // tasks: Array<TaskType>
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Whiskey', isDone: true},
            {id: v1(), title: 'COLA', isDone: true},
            {id: v1(), title: 'ACE', isDone: false}
        ],
    })

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(updatedTodoLists)
    }
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.filter(task => task.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = [...tasksForUpdate, newTask]
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    //     const tasksForUpdate = tasks[todoListId]
    //     const updatedTasks = tasksForUpdate.map((t) => t.id === taskId ? {...t, isDone: isDone} : t)
    //     const copyTasks = {...tasks}
    //     copyTasks[todoListId] = updatedTasks
    //     setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].map((t) => t.id === taskId ? {...t, isDone: isDone} : t)})
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

    const todoListComponents = todoLists.length ? todoLists.map(tl => {

        const filteredTasksForRender = getFilteredTaskForRender(tasks[tl.id], tl.filter)

        return (
            <TodoList
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodoList={removeTodoList}
            />
        )
    }): <span>Create your first TodoList</span>


    return (
        <div className="App">
            {todoListComponents}
            {/* <TodoList title={todoListTitle_2}/> */}
        </div>
    );
};

export default App;
