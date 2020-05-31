import React, { Component } from 'react'
import {checkToken} from '../Components/Functions/AuthFunction'

export default class CheckAuth extends Component {

    async componentDidMount(){
        const checToken = await checkToken()
        if(checToken === false) window.location = "/masuk"
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
