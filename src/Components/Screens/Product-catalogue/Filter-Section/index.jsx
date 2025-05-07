import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from './FilterDrawer';
import { Badge, Stack } from '@mui/material';
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

  React.useEffect(() => {
    setSortBy(filteredPayload?.sort_by || '');
  }, [filteredPayload?.sort_by]);

  const filtersApplied =
    Number(!!filteredPayload?.metal?.length > 0) +
    Number(!!filteredPayload?.gender?.trim()) +
    Number(!!filteredPayload?.min_price || !!filteredPayload?.max_price) +
    Number(!!filteredPayload?.purity?.length > 0) +
    Number(!!filteredPayload?.selectedCollections?.length > 0);

  return (
    <Stack
      direction="row"
      gap={'1rem'}
      justifyContent={'end'}
      width={'100%'}
      alignItems={'center'}
      flexWrap={'wrap'}
      marginY={{ md: '1rem', xs: '1.5rem' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: { md: '1rem', xs: '0.7rem' },
          flexWrap: 'wrap'
        }}
      >
        <select
          className="form-select"
          aria-label="Default select example"
          style={{
            border: '1px solid #662A2E',
            cursor: 'pointer',
            boxShadow: 'none',
            outline: 'none',
            width: '13rem',
            padding: '0.375rem 0.75rem',
            textTransform: 'capitalize',
            minHeight: '2.6rem'
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
              value={item?.value}
              key={ind}
              style={{
                border: '1px solid #662A2E',
                borderRadius: '0',
                cursor: 'pointer !important',
                textTransform: 'capitalize'
              }}
            >
              {item?.label}
            </option>
          ))}
        </select>

        <Badge
          badgeContent={filtersApplied}
          color="secondary"
          invisible={filtersApplied === 0}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.9rem',
              height: '22px',
              minWidth: '22px',
              padding: '0 6px'
            }
          }}
        >
          <Box
            onClick={() => setOpen(true)}
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              background: '#6D3439',
              paddingX: '1rem',
              paddingY: '0.5rem',
              borderRadius: '5px',
              color: '#fff',
              cursor: 'pointer',
              minWidth: '8rem',
              justifyContent: 'center',
              fontSize: { md: '1.1rem', xs: '1rem' },
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                background: '#531f23',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }
            }}
            role="button"
          >
            <TuneIcon /> <span>Filter</span>
          </Box>
        </Badge>
      </Box>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
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
          setOpen={setOpen}
          filteredPayload={filteredPayload}
        />
      </Drawer>
    </Stack>
  );
}
