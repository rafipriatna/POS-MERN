import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";

export default class TablePenjualan extends Component {
  updatePenjualanJumlah(data) {
      console.log(data)
  }
  render() {
    return (
      <>
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={this.props.data}
          columns={this.props.columns}
        >
          {(props) => (
            <div>
              <BootstrapTable
                classes="table-responsive"
                {...props.baseProps}
                cellEdit={
                  this.props.tanpaCari &&
                  cellEditFactory({
                    mode: "click",
                    afterSaveCell: (oldValue, newValue, row, column) => {
                      let data = {
                        oldValue: oldValue,
                        newValue: newValue,
                        row: row,
                        column: column,
                      };
                      this.updatePenjualanJumlah(data)
                    },
                  })
                }
              />
            </div>
          )}
        </ToolkitProvider>
      </>
    );
  }
}
