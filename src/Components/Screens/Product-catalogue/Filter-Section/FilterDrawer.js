import * as React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getCollectionDetails } from '../../../../services/FrontApp/index.service';
import MultipleSelectChip from '../../../Common/MultiSelect';
import { prices, purityList } from '../../../../utilities/filterContants';
import { isSameArray } from '../../../../utilities/CustomFunction';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiDropdown from '../../../Common/MultiDropdown';

export default function FilterDrawer({
  filterHandler,
  setOpen,
  filteredPayload
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collections, setCollections] = React.useState([]);
  const [genders, setGenders] = React.useState(
    filteredPayload?.genders?.length === 0 ? [] : filteredPayload?.genders || []
  );
  const [purity, setPurity] = React.useState(
    filteredPayload?.purity?.length === 0 ? [] : filteredPayload?.purity || []
  );
  const [isDisabled, setIsDisabled] = React.useState(false);

  const [minmaxVal, setMinMaxVal] = React.useState(
    filteredPayload?.min_price || filteredPayload?.max_price
      ? {
          min: filteredPayload?.min_price || 0,
          max: filteredPayload?.max_price
        }
      : { min: 0, max: 0 }
  );
  const [selectedCollections, setSelectedCollections] = React.useState(
    filteredPayload?.selectedCollections?.length > 0
      ? filteredPayload?.selectedCollections
      : []
  );

  const handleMinMaxPriceChange = (value) => {
    setMinMaxVal(value);
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
    setIsDisabled(true);
    filterHandler({
      min_price: minmaxVal.min,
      max_price: minmaxVal.max,
      genders,
      purity: purity,
      selectedCollections: selectedCollections,
      sort_by: '',
      page: 1
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

  const navigateToBasePage = () => {
    const url = new URL(
      window.location.origin + location.pathname + location.search
    );
    const currentURL = decodeURI(location.pathname + location.search);
    const searchParams = url.searchParams;

    searchParams.set('page', 1);
    const decodedUrl = decodeURI(
      `${location.pathname}?${searchParams.toString()}`
    );

    navigate(decodedUrl);
    if (decodedUrl === currentURL) {
      filterHandler();
    }
  };
  const clearFilters = () => {
    setIsDisabled(true);
    setGenders([]);
    setMinMaxVal({ min: 0, max: 0 });
    setPurity([]);
    setSelectedCollections([]);
    setOpen(false);
    navigateToBasePage();
  };

  React.useEffect(() => {
    getCollectionData();
  }, []);

  React.useEffect(() => {
    setSelectedCollections(filteredPayload?.selectedCollections);
  }, [filteredPayload?.selectedCollections?.length]);

  React.useEffect(() => {
    setIsDisabled(
      isSameArray(genders, filteredPayload?.genders || []) &&
        isSameArray(purity, filteredPayload?.purity || []) &&
        isSameArray(
          selectedCollections || [],
          filteredPayload?.selectedCollections || []
        ) &&
        minmaxVal.min === (filteredPayload?.min_price || 0) &&
        (minmaxVal.max === (filteredPayload?.max_price || 0) ||
          minmaxVal.max === undefined)
    );
  }, [
    genders?.length,
    purity?.length,
    selectedCollections?.length,
    minmaxVal.min,
    minmaxVal.max
  ]);

  const isInitialState =
    !genders?.length &&
    !purity?.length &&
    !selectedCollections?.length &&
    minmaxVal.min === 0 &&
    minmaxVal.max === 0;
  return (
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
        onClick={() => setOpen(false)}
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
            color: isInitialState ? '#999999' : '#6D3439',
            cursor: isInitialState ? 'no-drop' : 'pointer',
            pointerEvents: isInitialState ? 'none' : 'all',
            ':hover': {
              textDecoration: 'underline'
            }
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
          <MultiDropdown genders={genders} setGenders={setGenders} />
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
                  },
                  borderRadius: '8px',
                  padding: '0.4rem 0.9rem'
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
              {[
                { label: 'Min Price', key: 'min', value: minmaxVal?.min },
                { label: 'Max Price', key: 'max', value: minmaxVal?.max }
              ]?.map(({ label, key, value }) => (
                <Stack
                  key={key}
                  border={'1px solid #999999'}
                  width={'100%'}
                  padding={1}
                >
                  <span style={{ color: '#666666' }}>{label}</span>
                  <Stack direction={'row'} width={'100%'} gap={'0.3rem'}>
                    <span>₹</span>
                    <span
                      style={{
                        color:
                          value === '0' || value === 0 ? '#999999' : '#000000'
                      }}
                    >
                      {value ?? '--'}
                    </span>
                  </Stack>
                </Stack>
              ))}
            </Stack>
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
        </Stack>
          <MultipleSelectChip
            collections={collections}
            setSelectedCollections={setSelectedCollections}
            selectedCollections={selectedCollections}
          />
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
        disabled={isDisabled}
      >
        Apply Filter
      </Button>
    </Stack>
  );
}
