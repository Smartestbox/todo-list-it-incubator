import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: any) => void
    addTask:(title:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    console.log(title)
    let tasksList = props.tasks.length
        ? props.tasks.map((task: TaskType, index) => {
            const removeTask = () => props.removeTask(task.id)
            return (
                <li key={index}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    const addTask = () => {
        props.addTask(title);
        setTitle('')
    }

    const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onClickAllHandler = () => props.changeFilter('all')
    const onClickActiveHandler = () => props.changeFilter('active')
    const onClickCompletedHandler = () => props.changeFilter('completed')


    // React под капотом автоматически отрисовывает Array как список элементов
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type='text'
                    value={title}
                    onChange={onChangeHadler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;