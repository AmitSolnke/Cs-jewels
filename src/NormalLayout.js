import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import { ShoppingBag } from './Components/Screens/ShoppingBag';
import { useState } from 'react';

const NormalLayout = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleOpenDrawer = () => {
        console.log("in handle");
        setOpenDrawer(!openDrawer);
    };
    return (
        <>
            <ShoppingBag open={openDrawer} handleDrawer={handleOpenDrawer} style={{ display: 'none' }} />
            <Header openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer} />
            <Outlet />
        </>
    )
}

export default NormalLayout
