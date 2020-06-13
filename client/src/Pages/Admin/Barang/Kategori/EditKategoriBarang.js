import React, { Component } from "react";
import { Formik, Field as FormikField } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

// Functions
import {
  getKategoriBarangById,
  updateKategoriBarang,
} from "../../../../Functions/Admin/KategoriBarangFunction";

// Components
import Field from "../../../../Components/Common/Field";

const validationSchema = Yup.object().shape({
  nama: Yup.string().required("Harus ada nama kategori barang"),
  keterangan: Yup.string().required("Harus ada keterangan kategori barang"),
});

export default class EditKategoriBarang extends Component {
  constructor() {
    super();
    this.state = {
      datakategoriBarang: [],
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const dataKategoriBarang = await getKategoriBarangById(id);
    this.setState({
      datakategoriBarang: dataKategoriBarang.kategori,
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Edit Kategori Barang</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Data Kategori Barang
            </h6>
          </div>
          <Formik
            initialValues={{
              nama: this.state.datakategoriBarang.nama,
              keterangan: this.state.datakategoriBarang.keterangan,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const id = this.props.match.params.id;
              updateKategoriBarang(values, id)
                .then((res) => {
                  if (!res)
                    return Swal.fire(
                      "Oops...",
                      "Tidak dapat memperbarui kategori barang",
                      "error"
                    ).then(() => {
                      this.props.history.push("/barang/kategori");
                    });
                  Swal.fire(
                    "Berhasil",
                    "Berhasil memperbarui kategori barang",
                    "success"
                  ).then(() => {
                    this.props.history.push("/barang/kategori");
                  });
                })
                .catch((err) => {
                  Swal.fire("Oops...", err, "error").then(() => {
                    this.props.history.push("/barang/kategori");
                  });
                });
            }}
            enableReinitialize
          >
            {({
              touched,
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
                      <label>Nama Kategori Barang</label>
                      <Field
                        type="text"
                        name="nama"
                        placeholder="Masukkan nama barang"
                        value={values.nama || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.nama}
                        errors={errors.nama}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label>Keterangan</label>
                      <FormikField
                        name="keterangan"
                        as="textarea"
                        className="form-control"
                        value={values.keterangan || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.keterangan && touched.keterangan && (
                        <small className="form-text text-danger">
                          {errors.keterangan}
                        </small>
                      )}
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
