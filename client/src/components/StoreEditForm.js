import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


function StoreEditForm(props) {
    const id = props.storeId
    const [name, setName] = useState("");
    const [address, setAddress] = useState("")
    const [showForm, setShowForm] = useState(true)

    useEffect(() => {
        fetch(`/stores/${id}`)
        .then(res => res.json())
        .then(data => {
            setName(data.name)
            setAddress(data.address)
        })
    }, [id])

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/stores/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                address: address
            }),
        })
            .then(res => res.json())
            .then((data) => {
                if (data.id === id) {
                    window.location.href = `/`
                } else {
                    console.error('Update failed')
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    function handleCancel() {
        setShowForm(false)

    }

    const buttonStyle = { color: 'black' }

    return (
        <Box className="container">
            {showForm && (
            <Card className="card">

                <h2>Edit Store</h2>
                <form onSubmit={handleSubmit}>
                    <div className="edit-store-form">
                        <label>Name:</label>
                        <br />
                        <TextField 
                            className="input-text" 
                            type="text" 
                            value={name}
                            margin="dense"
                            variant="filled"
                            size="small"
                            label="Store Name"
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>
                    <br />
                    <div className="edit-store-form">
                        <label>Address:</label>
                        <br />
                        <TextField 
                            className="input-text" 
                            type="text" 
                            value={address}
                            margin="dense"
                            variant="filled"
                            size="small"
                            label="Address"
                            onChange={e => setAddress(e.target.value)} 
                        />
                    </div>
                    <br />
                    <Button style={buttonStyle} type="submit" value="Submit">Submit</Button>
                    <Button style={buttonStyle} type="button" onClick={handleCancel}>Cancel</Button>
                </form>

            </Card>
            )}
        </Box>
    )
 
}

export default StoreEditForm;