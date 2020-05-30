import React, { Component } from 'react'

// Components
import Field from '../Common/Field'

export default class Masuk extends Component {

    componentDidMount() {
        document.body.classList.add('bg-gradient-primary')
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
                                    <form className="user">
                                        <Field
                                            type="email"
                                            name="surel"
                                            placeholder="Masukkan surel"
                                            more_class="form-control-user"
                                        />
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Masukkan password"
                                            more_class="form-control-user"
                                        />
                                        <a href="index.html" className="btn btn-primary btn-user btn-block">
                                            Masuk
                                        </a>
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
