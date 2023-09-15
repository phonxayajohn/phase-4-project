import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BeerForm from "./BeerForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBeerForm from './EditBeerForm'
import { TextField } from '@mui/material'

function Store() {
    const [editedBeer, setEditedBeer] = useState(null)

    const [{ data: store, error, status }, setStore] = useState({
        data: null,
        error: null,
        status: "pending",
    })
    const { id } = useParams()

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

    const handleEditCloseForm = () => {
        setEditedBeer(null)
    }

    const saveBeer = () => {
        console.log(editedBeer)
        fetch(`/beers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(editedBeer),
        })
        .then(res => {setEditedBeer(null)})
    }
    

    const deleteBeer = (id) => {
        // delete beer from db


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
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {store.inventory.map((inventory) => {
                            if (editedBeer && inventory.beer.id === editedBeer.beer.id) {
                                return (
                                    <tr key={inventory.beer.id}>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.beer.name}
                                                size="small"
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setEditedBeer({ ...editedBeer, name: event.target.value });
                                                }} />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.beer.brand}
                                                size="small"
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setEditedBeer({ ...editedBeer, brand: event.target.value });
                                                }} />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.beer.style}
                                                size="small"
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setEditedBeer({ ...editedBeer, style: event.target.value });
                                                }} />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-basic"
                                                variant="filled"
                                                defaultValue={inventory.quantity}
                                                size="small"
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setEditedBeer({ ...editedBeer, quantity: event.target.value });
                                                }} />
                                        </td>
                                        <td>
                                            <EditIcon onClick={saveBeer} />
                                            <DeleteIcon onClick={() => deleteBeer(inventory.beer.id)} />

                                        </td>
                                    </tr>
                                )
                            }
                            return (
                                <tr key={inventory.beer.id}>
                                    <td>{inventory.beer.name}</td>
                                    <td>{inventory.beer.brand}</td>
                                    <td>{inventory.beer.style}</td>
                                    <td>{inventory.quantity}</td>
                                    <td>
                                        <EditIcon onClick={() => handleEditBeer(inventory)} />
                                        <DeleteIcon onClick={() => deleteBeer(inventory.beer.id)} />
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

    export default Store;