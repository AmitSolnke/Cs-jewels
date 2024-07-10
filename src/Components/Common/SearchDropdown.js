import React from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

export const SearchDropdown = ({setSearchDropdown}) => {
    return (
        <Box>
            <Grid>
                <div className="search-dropdown-wrapper p-4">
                    <CloseIcon className="menu-close" onClick={() => setSearchDropdown(false)} />
                    <div className="col-6">
                        <div className="col-12 search-wrapper">
                            <input
                                type="text"
                                className="search-input col-10"
                                placeholder="Search for a product"
                            />
                            <button className="search-btn col-2"> SUBMIT </button>
                        </div>
                        <div className="search-links">
                            <h3 className="drawer-header">POPULAR SEARCHES</h3>
                            <div className="col-12">
                                <li className="w-100">
                                    <Link to="/" className="menu-link">
                                        Fancy Earrings
                                    </Link>
                                </li>
                                <li className="w-100">
                                    <Link to="/" className="menu-link">
                                        Gift under 10k
                                    </Link>
                                </li>
                                <li className="w-100">
                                    <Link to="/" className="menu-link">
                                        Every day Necklaces
                                    </Link>
                                </li>
                                <li className="w-100">
                                    <Link to="/" className="menu-link">
                                        Diamonds Mangalsutra
                                    </Link>
                                </li>
                                <li className="w-100">
                                    <Link to="/" className="menu-link">
                                        Office wear earrings
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </Box>
    );
};
