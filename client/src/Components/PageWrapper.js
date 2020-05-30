import React, { Component } from 'react'

import Header from './Common/Header'

export default class PageWrapper extends Component {
    render() {
        return (
            <div> 
                <Header>
                    {this.props.children}
                </Header>
            </div>
        )
    }
}
