import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from './FilterDrawer';
import { Badge, Skeleton, Stack } from '@mui/material';
import { sortbyList } from '../../../../utilities/filterContants';

export default function FilterSection({
  filterHandler,
  filteredPayload,
  products,
  isLoading = false
}) {
  const [open, setOpen] = React.useState(false);
  const [sortby, setSortBy] = React.useState(filteredPayload?.sort_by || '');

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    filterHandler({
      ...filteredPayload,
      sort_by: e.target.value,
      page: 1
    });
  };

  React.useEffect(() => {
    setSortBy(filteredPayload?.sort_by || '');
  }, [filteredPayload?.sort_by]);

  const filtersApplied =
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
      marginTop={{ md: '2.5rem', xs: '2rem' }}
      marginBottom={{ md: '1.5rem', xs: '1.5rem' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: { md: '1rem', xs: '0.7rem' },
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              width={120}
              height={40}
              sx={{ borderRadius: '5px' }}
            />
            <Skeleton
              variant="rectangular"
              width={168}
              height={42}
              sx={{ borderRadius: '4px' }}
            />
          </>
        ) : (
          products?.length > 0 && (
            <>
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
                    paddingX: '1rem',
                    paddingY: '0.5rem',
                    borderRadius: '5px',
                    color: '#fff',
                    cursor: 'pointer',
                    minWidth: '8rem',
                    justifyContent: 'center',
                    fontSize: { md: '1.1rem', xs: '1rem' },
                    transition: 'all 0.3s ease-in-out',
                    color: isLoading ? '#666' : '#fff',
                    cursor: isLoading ? 'no-drop' : 'pointer',
                    pointerEvents: isLoading ? 'none' : 'all',
                    background: isLoading ? '#ccc' : '#6D3439',
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

              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  border: '1px solid #662A2E',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  outline: 'none',
                  width: '11rem',
                  padding: '0.375rem 0.75rem',
                  textTransform: 'capitalize',
                  minHeight: '2.6rem'
                }}
                onChange={handleSortBy}
                value={sortby}
                disabled={isLoading}
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
            </>
          )
        )}
      </Box>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
        PaperProps={{
          sx: {
            width: { sm: '25rem !important', xs: '90% !important' },
            marginTop: '0px'
          }
        }}
      >
        <FilterDrawer
          filterHandler={filterHandler}
          setOpen={setOpen}
          filteredPayload={filteredPayload}
        />
      </Drawer>
    </Stack>
  );
}
