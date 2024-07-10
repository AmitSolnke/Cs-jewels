import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { ShoppingBag } from './Components/Screens/ShoppingBag';
import { useState } from 'react';

const HomeLayout = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleOpenDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
    return (
        <div>
            <ShoppingBag open={openDrawer} handleDrawer={handleOpenDrawer} style={{display: 'none'}} />
            <Header openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer} />
            <Outlet className="outlet-container" />
            <Footer />
        </div>
    )
}

export default HomeLayout
