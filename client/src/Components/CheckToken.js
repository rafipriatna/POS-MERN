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
        if (check){
            localStorage.setItem('userData', JSON.stringify(check))
            this.setState({login: true})
        }else{
            localStorage.clear('userAuth')
            localStorage.clear('userData')
            this.setState({login: false})
        }
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
