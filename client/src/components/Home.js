import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import StoreEditForm from "./StoreEditForm";
import '../index.css'

function Home() {
    const [stores, setStores] = useState ([])
    const [editStoreId, setEditStoreId] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch("/stores")
        .then((res) => res.json())
        .then(setStores)
    }, [id])

    function handleDelete(id) {
        fetch(`/stores/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                setStores((stores) =>
                stores.filter((store) => store.id !== id)
                )
            }
        })
    }
    
    return (
        <section className="container">
            {stores.map((store) => (
                <div key={store.id} className="card">
                    <h2>
                        <Link to={`/stores/${store.id}`}>{store.name}</Link>
                    </h2>
                    <p>Address: {store.address}</p>
                    {editStoreId === store.id ? (
                        <StoreEditForm storeId={store.id} />
                    ) : (
                        <>
                            <button onClick={() => setEditStoreId(store.id)}>Edit</button>
                            <button onClick={() => handleDelete(store.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </section>
    )
}

export default Home