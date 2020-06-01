import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

const Table = (props) => {
    return (
        <BootstrapTable keyField='id' data={ props.data } columns={ props.columns } />
    )
}

export default Table
