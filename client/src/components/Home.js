import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StoreEditForm from "./StoreEditForm";
import '../index.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Home() {
    const [stores, setStores] = useState([])
    const [editStoreId, setEditStoreId] = useState(null)
    const [editFormVisible, setEditFormVisible] = useState(false)
    const { id } = useParams()
    const [itemToDelete, setItemToDelete] = useState(null)

    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleClickDelete = (store) => {
        setItemToDelete(store)
        setShow(true)
    }


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
                handleClose()
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

    const buttonStyle = { color: 'black' }

    function checkLength(name) {
        const styles = {
            fontSize: '30px',
            overflowWrap: 'normal',
            ...(name.length > 9 && {
                fontSize: '19px',
                overflowWrap: 'break-word',
            }),
        };
        return styles;
    }


    return (
        <Box className="container">
            {stores.map((store) => (
                <Card key={store.id} className="card">
                    <CardContent style={{ minHeight: '120px' }}>
                        <Typography className="store-card-text" variant="h4" fontWeight="bold" style={checkLength(store.name)} paddingBottom="10px">
                            <Link to={`/stores/${store.id}`}>{store.name}</Link>
                        </Typography>
                        <Typography className="store-card-text" display="block" variant="subtitle2" gutterBottom>Address:</Typography>
                        <Typography className="store-card-text" variant="subtitle1">{store.address}</Typography>
                    </CardContent>
                    <CardActions className="button-container">
                        <Button style={buttonStyle} startIcon={<EditIcon />} onClick={() => handleEditClick(store.id)}>Edit</Button>
                        <Button style={buttonStyle} startIcon={<DeleteIcon />} onClick={() => handleClickDelete(store)}>Delete</Button>
                    </CardActions>
                    {editFormVisible && editStoreId === store.id && (
                        <StoreEditForm storeId={store.id} onClose={handleEditCloseForm} />
                    )}
                </Card>
            ))}

            <div>
                <Dialog
                    open={show}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Confirm deletion of ${itemToDelete ? itemToDelete.name : 'UNDEFINED'}?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please confirm selection. Action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleDelete(itemToDelete.id)} autoFocus>
                            Delete
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Box>
    );
}

export default Home