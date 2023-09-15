import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReadOnlyBeerRow = ({ inventory, handleEditClick }) => {
    return (
  
            <tr key={inventory.beer.id}>
                <td>{inventory.beer.name}</td>
                <td>{inventory.beer.brand}</td>
                <td>{inventory.beer.style}</td>
                <td>{inventory.quantity}</td>
                <td><EditIcon type="button" onClick={(event) => handleEditClick(event, inventory)} /> <DeleteIcon /></td>
            </tr>

    )
}

export default ReadOnlyBeerRow