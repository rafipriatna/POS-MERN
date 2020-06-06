import React, {Component} from 'react'
import {Button, Badge} from "reactstrap"
import {Link, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Table from '../../../Components/Common/Table'

// Function
import {getAllPengguna} from '../../../Functions/AdminFunction'

export default class Pengguna extends Component {
    constructor() {
        super()
        this.state = {
            tableColumn: [
                {
                    dataField: 'id',
                    text: 'ID',
                    sort: true,
                    headerStyle: () => {
                        return {width: "5%"}
                    }
                },  {
                  dataField: 'username',
                  text: 'Username',
                  sort: true
                }, {
                    dataField: 'nama',
                    text: 'Nama',
                    sort: true
                }, {
                    dataField: 'surel',
                    text: 'Surel',
                    sort: true
                }, {
                  dataField: 'level',
                  text: 'Level',
                  formatter: (rowContent, row) => {
                    return(
                      <div>
                        {row.level === 0 ?
                          <Badge color="primary">Admin</Badge>
                        :
                          <Badge color="warning">Kasir</Badge>
                        }
                      </div>
                    )
                  }
                }, {
                    dataField: "link",
                    text: "Action",
                    formatter: (rowContent, row) => {
                        return (
                            <div>
                                <Link to={"/pengguna/edit/" + row.id}>
                                    <Button color="info" className="mr-2">
                                        <FontAwesomeIcon icon={faEdit} fixedWidth/>
                                        Edit
                                    </Button>
                                </Link>

                                <Button color="danger" className="mr-2">
                                    <FontAwesomeIcon icon={faTrash} fixedWidth/>
                                    Delete
                                </Button>
                            </div>
                        )
                    }
                }
            ],
            tableData: [],
            redirect: false
        }
    }

    async componentDidMount(){
        const dataPengguna = await getAllPengguna()
        if (dataPengguna.count > 0){
            this.setState({
                tableData: dataPengguna.users
            })
        }else{
            this.setState({
                redirect: true
            })
        }
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        if (this.state.redirect === true)
            return <Redirect to="/" />
        return (
            <div className="container-fluid">
                {this.state.tableData.length > 0 ?
                    <div>
                        <h1 className="h3 mb-2 text-gray-800">Pengguna</h1>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Data semua pengguna</h6>
                            </div>
                            <div className="card-body">
                                <Link to="/pengguna/tambah" className="btn btn-primary">Tambah</Link>
                                    
                                <div className="table-responsive">
                                    <Table data={this.state.tableData} columns={this.state.tableColumn}/>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <div>
                        <p>Loading...</p>
                    </div>
                }
            </div>
        )
    }
}
