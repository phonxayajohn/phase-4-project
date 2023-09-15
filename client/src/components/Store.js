import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import BeerForm from "./BeerForm";


function Store() {
    const [{ data: store, error, status}, setStore] = useState({
        data: null,
        error: null,
        status: "pending",
    })
    const { id } = useParams()

    useEffect(() => {
        fetch(`/stores/${id}`).then((res) => {
            if (res.ok) {
                res.json().then((store) => 
                    setStore({ data: store, error: null, status: "resolved" })
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

    if (status === "pending") return <h1>Loading...</h1>
    if (status === "rejected") return <h1>Error: {error.error}</h1>

    return (
        <section className="container">
            <div className="card">
                <h1>{store.name}</h1>
                <p>{store.address}</p>
            </div>
            <div className="card">
                <h3>Add Beer</h3>
                <BeerForm storeId={store.id} onAddBeer={handleAddBeer} />
            </div>
            <div className="card">
                <h2>Store Inventory</h2>
                <table className="store-inventory-table">
                    <thead>
                        <tr>
                            <th>Beer Name</th>
                            <th>Brand</th>
                            <th>Style</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.inventory.map((inventory) => (
                            <tr key={inventory.beer.id}>
                                <td>{inventory.beer.name}</td>
                                <td>{inventory.beer.brand}</td>
                                <td>{inventory.beer.style}</td>
                                <td>{inventory.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )


}

export default Store