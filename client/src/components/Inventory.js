import { useState, useEffect } from "react";
import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import "../index.css"

function InventoryComponent() {
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        fetch('/inventory')
            .then(res => res.json())
            .then(data => {
                setInventory(data)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    const customDataGridStyle = {
        fontWeight: 'bold',
        backgroundColor: '#cccab4'
    }

    const columns = [
        { field: `storeName`, headerName: 'Store Name', flex: 1, sortable: true },
        { field: 'beerName', headerName: 'Beer Name', flex: 1, sortable: true },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1, sortable: true },
    ];

    const rows = inventory.map(entry => ({
        id: entry.id,
        storeName: entry.store.name,
        beerName: entry.beer.name,
        quantity: entry.quantity
    }))

    return (
        <div style={{ height: 650, width: '100%', paddingTop: '20px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20]}
                style={customDataGridStyle}
                disableRowSelectionOnClick
            />
        </div>
    );

}

export default InventoryComponent
