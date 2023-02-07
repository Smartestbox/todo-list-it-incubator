import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

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
            <input
                type='text'
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClass}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;