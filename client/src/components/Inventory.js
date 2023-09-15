// import { useState, useEffect } from "react";

function InventoryComponent() {
    return <div className="inventory-header">
        <h1>Feature under construction!</h1>
    </div>
//     const [inventory, setInventory] = useState([])

//     useEffect(() => {
//         fetch('/inventory')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             setInventory(data)
//         })
//         .catch(error => {
//             console.error('Error:', error)
//         })
//     }, [])

//     return (
//         <div>
//             <h1>Inventory</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Store Name</th>
//                         <th>Beer Name</th>
//                         <th>Quantity</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {inventory.map(entry => (
//                         <tr key={entry.id}>
//                             <td>{entry.store.name}</td>
//                             <td>{entry.beer.name}</td>
//                             <td>{entry.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// 
}

export default InventoryComponent