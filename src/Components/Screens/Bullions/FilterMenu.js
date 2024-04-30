import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  Button,
  AccordionDetails,
  AccordionActions,
  FormGroup,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export const FilterMenu = () => {
  const initialState = {
    type: {
      coins: false,
      bars: false,
      vedhani: false,
    },
    metal: {
      diamond: false,
      gold: false,
      silver: false,
      roseGold: false,
    },
    weight: false,
  };
  const [state, setState] = useState(initialState);

  const handleCheckboxChange = (category, name) => {
    setState((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [name]: !prevState[category][name],
      },
    }));

    console.log(state);
  };

  const handleClearLinkClick = (category) => {
    setState((prevState) => ({
      ...prevState,
      [category]: Object.fromEntries(
        Object.keys(prevState[category]).map((key) => [key, false])
      ),
    }));
  };
  return (
    <div className="bullions-filter-menu">
      <div className="bullions-filter-header p-3 d-flex justify-content-between align-items-center">
        <h2>FILTERS</h2>
        <Link to="#">RESET</Link>
      </div>

      <div className="p-3">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="accordion-title"
          >
            Type
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Link to="#" onClick={() => handleClearLinkClick("type")}>
                CLEAR
              </Link>
              {Object.entries(state.type).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      style={{color: '#000'}}
                      onChange={() => handleCheckboxChange("type", key)}
                    />
                  }
                  label={key}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            className="accordion-title"
          >
            Metal
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Link to="#" onClick={() => handleClearLinkClick("metal")}>
                CLEAR
              </Link>
              {Object.entries(state.metal).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      style={{color: '#000'}}
                      onChange={() => handleCheckboxChange("metal", key)}
                    />
                  }
                  label={key}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            className="accordion-title"
          >
            Weight
          </AccordionSummary>
          <AccordionDetails>No weight data</AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
