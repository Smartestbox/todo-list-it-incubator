import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload:{
        todolistId: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload:{
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        filter: FilterValuesType
        todolistId: string
    }
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (todolists: TodoListType[], action: ActionType): TodoListType[] => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.payload.todolistId)

        case 'ADD-TODOLIST':
            const newTodoListId = v1()
            const newTodo: TodoListType = {
                id: newTodoListId,
                title: action.payload.title,
                filter: 'all'
            }
            return [...todolists, newTodo]

        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

        default:
            return todolists
    }
}


export const RemoveTodolistActionCreator = (id: string) : RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: id
        }
    }
}

export const AddTodolistActionCreator = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title
        }
    }
}

export const ChangeTodolistTitleActionCreator = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title: title,
            todolistId: id
        }
    }
}

export const ChangeTodolistFilterActionCreator = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter: filter,
            todolistId: id
        }
    }
}