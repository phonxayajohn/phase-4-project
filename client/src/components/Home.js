import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StoreEditForm from "./StoreEditForm";
import '../index.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {
    const [stores, setStores] = useState([])
    const [editStoreId, setEditStoreId] = useState(null)
    const [editFormVisible, setEditFormVisible] = useState(false)
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

    const handleEditClick = (storeId) => {
        setEditStoreId(storeId)
        setEditFormVisible(true)
    }


    const handleEditCloseForm = () => {
        setEditStoreId(null)
        setEditFormVisible(false)
    }


    return (
        <section className="container">
            {stores.map((store) => (
                <div key={store.id} className="card">
                    <h2>
                        <Link to={`/stores/${store.id}`}>{store.name}</Link>
                    </h2>
                    <p>Address: {store.address}</p>
                    <div className="button-container">
                        <EditIcon onClick={() => handleEditClick(store.id)}>Edit</EditIcon>
                        <DeleteIcon onClick={() => handleDelete(store.id)}>Delete</DeleteIcon>
                    </div>
                    {editFormVisible && editStoreId === store.id && (
                        <StoreEditForm storeId={store.id} onClose={handleEditCloseForm} />
                    )}
                </div>
            ))}
        </section>
    );
}

export default Home