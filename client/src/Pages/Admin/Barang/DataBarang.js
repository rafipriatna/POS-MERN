import React, { Component } from "react";
import Swal from "sweetalert2";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Barcode from "react-barcode";

// Components
import Table from "../../../Components/Common/Table";

// Function
import {
  getAllBarang,
  deleteBarang,
} from "../../../Functions/Admin/BarangFunction";

export default class DataBarang extends Component {
  constructor() {
    super();
    this.state = {
      tableColumn: [
        {
          dataField: "id",
          text: "ID",
          sort: true,
          headerAlign: "center",
          headerStyle: () => {
            return { width: "5%" };
          },
        },
        {
          dataField: "barcode",
          text: "Barcode",
          headerStyle: () => {
            return { width: "10%" };
          },
          formatter: (rowContent, row) => {
            return (
              <Barcode
                value={row.barcode}
                width={1}
                height={50}
                fontSize={12}
              />
            );
          },
        },
        {
          dataField: "nama",
          text: "Nama",
          sort: true,
          headerStyle: () => {
            return { width: "15%" };
          },
        },
        {
          dataField: "kategori",
          text: "Kategori",
          sort: true,
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "satuan",
          text: "Satuan",
          sort: true,
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "harga_beli",
          text: "Harga Beli",
          sort: true,
          headerStyle: () => {
            return { width: "15%" };
          },
        },
        {
          dataField: "harga_jual",
          text: "Harga Jual",
          sort: true,
          headerStyle: () => {
            return { width: "15%" };
          },
        },
        {
          dataField: "stok",
          text: "Stok",
          sort: true,
          headerStyle: () => {
            return { width: "5%" };
          },
        },
        {
          dataField: "link",
          text: "Action",
          formatter: (rowContent, row) => {
            return (
              <div className="text-right">
                <Link to={"/barang/edit/" + row.id}>
                  <Button color="info" className="mr-2">
                    <FontAwesomeIcon icon={faEdit} fixedWidth />
                    Edit
                  </Button>
                </Link>

                <Button
                  color="danger"
                  className="mr-2"
                  onClick={(e) => this.hapusBarang(row.id)}
                >
                  <FontAwesomeIcon icon={faTrash} fixedWidth />
                  Delete
                </Button>
              </div>
            );
          },
        },
      ],
      tableData: [],
      redirect: false,
    };
  }

  async componentDidMount() {
    const dataBarang = await getAllBarang();
    if (dataBarang.count > 0) {
      this.setState({
        tableData: dataBarang.barang,
      });
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  hapusBarang = (id) => {
    Swal.fire({
      title: "Hapus barang?",
      text: "Data barang yang sudah dihapus tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: (proses) => {
        return deleteBarang(id)
          .then((res) => {
            if (!res) throw new Error("Error" + res);

            return true;
          })
          .catch((err) => {
            Swal.showValidationMessage(`Request failed: ${err}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        Swal.fire("Berhasil", "Berhasil menghapus barang", "success").then(
          () => {
            getAllBarang().then((data) => {
              this.setState({
                tableData: data.barang,
              });
            });
          }
        );
      }
    });
  };

  render() {
    if (this.state.redirect === true) return <Redirect to="/" />;
    return (
      <div className="container-fluid">
        {this.state.tableData.length > 0 ? (
          <div>
            <h1 className="h3 mb-2 text-gray-800">Barang</h1>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Data Barang
                </h6>
              </div>
              <div className="card-body">
                <Link to="/barang/tambah" className="btn btn-primary">
                  Tambah
                </Link>
                <div className="container-fluid">
                  <Table
                    data={this.state.tableData}
                    columns={this.state.tableColumn}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    );
  }
}
