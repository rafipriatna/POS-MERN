import React, { Component } from "react";

// Components
import Field from "../../../Components/Common/Field";

export default class EditPengguna extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Edit Pengguna</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Data pengguna</h6>
          </div>
          <div className="card-body">
            <form className="user" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <label>Username</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Masukkan username"
                  />
                </div>
                <div className="col-lg-6">
                  <label>Nama</label>
                  <Field
                    type="text"
                    name="nama"
                    placeholder="Masukkan username"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
