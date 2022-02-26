import axios from 'axios'
import { settings } from '../config'
import React, { Component } from 'react';

export const signup = async (userEmail, userPassword, userName) => {
    const url = settings.server + '/users/signup'

    let result
    try {
        result = await axios.post(url, {
            userEmail,
            userPassword,
            userName
        })
        result = result.data
    } catch (ex) {
        result = ex
    }

    return result
}

export const signin = async (userEmail, userPassword) => {
    const url = settings.server + '/users/signin'
    console.log(userEmail)
    let result
    try {
        console.log("Hello")
        result = await axios.post(url, {
            userEmail,
            userPassword,
        })
        result = result.data
    } catch (ex) {
        console.log(ex)
    }
    return result
}
