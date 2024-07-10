import React from "react";
import successCheckIcon from "../../../images/icons/successful-checkbox.svg";
import { Typography } from "@mui/material";


export const PaymentSuccess = () => {
    return (
        <div className="success-wrapper">
            <div className="container">
                <div className="d-flex justify-content-center">
                    <img src={successCheckIcon} alt="successful icon" />
                </div>

                <Typography
                    className="text-center text-bold mt-3"
                    id="transition-modal-title"
                    variant="h2"
                    component="h2"
                    sx={{
                        fontSize: "36px",
                        letterSpacing: "5.4px",
                        fontWeight: "bolder",
                        textTransform: "uppercase",
                    }}
                >
                    THANK YOU!
                </Typography>

                <Typography
                    className="text-center mt-1 mb-5"
                    sx={{
                        fontSize: "14px",
                    }}
                >
                    Payment Succeed
                </Typography>
            </div>
        </div>
    )
}
