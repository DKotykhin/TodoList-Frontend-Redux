import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "components/navBar/NavBar";
import Footer from "components/footer/Footer";

const Layout: React.FC = () => {
    return(
        <div>
            <div style={{'minHeight': 'calc(100vh - 64px)'}}>
                <header>
                    <NavBar/>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout;