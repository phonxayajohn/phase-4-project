import { useEffect, useState } from "react";

function BeerForm({ storeId, onAddBeer }) {
    const [beers, setBeers] = useState([])
    const [beerId, setBeerId] = useState("")
    const [quantity, setQuantity] = useState("")
    const [formErrors, setFormErrors] = useState([])

    useEffect(() => {
        fetch("/beers")
            .then((res) => res.json())
            .then(setBeers)
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
            beer_id: beerId,
            store_id: storeId,
            quantity,
        }

        fetch("/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.ok) {
                res.json().then((newBeerInventory) => {
                    onAddBeer(newBeerInventory)
                    setFormErrors([])
                })
            } else {
                res.json().then((err) => setFormErrors(err.errors))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="beer_id">Beer:</label>
            <select
                id="beer_id"
                name="beer_id"
                value={beerId}
                onChange={(e) => setBeerId(e.target.value)}
            >
                <option value="">Select beer</option>
                {beers.map((beer) => (
                    <option key={beer.id} value={beer.id}>
                        {beer.name}
                    </option>
                ))}
            </select>
            <label htmlFor="beer_id">Quantity:</label>
            <input
                id="quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            {formErrors.length > 0
                ? formErrors.map((err) => (
                    <p key={err} style={{color: "red" }}>
                        {err}
                    </p>
                ))
                : null}
            <button type="submit">Add to Store</button>
        </form>
    )

}

export default BeerForm