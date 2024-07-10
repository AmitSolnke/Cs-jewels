import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import shoppingBagLogo from "./images/icons/shopping-bag.svg";
import { Badge, Typography } from "@mui/material";
import { OrderLayoutShoppingBag } from "./Components/Screens/Checkout/OrderLayoutShoppingBag";

export const ExpansionCartView = () => {
    const styles = {
        accordion: {
            backgroundColor: '#F0EEE5',
        },
    };

    return (
        <div className="expansion-cart-view-wrapper">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    style={styles.accordion}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Badge sx={{marginLeft: '3px'}} badgeContent={4} color="primary">
                        <img
                            src={shoppingBagLogo}
                            style={{ height: "20px", width: "20px" }}
                        />
                    </Badge>
                    <Typography style={{marginLeft: '5px'}}>
                        Order summary
                    </Typography>

                    <b> &#8377; 240</b>
                </AccordionSummary>
                <AccordionDetails>
                    <OrderLayoutShoppingBag />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
