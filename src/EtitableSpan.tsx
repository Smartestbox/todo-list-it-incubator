import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanProps = {
    title: string
    changeTitle: (title: string) => void
}

const EtitableSpan: FC<EditableSpanProps>= (props) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            // ? <input onBlur={offEditMode} autoFocus value={title} onChange={onChangeHandler}/>
            // : <span onDoubleClick={onEditMode}>{props.title}</span>
            ? <TextField
                onBlur={offEditMode}
                autoFocus
                value={title}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onEditMode} style={{borderBottom: '1px solid gray'}}>{props.title}</span>
    );
};

export default EtitableSpan;