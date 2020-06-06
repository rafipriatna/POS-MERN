import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import Field from "../../../Components/Common/Field";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Username minimal 6 karakter bre")
    .required("Harus ada username"),
  nama: Yup.string()
    .min(3, "Namanya minimal 3 karakter bre")
    .required("Harus ada nama"),
  password: Yup.string()
    .min(8, "Password harus 8 karakter bjir")
    .required("Password harus diisi"),
  surel: Yup.string().email("Emailnya ga valid ni").required(),
});

export default class CreatePengguna extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Tambah Pengguna</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Data pengguna</h6>
          </div>
          <div className="card-body">
            <Formik
              initialValues={{ username: "", nama: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <form className="user" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label>Username</label>
                      <Field
                        type="text"
                        name="username"
                        placeholder="Masukkan username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.username}
                        errors={errors.username}
                      />
                      
                      <label>Nama</label>
                      <Field
                        type="text"
                        name="nama"
                        placeholder="Masukkan nama"
                        value={values.nama}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.nama}
                        errors={errors.nama}
                      />
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </div>
      </div>
    );
  }
}
