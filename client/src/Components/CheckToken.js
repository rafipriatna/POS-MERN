import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {checkToken} from '../Functions/AuthFunction'

export default class CheckAuth extends Component {
    constructor(props){
        super(props)
        this.state = {
            login: ''
        }

    }

    async componentDidMount(){
        const check = await checkToken()
        this.setState({login: check})
    }

    render() {
        if(this.state.login === false) return <Redirect to="/masuk" />

        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
