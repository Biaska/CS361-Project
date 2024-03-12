import Navbar from "./Navbar"
import { Outlet, useLocation } from "react-router-dom"

const Layout: React.FC = () => {

    return (
        <>
            <div className="page">
                <Navbar />
                <div className="content">
                    <Outlet />
                </div>
            </div> 
        </>
    )
}
export default Layout