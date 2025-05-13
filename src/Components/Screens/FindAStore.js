import React, { useState, useEffect } from 'react';
import storeLocaterTitleImage from '../../images/storeLocaterTitleImageCropped.png';
import { Button, Grid } from '@mui/material';
import AllStores from '../AllStores';
import { getStores, searchStores } from '../../services/FrontApp/index.service';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import DirectionsIcon from '@mui/icons-material/Directions';
import PlaceIcon from '@mui/icons-material/Place';
import ContainerWrapper from '../Common/ContainerWrapper';
export default function FindAStore() {
  const [errors, setErrors] = useState([]);
  const center = { lat: 18.5204, lng: 73.8567 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  });

  const [markers, setMarkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [info, setInfo] = useState(null);
  const [searchData, setSearchData] = useState({ search: '' });
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [toggleMap, setToggleMap] = useState(false);
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await getStores();

      setData(result.data.data);
      setInitialData(result.data.data);
      let markerData = result.data.data.map((store, index) => ({
        id: index + 1,
        name: store.store_name,
        address: store.address,
        position: {
          lat: parseFloat(store.latitude),
          lng: parseFloat(store.longitude)
        }
      }));
      setMarkers(markerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAccordionClick = (position) => {
    if (
      selectedLocation === null ||
      position?.element?.store_name !== selectedLocation?.element?.store_name
    ) {
      setToggleMap(true);
      setSelectedLocation(position, selectedLocation);

      setStoreName(position.element.store_name);

      setInfo(position.element);
      if (map) {
        map.panTo(position);
        map.setZoom(20);
      }
    } else {
      setToggleMap((prevToggleMap) => !prevToggleMap);
    }
  };

  const handleChange = ({ target }) => {
    const query = target.value.toLowerCase();
    setSearchData({ [target.name]: query });
    const filteredData = query
      ? initialData.filter((item) =>
          item.store_name?.toLowerCase().includes(query)
        )
      : initialData;
    setData(filteredData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    try {
      const result = await searchStores(searchData);
      setData(result.data.data);
      setInitialData(result.data.data);
      let markerData = result.data.data.map((store, index) => ({
        id: index + 1,
        name: store.store_name,
        address: store.address,
        position: {
          lat: parseFloat(store.latitude),
          lng: parseFloat(store.longitude)
        }
      }));
      setMarkers(markerData);
    } catch (error) {
      setErrors(error.response.data.message);
      setData([]);
    }
  };

  const handleOnLoad = (map) => {
    setMap(map);
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <div className="find-store-main-container">
      {/* Header Section */}
      <div
        className="section-title"
        style={{ backgroundImage: `url(${storeLocaterTitleImage})` }}
      >
        <div className="section-contents">
          <div className="header-title">
            <h4>Store Locator</h4>
          </div>
          <div className="section-info">
            Come and say hello. Find your nearest store and check its opening
            hours and contact details.
          </div>
          <div className="find-store-change-location">
            <input
              type="text"
              placeholder="Enter Pincode or city"
              name="search"
              value={searchData.search}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
            />
            <Button onClick={handleSubmit} className="location-change-button">
              FIND STORES
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <ContainerWrapper>
        <Grid
          container
          gap={'1rem'}
          className="store-main-content"
          width={'100%'}
          sx={{ justifyContent: 'start !important' }}
        >
          <Grid className="all-store-container" item xs={12} md={5.8}>
            <div className="all-store-titles p-3">ALL STORES</div>
            <div className="store-locations-acordion">
              <AllStores
                data={data}
                handleAccordionClick={handleAccordionClick}
              />
            </div>
          </Grid>

          {/* Google Map Section */}
          <Grid
            className="find-store-google-map-container"
            item
            xs={12}
            md={5.8}
          >
            <div style={{ position: 'relative', marginTop: '1rem' }}>
              {/* Google Map */}
              {isLoaded && markers.length >= 0 && !toggleMap ? (
                <GoogleMap
                  onLoad={handleOnLoad}
                  onClick={() => setInfo(null)}
                  mapContainerStyle={{
                    width: '100%',
                    height: '450px',
                    marginTop: '1rem'
                  }}
                  center={selectedLocation || center}
                  zoom={selectedLocation ? 20 : 10}
                >
                  {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={marker.position}
                      animation={window.google.maps.Animation.DROP}
                      // onClick={() => handleActiveMarker(marker)}
                    />
                  ))}
                </GoogleMap>
              ) : null}
              {toggleMap && (
                <div className="w-full  " style={{ height: '450px' }}>
                  <iframe
                    title="Chandu Kaka Saraf Jewels Store Location"
                    width="100%"
                    height="100%"
                    frameBorder="1"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GMAP_API_KEY}&q=Chandu+Kaka+Saraf+Jewels,${storeName}`}
                  ></iframe>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </div>
  );
}
