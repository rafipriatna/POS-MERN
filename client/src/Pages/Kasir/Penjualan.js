import React, { Component } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";

// Components
import Field from "../../Components/Common/Field";

// Function
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
      subTotal: 0,
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
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  cariBarang(e) {
    e.preventDefault();
    let barcode = this.state.barcode_barang;
    getBarangByBarcode(barcode).then((res) => {
      // Cek Stok
      if (res.barang.stok === 0)
        return Swal.fire(
          "Oops...",
          `Stok barang <b>${res.barang.nama}</b> habis!`,
          "error"
        ).then(() => {
          this.setState({
            barcode_barang: "",
          });
        });

      // Simpan ke Penjualan
      const kode_penjualan = this.state.kode_penjualan;
      const id = res.barang.id;
      const total = res.barang.harga_jual;

      let dataPenjualan = {
        kode_penjualan: kode_penjualan,
        id_barang: id,
        jumlah: 1,
        total: total,
      };
      createPenjualan(dataPenjualan).then(() => {
        this.getPenjualan(kode_penjualan);
        this.setState({
          barcode_barang: "",
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
    for (let i = 0; i < data.length; i++) {
      total += data[i].total;
      grandTotal += total - potonganDiskon;
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
        potonganDiskon: 0,
        grandTotal: subTotal,
      });

    hitung = (value / 100) * subTotal;
    this.setState({
      potonganDiskon: hitung,
      grandTotal: subTotal - hitung,
    });
  }

  hitungKembalian(e) {
    const value = e.target.value;
    let grandTotal = this.state.grandTotal;
    let hitung = value - grandTotal;

    if (hitung >= 0) {
      this.setState({
        kembalian: hitung,
        bayaranKurang: false,
        tombolCetakStruk: true,
      });
    } else {
      this.setState({
        kembalian: 0,
        bayaranKurang: true,
        tombolCetakStruk: false,
      });
    }
  }

  // Transaksi
  kirimTransaksi(e) {}

  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Penjualan</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            Kode Penjualan: {this.state.kode_penjualan}
          </div>
          <div className="card-body">
            <div className="col-lg-3">
              <div className="ml-2 card">
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
            <div className="container-fluid mt-4">
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
                              <input
                                type="number"
                                className="form-control"
                                value={this.state.subTotal}
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
                            <input
                              type="number"
                              className="form-control"
                              value={this.state.potonganDiskon}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Grand Total</label>
                            <input
                              type="number"
                              className="form-control"
                              value={this.state.grandTotal}
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label>Bayar</label>
                            <input
                              type="number"
                              className="form-control"
                              onChange={this.hitungKembalian}
                            />
                          </div>
                          <div className="form-group">
                            <label>Kembalian</label>
                            <input
                              type="number"
                              className="form-control"
                              value={this.state.kembalian}
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
            >
              Cetak Struk
            </button>
          </div>
        </div>
      </div>
    );
  }
}
