import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from './FilterDrawer';
import { Badge, Skeleton, Stack } from '@mui/material';
import { sortbyList } from '../../../../utilities/filterContants';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function FilterSection({
  filterHandler,
  filteredPayload,
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
    Number(!!filteredPayload?.genders?.length > 0) +
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
              width={192}
              height={42}
              sx={{ borderRadius: '4px' }}
            />
          </>
        ) : (
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

            <FormControl
              variant="outlined"
              size="small"
              sx={{
                width: '12rem',
                minHeight: '2.6rem'
              }}
            >
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortby}
                onChange={handleSortBy}
                disabled={isLoading}
                label="Sort By"
                sx={{
                  textTransform: 'capitalize',
                  outline: ' #847f7f',
                  borderRadius: '5px'
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        margin: '0',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          background: (theme) => theme.palette.action.selected
                        },
                        '&.Mui-selected': {
                          background: (theme) => theme.palette.action.selected
                        }
                      },
                      '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                        padding: '0',
                        backgroundColor: '#f5f5f5'
                      }
                    }
                  }
                }}
              >
                {sortbyList?.map((item, ind) => (
                  <MenuItem
                    key={ind}
                    value={item?.value}
                    sx={{
                      textTransform: 'capitalize',
                      padding: '0.6rem'
                    }}
                  >
                    {item?.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
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
