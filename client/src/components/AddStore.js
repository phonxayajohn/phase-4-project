import { useState } from "react";

function AddStoreForm() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/stores', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                name: name,
                address: address
            })
        })
            .then(res => res.json())
            .then(data => window.location.href = '/')
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    return (
        <section className="add-container">
            <div className="add-card">
                <h2>Add New Store</h2>
                <form onSubmit={handleSubmit}>
                    <div className="new-store-form">
                        <label>Name:</label>
                        <br />
                        <input className="input-text" type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <br />
                    <div className="new-store-form">
                        <label>Address:</label>
                        <br />
                        <input className="input-text" type="text" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    )

}

export default AddStoreForm