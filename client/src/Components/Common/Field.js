import React, { Component } from 'react'

export default class Field extends Component {
    render() {
        return (
            <div className="form-group">
                <input
                    type={this.props.type}
                    name={this.props.name}
                    className={"form-control " + this.props.more_class}
                    required="required"
                    placeholder={this.props.placeholder}/>
            </div>
        )
    }
}
