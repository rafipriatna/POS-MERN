import React, { Component } from "react";
import { Formik, Field as FormikField } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

// Functions
import {
  getBarangById,
  updateBarang,
} from "../../../Functions/Admin/BarangFunction";
import { getAllKategoriBarang } from "../../../Functions/Admin/KategoriBarangFunction";

// Components
import Field from "../../../Components/Common/Field";

const validationSchema = Yup.object().shape({
  barcode: Yup.string()
    .min(4, "Minimal mengandung 4 angka")
    .max(9, "Maksimal mengandung 9 angka")
    .required("Barcode wajib diisi"),
  nama: Yup.string().required("Harus ada nama barang"),
  satuan: Yup.string().required("Harus ada satuan barang"),
  harga_beli: Yup.number().required("Harus ada harga beli"),
  harga_jual: Yup.number().required("Harus ada harga jual"),
  stok: Yup.number().required("Harus ada jumlah stok"),
});

export default class EditBarang extends Component {
  constructor() {
    super();
    this.state = {
      dataBarang: [],
      barangKategori: "",
      kategoriBarang: [],
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const kategoriBarang = await getAllKategoriBarang();
    const dataBarang = await getBarangById(id);

    // Mapping isi kategori, terus dicocokin sama nama kategori di data barang lol
    kategoriBarang.kategori.map((isiKategori) => {
      if (isiKategori.nama === dataBarang.barang.kategori)
        return this.setState({
          barangKategori: isiKategori.id,
        });
    });

    this.setState({
      dataBarang: dataBarang.barang,
      kategoriBarang: kategoriBarang.kategori,
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
        <h1 className="h3 mb-2 text-gray-800">Edit Barang</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Data barang</h6>
          </div>
          <Formik
            initialValues={{
              barcode: this.state.dataBarang.barcode,
              nama: this.state.dataBarang.nama,
              kategori: this.state.barangKategori,
              satuan: this.state.dataBarang.satuan,
              harga_beli: this.state.dataBarang.harga_beli,
              harga_jual: this.state.dataBarang.harga_jual,
              stok: this.state.dataBarang.stok,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const id = this.props.match.params.id;
              updateBarang(values, id)
                .then((res) => {
                  if (!res)
                    return Swal.fire(
                      "Oops...",
                      "Tidak dapat memperbarui barang",
                      "error"
                    ).then(() => {
                      this.props.history.push("/barang");
                    });
                  Swal.fire(
                    "Berhasil",
                    "Berhasil memperbarui barang",
                    "success"
                  ).then(() => {
                    this.props.history.push("/barang");
                  });
                })
                .catch((err) => {
                  Swal.fire("Oops...", err, "error").then(() => {
                    this.props.history.push("/barang");
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
                      <label>Barcode</label>
                      <Field
                        type="text"
                        name="barcode"
                        placeholder="Masukkan barcode"
                        value={values.barcode || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.barcode}
                        errors={errors.barcode}
                      />

                      <label>Nama Barang</label>
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

                      <label>Kategori</label>
                      <FormikField
                        as="select"
                        name="kategori"
                        className="form-control"
                      >
                        {this.state.kategoriBarang.map((kategori) => {
                          return (
                            <option key={kategori.id} value={kategori.id}>
                              {kategori.nama}
                            </option>
                          );
                        })}
                      </FormikField>

                      <label>Satuan</label>
                      <Field
                        type="text"
                        name="satuan"
                        placeholder="Masukkan satuan"
                        value={values.satuan || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.satuan}
                        errors={errors.satuan}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label>Harga Beli</label>
                      <Field
                        type="number"
                        name="harga_beli"
                        placeholder="Masukkan harga beli"
                        value={values.harga_beli || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.harga_beli}
                        errors={errors.harga_beli}
                      />

                      <label>Harga Jual</label>
                      <Field
                        type="number"
                        name="harga_jual"
                        placeholder="Masukkan harga jual"
                        value={values.harga_jual || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.harga_jual}
                        errors={errors.harga_jual}
                      />

                      <label>Stok Barang</label>
                      <Field
                        type="number"
                        name="stok"
                        placeholder="Masukkan stok barang"
                        value={values.stok || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.stok}
                        errors={errors.stok}
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
