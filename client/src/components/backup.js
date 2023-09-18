// import React, { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { TextField } from "@mui/material";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import EditIcon from '@mui/icons-material/Edit';

// function StoreEditForm(props) {
//     const id = props.storeId
//     const [name, setName] = useState("");
//     const [address, setAddress] = useState("")
//     const [open, setOpen] = useState(false)

//     useEffect(() => {
//         fetch(`/stores/${id}`)
//             .then(res => res.json())
//             .then(data => {
//                 setName(data.name)
//                 setAddress(data.address)
//             })
//     }, [id])

//     function handleSubmit(e) {
//         e.preventDefault()
//         fetch(`/stores/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name: name,
//                 address: address
//             }),
//         })
//         .then(res => res.json())
//         .then((data) => {
//                 console.log(data)
//                 if (data.id === id) {
//                     window.location.href = `/`
//                 } else {
//                     console.error('Update failed')
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error)
//             })
//     }

//     const handleClickOpen = () => {
//         setOpen(true)
//     }

//     const handleClose = () => {
//         setOpen(false)
//     }

//     return (
//         <Box>
//             <Button startIcon={<EditIcon />} onClick={() => {
//                 handleClickOpen();
//                 props.onClick()
//             }}>
//                 Edit
//             </Button>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Edit Store</DialogTitle>
//                 <form onSubmit={handleSubmit}>
//                     <DialogContent className="edit-store-form">
//                         <DialogContentText>Edit Store information</DialogContentText>
//                         <TextField
//                             className="input-text"
//                             type="text"
//                             id={name}
//                             margin="dense"
//                             variant="filled"
//                             size="small"
//                             label="Store Name"
//                             defaultValue={name}
//                             onChange={e => setName(e.target.value)}
//                         />
//                         <TextField
//                             className="input-text"
//                             type="text"
//                             id={address}
//                             margin="dense"
//                             variant="filled"
//                             size="small"
//                             label="Address"
//                             defaultValue={address}
//                             onChange={e => setAddress(e.target.value)}
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose} onSubmit={handleSubmit}>Submit</Button>
//                         <Button type="Button" onClick={handleClose}>Cancel</Button>
//                     </DialogActions>
//                 </form>
//             </Dialog>
//         </Box>
//     )

// }

// export default StoreEditForm;
