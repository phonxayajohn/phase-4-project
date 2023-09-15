import { useState } from "react";

function AddProductForm() {
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [style, setStyle] = useState('')

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
            .then(data => window.location.href = '/')
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <section className="container">
            <div className="card">
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="new-beer-form">
                        <label>Beer Name:</label>
                        <br />
                        <input className="input-text" type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <br />
                    <div className="new-beer-form">
                        <label>Brand:</label>
                        <br />
                        <input className="input-text" type="text" value={brand} onChange={e => setBrand(e.target.value)} />
                    </div>
                    <br />
                    <div className="new-beer-form">
                        <label>Style:</label>
                        <br />
                        <input className="input-text" type="text" value={style} onChange={e => setStyle(e.target.value)} />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    )


}

export default AddProductForm