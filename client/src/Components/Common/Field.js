import React, { Component } from "react";

export default class Field extends Component {
  render() {
    return (
      <div className="form-group">
        <input
          type={this.props.type}
          name={this.props.name}
          className={"form-control " + this.props.more_class}
          required="required"
          placeholder={this.props.placeholder}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        />
        {(this.props.errors && this.props.touched) && 
            <small className="form-text text-danger">{this.props.errors}</small>
        }
      </div>
    );
  }
}
