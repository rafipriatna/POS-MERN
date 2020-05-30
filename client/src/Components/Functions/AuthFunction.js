import axios from 'axios'

export const masuk = user => {
    return axios
        .post('/auth/masuk', {
            surel: user.surel,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('userToken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}