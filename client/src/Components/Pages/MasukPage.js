import React, { Component } from 'react'
import {masuk, checkToken} from '../Functions/AuthFunction'

// Components
import Field from '../Common/Field'

export default class Masuk extends Component {
    constructor(){
        super()
        this.state = {
            login: false,
            username: '',
            password: '',
            error: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        document.body.classList.add('bg-gradient-primary')
        const checToken = await checkToken()
        if(checToken === true) this.props.history.push("/")
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        masuk(user).then(res => {
            if (res.error){
                this.setState({
                    error: "Username atau password salah!"
                })
            }else{
                this.props.history.push("/")
            }
        }).catch(err => {
            console.error("Error: " + err)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                <p>Silakan masuk untuk mengakses POS-MERN</p>
                                            </div>
                                            {this.state.error &&
                                                <p className="text-danger">{this.state.error}</p>
                                            }
                                            <form className="user" onSubmit={this.onSubmit}>
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    placeholder="Masukkan username"
                                                    more_class="form-control-user"
                                                    value={this.state.username}
                                                    onChange={this.onChange}
                                                />
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Masukkan password"
                                                    more_class="form-control-user"
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                />
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Masuk
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
