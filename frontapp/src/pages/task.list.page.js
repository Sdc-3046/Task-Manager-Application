import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Task from '../components/task.component'
import { changeTaskStatus, getTasks } from '../services/task.service'
import React from 'react';

const TaskListPage = (props) => {
    const [tasksOpen, setTasksOpen] = useState([])
    const [tasksInProgress, setTasksInProgress] = useState([])
    const [tasksDone, setTasksDone] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        reloadTasks()
    }, [])

    const reloadTasks = () => {
        loadTasks('OPEN', setTasksOpen)
        loadTasks('IN_PROGRESS', setTasksInProgress)
        loadTasks('DONE', setTasksDone)
    }

    const loadTasks = async (taskStatus, func) => {
        const result = await getTasks(taskStatus)
        if (result) {
            func(result)
        }
    }

    const changeStatus = async (id, taskStatus) => {
        const result = await changeTaskStatus(id, taskStatus)
        console.log(result)
        if (result) {
            console.log('reloading tasks')
            reloadTasks()
        }

    }

    const logout = () => {

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userEmail')
        navigate('/signin')
    }

    return (
        <div>
            <button
                onClick={logout}
                style={{ float: 'right' }}
                className="btn btn-warning"
            >
                Logout
            </button>
            <h1 className="header">Task List</h1>

            <Link to="/task-create">Create new task</Link>
            <div className="row">
                <div className="col">
                    <h4 className="header">Open</h4>
                    {tasksOpen.length > 0 &&
                        tasksOpen.map((task) => {
                            const { id, taskName, taskStatus, taskDescription } = task
                            return (
                                <Task
                                    key={id}
                                    id={id}
                                    taskName={taskName}
                                    taskStatus={taskStatus}
                                    taskDescription={taskDescription}
                                    changeStatus={changeStatus}
                                />
                            )
                        })}
                    {tasksOpen.length === 0 && <div>No OPEN tasks</div>}
                </div>
                <div
                    className="col"

                >
                    <h4 className="header">In Progress</h4>
                    {tasksInProgress.length > 0 &&
                        tasksInProgress.map((task) => {
                            const { id, taskStatus, taskName, taskDescription } = task
                            return (
                                <Task
                                    key={id}
                                    id={id}
                                    taskStatus={taskStatus}
                                    taskName={taskName}
                                    taskDescription={taskDescription}
                                    changeStatus={changeStatus}

                                />
                            )
                        })}
                    {tasksInProgress.length === 0 && <div>No IN_PROGRESS tasks</div>}
                </div>
                <div className="col">
                    <h4 className="header">Done</h4>
                    {tasksDone.length > 0 &&
                        tasksDone.map((task) => {
                            const { id, taskName, taskStatus, taskDescription } = task

                            return (
                                <Task
                                    key={id}
                                    id={id}
                                    taskStatus={taskStatus}
                                    taskName={taskName}
                                    taskDescription={taskDescription}
                                    changeStatus={changeStatus}

                                />
                            )
                        })}

                    {tasksDone.length === 0 && <div>No DONE tasks</div>}
                </div>
            </div>
        </div>
    )
}

export default TaskListPage
