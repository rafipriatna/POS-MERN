import React, { Component } from "react";
import Swal from "sweetalert2";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Components
import Table from "../../../../Components/Common/Table";

// Function
import { getAllKategoriBarang, deleteKategoriBarang } from "../../../../Functions/Admin/KategoriBarangFunction";

export default class KategoriBarang extends Component {
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
          dataField: "nama",
          text: "Nama Kategori",
          sort: true,
          headerStyle: () => {
            return { width: "30%" };
          },
        },
        {
          dataField: "keterangan",
          text: "Keterangan",
          sort: true,
          headerStyle: () => {
            return { width: "51%" };
          },
        },
        {
          dataField: "link",
          text: "Action",
          formatter: (rowContent, row) => {
            return (
              <div className="text-right">
                <Link to={"/barang/kategori/edit/" + row.id}>
                  <Button color="info" className="mr-2">
                    <FontAwesomeIcon icon={faEdit} fixedWidth />
                    Edit
                  </Button>
                </Link>

                <Button
                  color="danger"
                  className="mr-2"
                  onClick={(e) => this.hapusKategoriBarang(row.id)}
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
    const dataKategori = await getAllKategoriBarang();
    if (dataKategori.count > 0) {
      this.setState({
        tableData: dataKategori.kategori,
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

  hapusKategoriBarang = (id) => {
    Swal.fire({
      title: "Hapus kategori barang?",
      text: "Data kategori barang yang sudah dihapus tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: (proses) => {
        return deleteKategoriBarang(id)
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
        Swal.fire(
          "Berhasil",
          "Berhasil menghapus kategori barang",
          "success"
        ).then(() => {
          getAllKategoriBarang().then((data) => {
            this.setState({
              tableData: data.kategori,
            });
          });
        });
      }
    });
  };

  render() {
    if (this.state.redirect === true) return <Redirect to="/" />;
    return (
      <div className="container-fluid">
        {this.state.tableData.length > 0 ? (
          <div>
            <h1 className="h3 mb-2 text-gray-800">Kategori Barang</h1>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Data Kategori Barang
                </h6>
              </div>
              <div className="card-body">
                <Link to="/barang/kategori/tambah" className="btn btn-primary">
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
