import axios from 'axios'
import { settings } from '../config'

export const getTasks = async (taskStatus = '') => {
    const url = settings.server + `/tasks/${taskStatus}`
    const token = sessionStorage['token']
    let response
    try {
        response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        response = response.data
    } catch (ex) {
        console.log(ex)
    }

    return response
}

export const createTask = async (taskName, taskDescription) => {
    const url = settings.server + '/tasks/add'
    const token = sessionStorage['token']
    let response
    try {
        response = await axios.post(
            url,
            {
                taskName,
                taskDescription,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        response = response.data
    } catch (ex) {
        console.log(ex)
    }

    return response
}

export const changeTaskStatus = async (id, taskStatus) => {
    const url = settings.server + `/tasks/update`
    const token = sessionStorage['token']
    let response
    try {
        response = await axios.patch(
            url,
            {
                id,
                taskStatus,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        response = response.data
    } catch (ex) {
        console.log(ex)
    }

    return response
}
