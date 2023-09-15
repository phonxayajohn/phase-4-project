import { useState, useEffect } from "react";
import React from "react";
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import "../index.css"

function InventoryComponent() {
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        fetch('/inventory')
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
        <div style={{ height: 400, width: '100%', paddingTop: '20px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                style={customDataGridStyle}
            />
        </div>
    );

}

export default InventoryComponent

/* <div>
    <h1>Inventory</h1>
    <table>
        <thead>
            <tr>
                <th>Store Name</th>
                <th>Beer Name</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {inventory.map(entry => (
                <tr key={entry.id}>
                    <td>{entry.store.name}</td>
                    <td>{entry.beer.name}</td>
                    <td>{entry.quantity}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div> */