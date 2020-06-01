import React, {Component} from 'react'
import {Button} from "reactstrap"
import {Link, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Table from '../../Common/Table'

import {getAllPengguna} from '../../Functions/AdminFunction'

export default class Pengguna extends Component {
    constructor() {
        super()
        this.state = {
            tableColumn: [
                {
                    dataField: 'id',
                    text: 'ID',
                    headerStyle: () => {
                        return {width: "5%"}
                    }
                }, {
                    dataField: 'nama',
                    text: 'Nama'
                }, {
                    dataField: 'surel',
                    text: 'Surel'
                }, {
                    dataField: "link",
                    text: "Action",
                    formatter: (rowContent, row) => {
                        return (
                            <div>
                                <Link to={"detail/" + row.id}>
                                    <Button color="dark" className="mr-2">
                                        <FontAwesomeIcon icon={faInfo}/>
                                        Detail
                                    </Button>
                                </Link>

                                <Link to={"edit/" + row.id}>
                                    <Button color="dark" className="mr-2">
                                        <FontAwesomeIcon icon={faEdit}/>
                                        Edit
                                    </Button>
                                </Link>

                                <Button color="dark" className="mr-2">
                                    <FontAwesomeIcon icon={faTrash}/>
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

    render() {
        if (this.state.redirect === true)
            return <Redirect to="/" />
        return (
            <div className="container-fluid">
                {this.state.tableData.length > 0 ?
                    <div>
                        <h1 className="h3 mb-2 text-gray-800">Tables</h1>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                            </div>
                            <div className="card-body">
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
