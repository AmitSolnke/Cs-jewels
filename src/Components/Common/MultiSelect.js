import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleSelectChip({
  collections,
  setSelectedCollections,
  selectedCollections = []
}) {
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    if (collections.length && selectedCollections.length) {
      const preselected = collections.filter((c) =>
        selectedCollections.includes(c.id)
      );
      setSelected(preselected);
      setSelectedCollections(preselected.map((item) => item.id));
    } else {
      setSelected([]);
      setSelectedCollections([]);
    }
  }, [JSON.stringify(collections), JSON.stringify(selectedCollections)]);

  const handleSelectionChange = (event, value) => {
    setSelected(value);
    setSelectedCollections(value?.map((item) => item?.id));
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={collections}
      value={selected}
      disableCloseOnSelect
      disablePortal
      limitTags={1}
      onChange={handleSelectionChange}
      PopperProps={{
        modifiers: [
          {
            name: 'flip',
            enabled: false
          }
        ],
        placement: 'bottom-start'
      }}
      getOptionLabel={(option) => option.collection_name}
      ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps} style={{ width: 200 }}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.collection_name}
          </li>
        );
      }}
      componentsProps={{
        clearIndicator: {
          sx: {
            color: '#ff0000',
            '&:hover': { color: '#cc0000' },
            height: 'auto !important'
          },
          children: <ClearIcon />
        },
        popupIndicator: {
          sx: {
            color: '#662A2E',
            '&:hover': { color: '#451a1d' },
            height: 'auto !important'
          },
          children: <ArrowDropDownIcon />
        }
      }}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label="Collections" placeholder="Collections" />
      )}
    />
  );
}
