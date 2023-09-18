import { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DataGrid } from "@mui/x-data-grid";




function AddStoreForm() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [stores, setStores] = useState([])

    const buttonStyle = {
        color: 'black',
        background: '#b1ac7c',
        fontWeight: 'bold',
        borderRadius: '5px'
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/stores', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                address: address
            })
        })
            .then(res => res.json())
            .then(newStore => {
                setStores(prevStores => [...prevStores, newStore])
                setName('')
                setAddress('')
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    useEffect(() => {
        fetch(`/stores`)
        .then(res => res.json())
        .then(setStores)
    }, [])

    const customDataGridStyle = {
        fontWeight: 'bold',
        backgroundColor: '#cccab4'
    }

    const columns = [
        { field: `storeName`, headerName: 'Store', flex: 1, sortable: true },
        { field: `address`, headerName: 'Address', flex: 1, sortable: true },
    ]
    const rows = stores.map(entry => ({
        id: entry.id,
        storeName: entry.name,
        address: entry.address,
    }))

    return (
        <Box className="add-container">
            <Card className="add-card">
                <Typography variant="h4" margin="15px">Add New Store</Typography>
                <form onSubmit={handleSubmit}>
                    <div className="new-store-form">
                        <TextField 
                        className="input-text" 
                        type="text" 
                        id="name"
                        value={name}
                        margin="dense"
                        variant="filled"
                        label="Store Name" 
                        onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="new-store-form">
                        <TextField 
                        className="input-text" 
                        type="text" 
                        id="address"
                        value={address}
                        margin="dense"
                        variant="filled"
                        label="Address" 
                        onChange={e => setAddress(e.target.value)} />
                    </div>
                    <br/>
                    <Button
                        variant="contained"
                        type="submit"
                        style={buttonStyle}
                    >
                        Submit
                    </Button>
                </form>
            </Card>
            <Card className="add-card">
                <div className="store-list">
                    <h3 colSpan="2">Store List</h3>
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
                        disableRowSelectionOnClick
                    />
                </div>
            </Card>
        
        </Box>
    )

}

export default AddStoreForm