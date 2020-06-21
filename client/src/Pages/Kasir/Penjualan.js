import React, { Component } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      bjir: [],
    };
    this.onChange = this.onChange.bind(this);
    this.cariBarang = this.cariBarang.bind(this);
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
        this.state.barcode_barang = "";
      });
    });
  }

  getPenjualan(KodePenjualan) {
    getPenjualanByKodePenjualan(KodePenjualan).then((res) => {
      this.setState({
        tableData: res.penjualan,
      });
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
                            <label>Diskon (%)</label>
                            <input type="number" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Potongan Diskon</label>
                            <input type="number" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Sub total</label>
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Bayar</label>
                            <input type="number" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Kembalian</label>
                            <input type="number" className="form-control" />
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
            <button className="btn btn-primary">Cetak Struk</button>
          </div>
        </div>
      </div>
    );
  }
}
