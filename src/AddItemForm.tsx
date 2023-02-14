import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

type AddItemFormProps = {
    addItem: (title: string) => void
}
const AddItemForm: FC<AddItemFormProps> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const errorMessage = error && <p style={{color: 'red', fontWeight: 'bold', margin: 0}}>Title is required</p>
    const inputErrorClass = error ? 'input-error' : ''
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    return (
        <div className={'addItemForm'}>
            <TextField
                type='text'
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                variant='outlined'
                size='small'
                label='Enter your title'
                error={error}
                helperText={error && 'Title is required'}
            />
            <IconButton onClick={addItem} size='small'>
                <AddBoxRoundedIcon />
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    );
};

export default AddItemForm;