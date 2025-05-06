import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';
import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelectChip from './MultiSelect';
import { getCollectionDetails } from '../../services/FrontApp/index.service';

const initialState = {
  gender: '',
  material: [],
  purity: [],
  collections: [],
  minmaxVal: { min: 0, max: 0 }
};
export default function FilterComponent({ filterHandler, metals }) {
  const [open, setOpen] = React.useState(false);

  const [gender, setGender] = React.useState('');
  const [material, setMaterial] = React.useState([]);
  const [purity, setPurity] = React.useState([]);
  const [collections, setCollections] = React.useState([]);

  const [minmaxVal, setMinMaxVal] = React.useState({ min: 0, max: 0 });
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const genderList = [
    {
      value: '0',
      label: 'Male'
    },
    {
      value: '1',
      label: 'Female'
    },
    {
      value: 'unisex',
      label: 'Unisex'
    }
  ];
  const prices = [
    {
      value: { min: 0, max: 25000 },
      label: '< ₹25,000'
    },
    {
      value: { min: 25000, max: 50000 },
      label: '₹25,000 - ₹50,000'
    },
    {
      value: { min: 50000, max: 100000 },
      label: '₹50,000 - ₹1,00,000'
    },
    {
      value: { min: 100000 },
      label: '₹1,00,000+'
    }
  ];
  const purityList = [
    {
      label: '14K',
      value: '14'
    },
    {
      label: '18K',
      value: '18'
    },
    {
      label: '22K',
      value: '22'
    },
    {
      label: '92.5K',
      value: '92.5'
    }
  ];

  const materialLists = metals?.filter(
    (item) =>
      item?.metal_type?.toLowerCase() === 'gold' ||
      item?.metal_type?.toLowerCase() === 'silver' ||
      item?.metal_type?.toLowerCase() === 'diamond'
  );
  const handleMinMaxPriceChange = (value) => {
    setMinMaxVal(value);
  };

  const handleMaterialChange = (e) => {
    const { value, checked } = e.target;
    setMaterial((prev) =>
      prev
        ? checked
          ? [...new Set([...prev, value])]
          : prev?.filter((item) => item !== value)
        : []
    );
  };

  const handlePurityChange = (e) => {
    const { value, checked } = e.target;
    setPurity((prev) =>
      prev
        ? checked
          ? [...new Set([...prev, value])]
          : prev?.filter((item) => item !== value)
        : []
    );
  };

  const handleSubmit = () => {
    filterHandler({
      min_price: minmaxVal.min,
      max_price: minmaxVal.max,
      gender,
      metal: material,
      purity: purity,
      collection: selectedCollections
    });
    setOpen(false);
  };

  const getCollectionData = async () => {
    try {
      const { data: collectionDetails } = await getCollectionDetails();
      setCollections(collectionDetails?.data);
    } catch (error) {
      setCollections([]);
    }
  };

  const clearFilters = () => {
    setGender('');
    setMinMaxVal({ min: 0, max: 0 });
    setMaterial([]);
    setPurity([]);
    setSelectedCollections([]);
    filterHandler();
    setOpen(false);
  };

  const [selectedCollections, setSelectedCollections] = React.useState([]);
  React.useEffect(() => {
    getCollectionData();
  }, []);

  const DrawerList = (
    <Stack
      sx={{
        width: '100% !important',
        padding: '1rem',
        gap: '1rem',
        height: '100%'
      }}
      role="presentation"
    >
      <CloseIcon
        onClick={toggleDrawer(false)}
        sx={{
          marginLeft: 'auto',
          cursor: 'pointer'
        }}
      />
      <Box className="d-flex justify-content-between align-items-center">
        <span className="fw-bold fs-3">Filter</span>
        <Box
          className="px-2 py-1"
          onClick={clearFilters}
          role="button"
          sx={{
            color: '#6D3439'
          }}
        >
          Clear All
        </Box>
      </Box>
      <Stack
        gap={'1rem'}
        height={'80%'}
        sx={{ overflowY: 'scroll' }}
        className="custom-scrollbar"
      >
        <Stack>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{
              border: '1px solid #662A2E',
              borderRadius: '0',
              cursor: 'pointer',
              boxShadow: 'none',
              outline: 'none'
            }}
            onChange={(e) => setGender(e.target.value)}
            value={gender}
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
              --Select Gender--
            </option>
            {genderList?.map((item, ind) => (
              <option
                value={item?.value}
                key={ind}
                style={{
                  border: '1px solid #662A2E',
                  borderRadius: '0',
                  cursor: 'pointer !important'
                }}
              >
                {item.label}
              </option>
            ))}
          </select>
        </Stack>
        <Stack gap={1} border={'1px solid #662A2E'} padding={1}>
          <span>Price</span>
          <Stack
            display={'flex'}
            flexDirection={'row'}
            gap={'1rem'}
            flexWrap={'wrap'}
          >
            {prices?.map((item, ind) => (
              <Box
                className="px-2 py-1"
                onClick={() => handleMinMaxPriceChange(item.value)}
                key={ind}
                role="button"
                border={'1px solid #6D3439'}
                sx={{
                  transition: 'all 0.4s ease-in-out',
                  backgroundColor:
                    JSON.stringify(item.value) === JSON.stringify(minmaxVal)
                      ? '#6D3439'
                      : 'transparent',
                  color:
                    JSON.stringify(item.value) === JSON.stringify(minmaxVal)
                      ? '#fff'
                      : '#000',
                  '&:hover': {
                    backgroundColor: '#6D3439',
                    color: '#fff'
                  }
                }}
              >
                {item?.label || '--'}
              </Box>
            ))}
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'100%'}
              gap={'1rem'}
            >
              <Stack border={'1px solid #999999'} width={'100%'} padding={1}>
                <span
                  style={{
                    color: '#666666'
                  }}
                >
                  Min Price
                </span>
                <Stack direction={'row'} width={'100%'} gap={'0.3rem'}>
                  <span>₹</span>
                  <span
                    style={{
                      color: minmaxVal.min === '0' ? '#999999' : '#000000'
                    }}
                  >
                    {minmaxVal?.min ?? '--'}
                  </span>
                </Stack>
              </Stack>
              <Stack border={'1px solid #999999'} width={'100%'} padding={1}>
                <span
                  style={{
                    color: '#666666'
                  }}
                >
                  Max Price
                </span>
                <Stack direction={'row'} width={'100%'} gap={'0.3rem'}>
                  <span>₹</span>
                  <span
                    style={{
                      color: minmaxVal.max === '0' ? '#999999' : '#000000'
                    }}
                  >
                    {minmaxVal?.max ?? '--'}
                  </span>
                </Stack>
              </Stack>
            </Stack>
          </Stack>{' '}
        </Stack>
        <Stack gap={1} border={'1px solid #662A2E'} padding={1}>
          <span>Material</span>
          <Stack flexWrap={'wrap'} display={'flex'} flexDirection={'row'}>
            {materialLists?.map((item, ind) => (
              <FormControlLabel
                key={ind}
                className="text-capitalize"
                control={
                  <Checkbox
                    value={item?.id?.toString()}
                    onChange={handleMaterialChange}
                    checked={material.includes(item?.id?.toString())}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={item?.metal_type}
              />
            ))}
          </Stack>
        </Stack>
        <Stack gap={1} border={'1px solid #662A2E'} padding={1}>
          <span>Purity</span>
          <Stack flexWrap={'wrap'} display={'flex'} flexDirection={'row'}>
            {purityList?.map((item, ind) => (
              <FormControlLabel
                key={ind}
                className="text-capitalize"
                control={
                  <Checkbox
                    value={item?.value?.toString()}
                    onChange={handlePurityChange}
                    checked={purity.includes(item.value)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={item.label}
              />
            ))}
          </Stack>
          <MultipleSelectChip
            collections={collections}
            setSelectedCollections={setSelectedCollections}
            selectedCollections={selectedCollections}
          />
        </Stack>
      </Stack>
      <Button
        sx={{
          backgroundColor: '#6D3439',
          color: '#fff',
          '&.Mui-disabled': {
            backgroundColor: '#ccc',
            color: '#666',
            cursor: 'not-allowed'
          }
        }}
        onClick={handleSubmit}
        disabled={
          !gender &&
          !material.length &&
          !purity.length &&
          !selectedCollections.length &&
          minmaxVal.min === 0 &&
          minmaxVal.max === 0
        }
      >
        Apply Filter
      </Button>
    </Stack>
  );

  return (
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
        {DrawerList}
      </Drawer>
    </Box>
  );
}
