import { useState } from "react";

const Header = () => {

    const [btnName,setBtnName] = useState("Login");

    return (
        <table className="Header-component-table">
            <tbody>
                <tr>
                    <td className="header-logo">
                        <img src="header-logo.png" alt="header-logo" />
                    </td>
                    <td className="header-nav-items">
                        <ul>
                            <li className="cart-item">
                                Cart
                            </li>
                            <button className="login" onClick={()=>{
                               btnName === "Login" ? setBtnName("Logout") : setBtnName("Login") 
                            }}>
                                {btnName}
                            </button>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    )
};

export default Header;