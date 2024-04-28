import { useState } from 'react';
import Sidebar from './Components/Common/Sidebar';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import { ShoppingBag } from './Components/Screens/ShoppingBag';

const DashboardLayout = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleOpenDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
    return (
        <>
            <ShoppingBag open={openDrawer} handleDrawer={handleOpenDrawer} style={{display: 'none'}} />
            <Header openDrawer={openDrawer} handleOpenDrawer={handleOpenDrawer} />
            <div className="d-flex dash-wrapper">
                <div className="col-0 col-md-5 col-lg-4">
                    <Sidebar />
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default DashboardLayout
