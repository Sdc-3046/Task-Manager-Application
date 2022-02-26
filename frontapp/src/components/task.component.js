import React from 'react';

const Task = (props) => {
    const { id, taskName, taskDescription, taskStatus, changeStatus } = props

    const backgroundColors = {
        OPEN: 'LightGray',
        IN_PROGRESS: 'Violet',
        DONE: 'MediumSeaGreen',
    }

    const fontColors = {
        OPEN: 'black',
        IN_PROGRESS: 'white',
        DONE: 'white',
    }

    const getButtonTitle = () => {
        if (taskStatus === 'OPEN') {
            return 'In Progress'
        } else if (taskStatus === 'IN_PROGRESS') {
            return 'Done'
        }
    }

    const onButtonClick = () => {
        if (taskStatus === 'OPEN') {
            changeStatus(id, 'IN_PROGRESS')
        } else if (taskStatus === 'IN_PROGRESS') {
            changeStatus(id, 'DONE')
        }
    }

    return (
        <div
            className="card"
            style={{
                backgroundColor: backgroundColors[taskStatus],
                color: fontColors[taskStatus],
                width: '100%',
                display: 'inline-block',
                margin: '10px',
                height: '150px',
            }}
        >
            <div className="card-body">
                <h5 className="card-taskName">{taskName}</h5>
                <p className="card-text">{taskDescription}</p>
                {taskStatus !== 'DONE' && (
                    <button onClick={onButtonClick} className="btn btn-success">
                        {getButtonTitle()}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Task
