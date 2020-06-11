import axios from 'axios'
import querystring from 'querystring'

export const masuk = user => {
    return axios
        .post(
            '/auth/masuk',
            querystring.stringify({
                username: user.username,
                password: user.password
            })
        )
        .then(res => {
            localStorage.setItem('userAuth', JSON.stringify(res.data))
            return res.data
        })
        .catch(err => {
            return {
                error: err
            }
        })
}

export const checkToken = () => {
    const data = JSON.parse(localStorage.getItem('userAuth'))
    if (data === null)
        return false

    const headers = {
        'Authorization': `Bearer ${data.token}`
    }

    return axios
        .get(`/checktoken/${data.id}`, {
            headers
        })
        .then(result => {
            return result.data
        }).catch(err => {
            return err
        })
}