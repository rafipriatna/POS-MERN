import React, { Component } from "react";

// Components
import Field from '../../Components/Common/Field'

// Function
import { getBarangByBarcode } from "../../Functions/Admin/BarangFunction";

export default class Penjualan extends Component {
  constructor() {
    super();
    const time = new Date().getTime()
    this.state = {
      kode_penjualan: time,
      barcode_barang: '',
    };
    this.onChange = this.onChange.bind(this)
    this.cariBarang = this.cariBarang.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  cariBarang(e) {
    e.preventDefault();
    let barcode = this.state.barcode_barang;
    getBarangByBarcode(barcode).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div>
          <h1 className="h3 mb-2 text-gray-800">Penjualan</h1>
          <div className="card shadow mb-4">
            <div className="card-header py-3">Kode Penjualan: {this.state.kode_penjualan}</div>
            <div className="card-body">
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
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nama Barang</th>
                      <th>Harga</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Barang Pertama</td>
                      <td>Rp. 150.000</td>
                      <td>20</td>
                      <td>Rp. 1.500.000</td>
                      <td className="text-right">
                        <button className="btn btn-danger">Hapus</button>
                      </td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Barang Kedua</td>
                      <td>Rp. 150.000</td>
                      <td>20</td>
                      <td>Rp. 1.500.000</td>
                      <td className="text-right">
                        <button className="btn btn-danger">Hapus</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

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
      </div>
    );
  }
}
