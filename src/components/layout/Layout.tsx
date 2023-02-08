import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "components/navBar/NavBar";
import Footer from "components/footer/Footer";

import styles from './layout.module.scss';

const Layout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <header>
                <NavBar />
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout;