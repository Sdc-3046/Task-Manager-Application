import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTask } from '../services/task.service'
import React, { Component } from 'react';

const CreateTaskPage = (props) => {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const navigate = useNavigate()

    const onCreateTask = async () => {
        if (taskName.length === 0) {
            alert('set title')
        } else if (taskDescription.length === 0) {
            alert('set description')
        } else {
            const result = await createTask(taskName, taskDescription)
            if (result) {
                navigate('/task-list')
            } else {
                navigate('/task-list')
            }
        }
    }

    return (
        <div>
            <h1 className="header">Create Task</h1>
            <div className="form">
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input
                        onChange={(e) => {
                            setTaskName(e.target.value)
                        }}
                        type="text"
                        class="form-control"
                    />{' '}
                </div>

                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }}
                        rows={5}
                        type="password"
                        class="form-control"
                    ></textarea>
                </div>

                <div class="mb-3">
                    <button onClick={onCreateTask} className="btn btn-success">
                        Save
                    </button>
                    <Link
                        to="/task-list"
                        style={{ marginLeft: '10px' }}
                        className="btn btn-danger"
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskPage
