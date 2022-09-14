import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist =(props: PropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const TrimmedTitle = title.trim()
        if (TrimmedTitle) {
            props.addTask(TrimmedTitle);
    } else {
        setError(true)
    }
        setTitle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const userMessage =
        error
        ? <div style={{color:"red"}}> Dobav' tasku ! </div>
            : <div> Vishe dobav tasku </div>

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {userMessage}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? "isDone" : ""}>
                        <input
                            onChange={(event) => props.changeStatus(t.id, event.currentTarget.checked)}
                            type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button
                className={props.filter === "all" ? "btn-active btn" : "btn"}
                onClick={onAllClickHandler}>All
            </button>
            <button
                className={props.filter === "active" ? "btn-active btn" : "btn"}
                onClick={onActiveClickHandler}>Active
            </button>
            <button
                className={props.filter === "completed" ? "btn-active btn" : "btn"}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
