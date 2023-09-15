import React, { useEffect, useState } from "react";

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

    return (
        <section className="container">
            {showForm && (
            <div className="card">
                <h2>Edit Store</h2>
                <form onSubmit={handleSubmit}>
                    <div className="edit-store-form">
                        <label>Name:</label>
                        <br />
                        <input 
                            className="input-text" 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>
                    <br />
                    <div className="edit-store-form">
                        <label>Address:</label>
                        <br />
                        <input 
                            className="input-text" 
                            type="text" 
                            value={address} 
                            onChange={e => setAddress(e.target.value)} 
                        />
                    </div>
                    <br />
                    <input className="submit-button" type="submit" value="Submit" />
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
            )}
        </section>
    )
 
}

export default StoreEditForm;