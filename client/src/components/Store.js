import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BeerForm from "./BeerForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material'

function Store() {
    const [beers, setBeers] = useState([])
    const [updateBeer, setUpdateBeer] = useState(false)
    const [editedBeer, setEditedBeer] = useState(null)
    const [deletedBeerIds, setDeletedBeerIds] = useState([])
    const [itemToDelete, setItemToDelete] = useState(null)
    const { id } = useParams()

    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleClickDelete = (inventory) => {
        setItemToDelete(inventory)
        setShow(true)
    }

    const [{ data: store, error, status }, setStore] = useState({
        data: null,
        error: null,
        status: "pending",
    })

    useEffect(() => {
        fetch(`/stores/${id}`).then((res) => {
            if (res.ok) {
                res.json().then((store) => {
                    console.log(store)
                    setStore({ data: store, error: null, status: "resolved" })
                }
                )
            } else {
                res.json().then((err) =>
                    setStore({ data: null, error: err.error, status: "rejected" })
                )
            }
        })
    }, [id])

    useEffect(() => {
        if (updateBeer) {
            fetch(`/stores/${id}`).then((res) => {
                if (res.ok) {
                    res.json().then((store) => {
                        console.log(store)
                        setUpdateBeer(false)
                        setStore({ data: store, error: null, status: "resolved" })
                    }
                    )
                } else {
                    res.json().then((err) =>
                        setStore({ data: null, error: err.error, status: "rejected" })
                    )
                }
            })
        }
    }, [updateBeer, id])

    function handleAddBeer(newInventoryEntry) {
        setStore({
            data: {
                ...store,
                inventory: [
                    ...store.inventory,
                    newInventoryEntry,
                ],
            },
            error: null,
            status: "resolved",
        })
    }

    const handleEditBeer = (beer) => {
        setEditedBeer(beer)
    }

    const saveBeer = (e) => {
        e.preventDefault()
        console.log(editedBeer)
        fetch(`/inventory/${editedBeer.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({quantity: editedBeer.quantity})
        })
        .then(() => { 
        fetch(`/beers/${editedBeer.beer.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(editedBeer.beer),
        })
            .then(() => { setEditedBeer(null); setUpdateBeer(true) })
        })
    }



    const deleteBeer = (id) => {
        console.log(id)
        fetch(`/inventory/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    setDeletedBeerIds((prevId) => [...prevId, id])
                    setUpdateBeer(true)
                    handleClose()
                }
            })
    }

    if (status === "pending")
        return <h1>Loading...</h1>
    if (status === "rejected")
        return <h1>Error: {error.error}</h1>

    return (
        <section className="add-container">
            <div className="add-card">
                <h1>{store.name}</h1>
                <p>{store.address}</p>
            </div>
            <div className="add-card">
                <h3>Add Beer</h3>
                <BeerForm storeId={store.id} onAddBeer={handleAddBeer} />
            </div>
            <div className="add-card">
                <h2>Store Inventory</h2>
                <table className="store-inventory-table">
                    <thead>
                        <tr>
                            <th>Beer Name</th>
                            <th>Brand</th>
                            <th>Style</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {store.inventory.map((inventory) => {

                            if (editedBeer && inventory.beer?.id === editedBeer.beer.id) {
                                return (
                                    <tr key={inventory.beer.id}>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.beer.name}
                                                size="small"
                                                onChange={(event) => {
                                                    setEditedBeer({ ...editedBeer, beer: {...editedBeer.beer, name: event.target.value} });
                                                }} />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.beer.brand}
                                                size="small"
                                                onChange={(event) => {
                                                    setEditedBeer({ ...editedBeer, beer: {...editedBeer.beer, brand: event.target.value} });
                                                }} />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.beer.style}
                                                size="small"
                                                onChange={(event) => {
                                                    setEditedBeer({ ...editedBeer, beer: {...editedBeer.beer, style: event.target.value} });
                                                }} />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.quantity}
                                                size="small"
                                                onChange={(event) => {
                                                    setEditedBeer({ ...editedBeer, quantity: parseInt(event.target.value) });
                                                }} />
                                        </td>
                                        <td>
                                            <EditIcon onClick={saveBeer} />
                                            <DeleteIcon onClick={() => handleClickDelete(inventory)} />

                                        </td>
                                    </tr>
                                )
                            }
                            if (inventory.beer) {
                                return (
                                    <tr key={inventory.beer.id}>
                                        <td>{inventory.beer.name}</td>
                                        <td>{inventory.beer.brand}</td>
                                        <td>{inventory.beer.style}</td>
                                        <td>{inventory.quantity}</td>
                                        <td>
                                            <EditIcon onClick={() => handleEditBeer(inventory)} />
                                            <DeleteIcon onClick={() => handleClickDelete(inventory)} />
                                        </td>
                                    </tr>
                                )
                            }
                        }
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <Dialog
                    open={show}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Confirm deletion of ${itemToDelete ? itemToDelete.beer.name : 'UNDEFINED'}?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please confirm selection. Action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => deleteBeer(itemToDelete.id)} autoFocus>
                            Delete
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </section>
    );
}

export default Store;