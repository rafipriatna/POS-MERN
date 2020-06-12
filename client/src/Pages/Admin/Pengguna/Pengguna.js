import React, { Component } from "react";
import Swal from "sweetalert2";
import { Button, Badge } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Table from "../../../Components/Common/Table";

// Function
import {
  getAllPengguna,
  deletePengguna,
} from "../../../Functions/Admin/PenggunaFunction";

export default class Pengguna extends Component {
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
          dataField: "foto",
          text: "Foto",
          formatter: (rowContent, row) => {
            return (
              <img
                className="rounded mx-auto d-block"
                src={`http://localhost:5000/images/profile/${row.foto}`}
                alt={row.foto}
                width="100"
                height="100"
              />
            );
          },
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "username",
          text: "Username",
          sort: true,
          headerStyle: () => {
            return { width: "15%" };
          },
        },
        {
          dataField: "nama",
          text: "Nama",
          sort: true,
          headerStyle: () => {
            return { width: "20%" };
          },
        },
        {
          dataField: "surel",
          text: "Surel",
          sort: true,
          headerStyle: () => {
            return { width: "20%" };
          },
        },
        {
          dataField: "level",
          text: "Level",
          formatter: (rowContent, row) => {
            return (
              <div>
                {row.level === 0 ? (
                  <Badge color="primary">Admin</Badge>
                ) : (
                  <Badge color="warning">Kasir</Badge>
                )}
              </div>
            );
          },
          headerStyle: () => {
            return { width: "16%" };
          },
        },
        {
          dataField: "link",
          text: "Action",
          formatter: (rowContent, row) => {
            return (
              <div className="text-right">
                <Link to={"/pengguna/edit/" + row.id}>
                  <Button color="info" className="mr-2">
                    <FontAwesomeIcon icon={faEdit} fixedWidth />
                    Edit
                  </Button>
                </Link>

                <Button
                  color="danger"
                  className="mr-2"
                  onClick={(e) => this.hapusPengguna(row.id)}
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
    const dataPengguna = await getAllPengguna();
    if (dataPengguna.count > 0) {
      this.setState({
        tableData: dataPengguna.users,
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

  hapusPengguna = (id) => {
    Swal.fire({
      title: "Hapus pengguna?",
      text: "Data pengguna yang sudah dihapus tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: (proses) => {
        return deletePengguna(id)
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
        Swal.fire("Berhasil", "Berhasil menghapus pengguna", "success").then(
          () => {
            getAllPengguna().then(data => {
              this.setState({
                tableData: data.users,
              });
            })
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
            <h1 className="h3 mb-2 text-gray-800">Pengguna</h1>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Data semua pengguna
                </h6>
              </div>
              <div className="card-body">
                <Link to="/pengguna/tambah" className="btn btn-primary">
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
