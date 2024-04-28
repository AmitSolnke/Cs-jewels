import React from "react";
import Drawer from "@mui/material/Drawer";

export const BullionsFilter = ({ isOpen, onClose, children }) => {
  return (
    <Drawer
      className="bullions-filter"
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      elevation={16}
      ModalProps={{ keepMounted: true }}
    >
      <div
        role="presentation"
        // onClick={onClose}
        // onKeyDown={onClose}
      >
        {children}
      </div>
    </Drawer>
  );
};
