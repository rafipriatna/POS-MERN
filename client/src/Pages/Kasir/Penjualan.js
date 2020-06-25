import React, { Component } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import CurrencyFormat from "react-currency-format";

// Components
import Field from "../../Components/Common/Field";

// Function
import { checkToken } from "../../Functions/AuthFunction";
import { getBarangByBarcode } from "../../Functions/Admin/BarangFunction";
import {
  createPenjualan,
  getPenjualanByKodePenjualan,
  updateJumlahBarangPenjualan,
  deletePenjualan,
} from "../../Functions/Kasir/PenjualanFunction";
import { createTransaksi } from "../../Functions/Kasir/TransaksiFunction";

export default class Penjualan extends Component {
  constructor() {
    super();
    const time = new Date().getTime();
    this.state = {
      kode_penjualan: time,
      barcode_barang: "",
      tableColumn: [
        {
          dataField: "nama_barang",
          text: "Nama Barang",
          headerStyle: () => {
            return { width: "450px" };
          },
          editable: () => {
            return false;
          },
        },
        {
          dataField: "harga",
          text: "Harga",
          formatter: (rowContent, row) => {
            return (
              <CurrencyFormat
                value={rowContent}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp. "}
              />
            );
          },
          headerStyle: () => {
            return { width: "400px" };
          },
          editable: () => {
            return false;
          },
        },
        {
          dataField: "jumlah",
          text: "Qty",
          headerStyle: () => {
            return { width: "100px" };
          },
        },
        {
          dataField: "total",
          text: "Total",
          formatter: (rowContent, row) => {
            return (
              <CurrencyFormat
                value={rowContent}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp. "}
              />
            );
          },
          headerStyle: () => {
            return { width: "400px" };
          },
          editable: () => {
            return false;
          },
        },
        {
          dataField: "aksi",
          text: "Aksi",
          formatter: (rowContent, row) => {
            return (
              <div className="text-right">
                <Button
                  color="danger"
                  className="mr-2"
                  onClick={(e) => this.hapusPenjualan(row.id)}
                >
                  <FontAwesomeIcon icon={faTrash} fixedWidth />
                  Hapus
                </Button>
              </div>
            );
          },
          headerStyle: () => {
            return { width: "20%" };
          },
          editable: () => {
            return false;
          },
        },
      ],
      tableData: [],
      redirect: false,
      user: [],
      jumlah: 1,
      subTotal: 0,
      diskon: 0,
      potonganDiskon: 0,
      grandTotal: 0,
      bayar: 0,
      kembalian: 0,
      bayaranKurang: true,
      tombolCetakStruk: false,
    };
    this.onChange = this.onChange.bind(this);
    this.cariBarang = this.cariBarang.bind(this);
    this.hitungPotonganDiskon = this.hitungPotonganDiskon.bind(this);
    this.hitungKembalian = this.hitungKembalian.bind(this);
    this.kirimTransaksi = this.kirimTransaksi.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  }

  // Cek User
  async componentDidMount() {
    const check = await checkToken();
    if (check) {
      const data = JSON.parse(JSON.stringify(check));
      this.setState({
        user: data,
      });
    } else {
      localStorage.clear("userAuth");
      this.setState({ login: false });
    }
  }

  // Barang
  cariBarang(e) {
    e.preventDefault();
    let barcode = this.state.barcode_barang;
    let jumlah = this.state.jumlah;
    getBarangByBarcode(barcode).then((res) => {
      // Jika barang tidak ditemukan
      if (!res.barang)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Barang dengan barcode ${barcode} tidak ditemukan!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.setState({
            barcode_barang: "",
          });
        });

      // Cek Stok
      if (res.barang.stok === 0)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Stok barang ${res.barang.nama} habis!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.setState({
            barcode_barang: "",
          });
        });

      // Cek qty barang
      if (jumlah === 0 || jumlah === null)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Qty tidak boleh kosong atau nol (0)!",
          showConfirmButton: false,
          timer: 1500,
        });

      // Simpan ke Penjualan
      const kode_penjualan = this.state.kode_penjualan;
      const id = res.barang.id;
      const total = res.barang.harga_jual * jumlah;

      let dataPenjualan = {
        kode_penjualan: kode_penjualan,
        id_barang: id,
        jumlah: jumlah,
        total: total,
      };
      createPenjualan(dataPenjualan).then(() => {
        this.getPenjualan(kode_penjualan);
        this.setState({
          barcode_barang: "",
          jumlah: 1,
        });
      });
    });
  }

  getPenjualan(KodePenjualan) {
    getPenjualanByKodePenjualan(KodePenjualan).then((res) => {
      this.setState({
        tableData: res.penjualan,
      });
      this.hitungHargaTotal(res.penjualan);
    });
  }

  updatePenjualanJumlah(data) {
    let dataUpdatePenjualan = {
      jumlah: data.newValue,
      total: data.row.harga * data.newValue,
    };
    updateJumlahBarangPenjualan(dataUpdatePenjualan, data.row.id).then(
      (res) => {
        this.getPenjualan(data.row.kode_penjualan);
      }
    );
  }

  hapusPenjualan(id) {
    deletePenjualan(id).then((res) => {
      const KodePenjualan = this.state.kode_penjualan;
      this.getPenjualan(KodePenjualan);
    });
  }

  // Fungsi perhitungan
  hitungHargaTotal(data) {
    let total = 0;
    let grandTotal = 0;
    let potonganDiskon = this.state.potonganDiskon;

    if (data.length === 0) {
      this.setState({
        subTotal: 0,
        potonganDiskon: 0,
        grandTotal: 0,
      });
    }

    for (let i = 0; i < data.length; i++) {
      total += data[i].total;
      grandTotal = total - potonganDiskon;
      this.setState({
        subTotal: total,
        grandTotal: grandTotal,
      });
    }
  }

  hitungPotonganDiskon(e) {
    const value = e.target.value;
    let subTotal = this.state.subTotal;
    let hitung;
    if (value === null || value === "")
      return this.setState({
        diskon: 0,
        potonganDiskon: 0,
        grandTotal: subTotal,
      });

    hitung = (value / 100) * subTotal;
    this.setState({
      diskon: value,
      potonganDiskon: hitung,
      grandTotal: subTotal - hitung,
    });
  }

  hitungKembalian(data) {
    const value = data.value;
    let grandTotal = this.state.grandTotal;
    let hitung = value - grandTotal;

    if (hitung >= 0) {
      this.setState({
        bayar: value,
        kembalian: hitung,
        bayaranKurang: false,
        tombolCetakStruk: true,
      });
    } else {
      this.setState({
        bayar: 0,
        kembalian: 0,
        bayaranKurang: true,
        tombolCetakStruk: false,
      });
    }
  }

  // Transaksi
  kirimTransaksi(e) {
    e.preventDefault();
    const user = this.state.user;
    const dataTransaksi = {
      kode_penjualan: this.state.kode_penjualan,
      sub_total: this.state.subTotal,
      diskon: this.state.diskon,
      potongan_diskon: this.state.potonganDiskon,
      grand_total: this.state.grandTotal,
      bayar: this.state.bayar,
      kembalian: this.state.kembalian,
      id_user: user.id,
    };
    createTransaksi(dataTransaksi).then(() => {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: `Transaksi ${this.state.kode_penjualan} berhasil disimpan`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.props.history.push("/penjualan");
      });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Penjualan</h1>
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">
                    <h4>Informasi</h4>
                  </div>
                  <div className="card-body">
                    <label>Tanggal:</label>
                    <Field
                      type="date"
                      name="tanggal"
                      placeholder="Masukkan barcode"
                      value={new Date().toISOString().split("T")[0]}
                      readOnly
                    />
                    <label>Kode Penjualan:</label>
                    <Field
                      type="number"
                      name="kode_penjualan"
                      value={this.state.kode_penjualan}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="card">
                  <form onSubmit={this.cariBarang}>
                    <div className="card-body">
                      <label>Barcode Barang:</label>
                      <Field
                        type="text"
                        name="barcode_barang"
                        placeholder="Masukkan barcode"
                        value={this.state.barcode_barang}
                        onChange={this.onChange}
                      />

                      <label>Jumlah:</label>
                      <Field
                        type="number"
                        name="jumlah"
                        placeholder="Qty Barang"
                        value={this.state.jumlah}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="card-footer text-right">
                      <button
                        type="submit"
                        className="btn btn-primary text-right"
                      >
                        Tambah
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg">
                <div className="card h-100">
                  <div className="card-body align-items-center d-flex justify-content-center">
                    <h1>
                      <CurrencyFormat
                        value={this.state.grandTotal}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={this.state.tableData}
                columns={this.state.tableColumn}
              >
                {(props) => (
                  <div>
                    <BootstrapTable
                      classes="table-responsive"
                      {...props.baseProps}
                      cellEdit={cellEditFactory({
                        mode: "click",
                        afterSaveCell: (oldValue, newValue, row, column) => {
                          if (newValue === "" || newValue === null)
                            return row.jumlah === 1;
                          let data = {
                            oldValue: oldValue,
                            newValue: newValue,
                            row: row,
                            column: column,
                          };
                          this.updatePenjualanJumlah(data);
                        },
                      })}
                    />
                  </div>
                )}
              </ToolkitProvider>
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label>Sub total</label>
                              <CurrencyFormat
                                value={this.state.subTotal}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                                className="form-control"
                                readOnly
                              />
                            </div>
                            <label>Diskon (%)</label>
                            <input
                              type="number"
                              className="form-control"
                              onChange={this.hitungPotonganDiskon}
                            />
                          </div>
                          <div className="form-group">
                            <label>Potongan Diskon</label>
                            <CurrencyFormat
                              value={this.state.potonganDiskon}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp. "}
                              className="form-control"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Grand Total</label>
                            <CurrencyFormat
                              value={this.state.grandTotal}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp. "}
                              className="form-control"
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label>Bayar</label>
                            <CurrencyFormat
                              thousandSeparator={true}
                              prefix={"Rp. "}
                              className="form-control"
                              onValueChange={this.hitungKembalian}
                            />
                          </div>
                          <div className="form-group">
                            <label>Kembalian</label>
                            <CurrencyFormat
                              value={this.state.kembalian}
                              thousandSeparator={true}
                              prefix={"Rp. "}
                              className="form-control"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="text-center">Informasi Penting</h3>
                      <hr />
                      <ul>
                        <li>
                          Barang yang sudah dibeli, tidak dapat dikembalikan
                          lagi.
                        </li>
                        <li>Kasir nggak boleh ngasih harga temen.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-right">
            <button
              className="btn btn-primary"
              disabled={!this.state.tombolCetakStruk}
              onClick={this.kirimTransaksi}
            >
              Cetak Struk
            </button>
          </div>
        </div>
      </div>
    );
  }
}
