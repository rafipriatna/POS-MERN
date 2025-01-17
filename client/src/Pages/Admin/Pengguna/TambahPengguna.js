import React, { Component } from "react";
import { Formik, Field as FormikField } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

// Functions
import { createPengguna } from "../../../Functions/Admin/PenggunaFunction";

// Components
import Field from "../../../Components/Common/Field";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username minimal 4 karakter bre")
    .required("Harus ada username"),
  nama: Yup.string().required("Harus ada nama"),
  password: Yup.string()
    .min(8, "Password harus 8 karakter bjir")
    .required("Password harus diisi"),
  surel: Yup.string().email("Emailnya ga valid ni").required(),
});

export default class TambahPengguna extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Tambah Pengguna</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Data pengguna</h6>
          </div>
          <Formik
            initialValues={{
              username: "",
              nama: "",
              surel: "",
              password: "",
              level: 0,
              foto: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              let formData = new FormData();
              formData.set("username", values.username);
              formData.set("nama", values.nama);
              formData.set("surel", values.surel);
              formData.set("password", values.password);
              formData.set("level", values.level);
              formData.append("foto", values.foto);
              createPengguna(formData)
                .then((res) => {
                  if (!res)
                    return Swal.fire(
                      "Oops...",
                      "Tidak dapat menambahkan pengguna",
                      "error"
                    ).then(() => {
                      this.props.history.push("/pengguna");
                    });

                  Swal.fire(
                    "Berhasil",
                    "Berhasil menambahkan pengguna",
                    "success"
                  ).then(() => {
                    this.props.history.push("/pengguna");
                  });
                })
                .catch((err) => {
                  Swal.fire("Oops...", err, "error").then(() => {
                    this.props.history.push("/pengguna");
                  });
                });
            }}
          >
            {({
              touched,
              setFieldValue,
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
            }) => (
              <form className="user" onSubmit={handleSubmit}>
                <div className="card-body">
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

                      <label>Surel</label>
                      <Field
                        type="email"
                        name="surel"
                        placeholder="Masukkan surel"
                        value={values.surel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.surel}
                        errors={errors.surel}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label>Password</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Masukkan password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.password}
                        errors={errors.password}
                      />

                      <label>Level</label>
                      <FormikField
                        as="select"
                        name="level"
                        className="form-control"
                      >
                        <option value="0">Admin</option>
                        <option value="1">Kasir</option>
                      </FormikField>

                      <br />

                      <label>Foto</label>
                      <input
                        id="foto"
                        name="foto"
                        className="form-group form-control-file"
                        type="file"
                        onChange={(event) => {
                          setFieldValue("foto", event.currentTarget.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer text-right">
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
