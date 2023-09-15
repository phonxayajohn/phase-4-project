import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar({ handleLogout }) {
    const buttonStyle = {
        color: 'black',
        background: '#b1ac7c',
        fontWeight: 'bold',
        borderRadius: '5px'
    }
    
    return (
        <header>
            <nav>
            <div className="navtitle">
                <Typography variant="h1">Beer Depot</Typography>
            </div>
                <ul>
                    <li className="navlinks">
                        <Button size="medium" variant="contained" style={buttonStyle} component={Link} to="/">Home</Button>
                    </li>
                    <li className="navlinks">
                        <Button size="medium" variant="contained" style={buttonStyle} component={Link} to="/add_store">Add Store</Button>
                    </li>
                    <li className="navlinks">
                        <Button size="medium" variant="contained" style={buttonStyle} component={Link} to="/add_product">Add Product</Button>
                    </li>
                    <li className="navlinks">
                        <Button size="medium" variant="contained" style={buttonStyle} component={Link} to="/inventory">View Inventory</Button>
                    </li>
                    <li className="navlinks">
                        <Button size="medium" variant="contained" style={buttonStyle} onClick={handleLogout}>Log Out</Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar