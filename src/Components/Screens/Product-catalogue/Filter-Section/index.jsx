import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from './FilterDrawer';
import { Stack } from '@mui/material';
import { sortbyList } from '../../../../utilities/filterContants';

export default function FilterSection({
  filterHandler,
  metals,
  filteredPayload
}) {
  const [open, setOpen] = React.useState(false);
  const [sortby, setSortBy] = React.useState(filteredPayload?.sort_by || '');

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    filterHandler({ ...filteredPayload, sort_by: e.target.value, page: 1 });
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    setSortBy(filteredPayload?.sort_by || '');
  }, [filteredPayload?.sort_by]);

  return (
    <Stack
      direction="row"
      gap={'1rem'}
      justifyContent={'end'}
      width={'100%'}
      alignItems={'center'}
      flexWrap={'wrap'}
    >
      <Box>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{
            border: '1px solid #662A2E',
            borderRadius: '0',
            cursor: 'pointer',
            boxShadow: 'none',
            outline: 'none',
            minWidth: '15rem',
            textTransform: 'capitalize'
          }}
          onChange={handleSortBy}
          value={sortby}
        >
          <option
            value=""
            disabled
            selected
            style={{
              border: '1px solid #662A2E',
              borderRadius: '0',
              cursor: 'pointer !important'
            }}
          >
            --Sort By--
          </option>
          {sortbyList?.map((item, ind) => (
            <option
              value={item}
              key={ind}
              style={{
                border: '1px solid #662A2E',
                borderRadius: '0',
                cursor: 'pointer !important',
                textTransform: 'capitalize'
              }}
            >
              {item}
            </option>
          ))}
        </select>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          paddingRight: '1rem',
          marginY: '1rem'
        }}
      >
        <Box
          onClick={toggleDrawer(true)}
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            background: '#6D3439',
            paddingX: '1rem',
            paddingY: '0.5rem',
            borderRadius: '5px',
            color: '#fff'
          }}
          role="button"
        >
          <TuneIcon /> <span>Filter</span>
        </Box>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          PaperProps={{
            sx: {
              width: { sm: '25rem !important', xs: '90% !important' },
              marginTop: '0px'
            }
          }}
        >
          <FilterDrawer
            filterHandler={filterHandler}
            metals={metals}
            toggleDrawer={toggleDrawer}
            filteredPayload={filteredPayload}
          />
        </Drawer>
      </Box>
    </Stack>
  );
}
