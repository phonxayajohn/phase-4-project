import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Navbar() {
    return (
        <header>
            <nav>
            <div className="navtitle">
                <h1>Beer Depot</h1>
            </div>
                <ul>
                    <li className="navlinks">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="navlinks">
                        <Link to="/add_store">Add Store</Link>
                    </li>
                    <li className="navlinks">
                        <Link to="/add_product">Add Product</Link>
                    </li>
                    <li className="navlinks">
                        <Link to="/inventory">View Inventory</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar