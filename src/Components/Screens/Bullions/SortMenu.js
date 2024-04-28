import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

export const SortMenu = ({ onClose }) => {

  const handleClose = () => {
    onClose();
  }

  return (
    <div className="sort-menu">
      <div className="bullions-filter-sort-menu">
        <div className="bullions-filter-header p-3 d-flex justify-content-between align-items-center">
          <h2>SORT BY</h2>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="sort-by-radio-group p-3">
          <FormControl>
            <FormLabel id="sort-by-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              aria-labelledby="sort-by-radio-buttons-group-label"
              name="sort-by-radio-buttons-group"
            >
              <FormControlLabel
                value="popularity"
                control={<Radio style={{ color: '#000' }} />}
                label="Popularity"
              />
              <FormControlLabel
                value="newlyAdded"
                control={<Radio style={{ color: '#000' }} />}
                label="Newly added"
              />
              <FormControlLabel
                value="priceLowToHigh"
                control={<Radio style={{ color: '#000' }} />}
                label="Price - Low to high"
              />
              <FormControlLabel
                value="priceHighToLow"
                control={<Radio style={{ color: '#000' }} />}
                label="Price - High to low"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};
