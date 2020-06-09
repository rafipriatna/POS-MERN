import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "name",
    order: "asc",
  },
];

export default class Table extends Component {
  render() {
    return (
      <>
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={this.props.data}
          columns={this.props.columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <div className="float-right">
                <SearchBar {...props.searchProps} placeholder="Cari data..." />
              </div>
              <BootstrapTable
                classes="table-responsive"
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </>
    );
  }
}
