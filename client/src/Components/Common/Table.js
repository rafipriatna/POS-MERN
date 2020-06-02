import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

const { SearchBar } = Search;

const defaultSorted = [{
    dataField: 'name',
    order: 'asc'
  }];

const Table = (props) => {
    return (
        <>
        <ToolkitProvider
            bootstrap4
            keyField='id'
            data={ props.data }
            columns={ props.columns }
            defaultSorted={ defaultSorted }
            search
            >
            {
                props => (
                <div>
                    <div className="float-right">
                        <SearchBar { ...props.searchProps } placeholder="Cari data..."/>
                    </div>
                    <BootstrapTable
                    { ...props.baseProps } pagination={ paginationFactory() }
                    />
                </div>
                )
            }
        </ToolkitProvider>
        </>
    )
}

export default Table