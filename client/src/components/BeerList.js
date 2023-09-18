import React from 'react'

function BeerList({ allBeer }) {
    const { name, brand, style } = allBeer
    return (
        <tr>
            <td>{name}</td>
            <td>{brand}</td>
            <td>{style}</td>
        </tr>
    )
}

export default BeerList

