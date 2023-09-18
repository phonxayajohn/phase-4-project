import { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DataGrid } from "@mui/x-data-grid";

function AddProductForm() {
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [style, setStyle] = useState('')
    const [allBeers, setAllBeers] = useState([])

    useEffect(() => {
        fetch('/beers')
            .then(res => res.json())
            .then(setAllBeers)
    }, [])

    const buttonStyle = {
        color: 'black',
        background: '#b1ac7c',
        fontWeight: 'bold',
        borderRadius: '5px'
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/beers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                brand: brand,
                style: style
            }),
        })
            .then(res => res.json())
        setName('')
        setBrand('')
        setStyle('')
            .catch((error) => {
                console.error('Error:', error)
            })
    }


    const customDataGridStyle = {
        fontWeight: 'bold',
        backgroundColor: '#cccab4'
    }

    const columns = [
        { field: `beerName`, headerName: 'Beer Name', flex: 1, sortable: true },
        { field: `beerBrand`, headerName: 'Brand', flex: 1, sortable: true },
        { field: `beerStyle`, headerName: 'Style', flex: 1, sortable: true },

    ]
    const rows = allBeers.map(entry => ({
        id: entry.id,
        beerName: entry.name,
        beerBrand: entry.brand,
        beerStyle: entry.style
    }))

    return (
        <Box className="add-container">
            <Card className="add-card">
                <Typography variant="h4" margin="15px">Add New Product</Typography>
                <form onSubmit={handleSubmit}>
                    <div className="new-beer-form">
                        <TextField
                            className="input-text"
                            type="text"
                            id="name"
                            value={name}
                            margin="dense"
                            variant="filled"
                            label="Beer Name"
                            onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="new-beer-form">
                        <TextField
                            className="input-text"
                            type="text"
                            id="brand"
                            value={brand}
                            margin="dense"
                            variant="filled"
                            label="Beer Brand"
                            onChange={e => setBrand(e.target.value)} />
                    </div>
                    <div className="new-beer-form">
                        <TextField
                            className="input-text"
                            type="text"
                            id="style"
                            value={style}
                            margin="dense"
                            variant="filled"
                            label="Style"
                            onChange={e => setStyle(e.target.value)} />
                    </div>
                    <br />
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
                <div className="beer-inventory">
                    <h3 colSpan="3">Beer List</h3>
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

export default AddProductForm
