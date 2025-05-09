// import React, { useState, useEffect } from "react";
// import storeLocaterTitleImage from "../../images/storeLocaterTitleImageCropped.png";
// import { Button, Grid } from "@mui/material";
// import AllStores from "../AllStores";
// import { getStores, searchStores } from "../../services/FrontApp/index.service";
// import {
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   useLoadScript,
// } from "@react-google-maps/api";

// export default function FindAStore() {
//   const [errors, setErrors] = useState([]);
//   const center = {
//     lat: 18.5204,
//     lng: 73.8567,
//   };
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_MAP_KEY, // API key
//   });
//   const [markers, setMarkers] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [map, setMap] = useState(null);

//   useEffect(() => {}, [isLoaded]);
//   const [searchData, setSearchData] = useState({
//     search: "",
//   });

//   const [data, setData] = useState([]);
//   const [initialData, setInitialData] = useState([]);

//   const getData = async () => {
//     try {
//       const result = await getStores();
//       setData(result.data.data);
//       setInitialData(result.data.data)
//       let markerData = [];
//       for (let i = 0; i < result.data.data.length; i++) {
//         markerData[i] = {
//           id: i + 1,
//           address: result.data.data[i].address,
//           position: {
//             lat: parseFloat(result.data.data[i].latitude),
//             lng: parseFloat(result.data.data[i].longitude),
//           },
//         };
//       }
//       setMarkers(markerData);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
//   const handleAccordionClick = (position) => {
//     setSelectedLocation(position);
//     if (map) {
//       map.panTo(position);
//       map.setZoom(20);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleChange = ({ target }) => {
//     const query = target.value.toLowerCase();
//     setSearchData({ [target.name]: query });
//     const filteredData = query
//       ? initialData.filter(item =>
//           item.store_name?.toLowerCase().includes(query)
//         )
//       : initialData;

//     setData(filteredData);
//     // setInitialData(data)
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrors([]);
//     // setSuccesMsg('')
//     try {
//       const result = await searchStores(searchData);
//       setData(result.data.data);
//       setInitialData(result.data.data)
//       let markerData = [];
//       for (let i = 0; i < result.data.data.length; i++) {
//         markerData[i] = {
//           id: i + 1,
//           address: result.data.data[i].address,
//           position: {
//             lat: parseFloat(result.data.data[i].latitude),
//             lng: parseFloat(result.data.data[i].longitude),
//           },
//         };
//       }
//       setMarkers(markerData);
//     } catch (error) {
//       setErrors(error.response.data.message);
//       setData([]);
//     }
//   };

//   const [activeMarker, setActiveMarker] = useState(null);

//   const handleActiveMarker = (marker) => {
//     if (marker === activeMarker) {
//       return;
//     }
//     setActiveMarker(marker);
//   };

//   const handleOnLoad = (map) => {
//     setMap(map);
//     const bounds = new window.google.maps.LatLngBounds();
//     markers.forEach(({ position }) => bounds.extend(position));
//     map.fitBounds(bounds);
//   };

//   return (
//     <div className="find-store-main-container">
//       <div
//         className="section-title"
//         style={{ backgroundImage: `url(${storeLocaterTitleImage})` }}
//       >
//         <div className="section-contents">
//           <div className="header-title">
//             <h4>Store Locator</h4>
//           </div>
//           <div className="section-info">
//             Come and say hello. Find your nearest store and check its opening
//             hours and contact details.
//           </div>
//           <div className="find-store-change-location">
//             <input
//               type="text"
//               placeholder="Enter Pincode or city"
//               sx={{ border: "none" }}
//               name="search"
//               value={searchData.search}
//               onChange={handleChange}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSubmit(e);
//                 }
//               }}
//             />
//             <Button onClick={handleSubmit} className="location-change-button">
//               FIND STORES
//             </Button>
//           </div>
//         </div>
//       </div>

//       <Grid container spacing={3} className="store-main-content">
//         <Grid className="all-store-container" item xs={12} md={5}>
//           <div className="all-store-titles p-3">ALL STORES</div>
//           <div className="store-locations-acordion">
//             <AllStores
//               data={data}
//               handleAccordionClick={handleAccordionClick}
//             />
//           </div>
//         </Grid>
//         <Grid
//           className="find-store-google-map-container p-3"
//           item
//           xs={12}
//           md={5}
//         >
//           {isLoaded && markers.length >= 0 ? (
//             <GoogleMap
//               onLoad={handleOnLoad}
//               onClick={() => setActiveMarker(null)}
//               mapContainerStyle={{
//                 width: "100%",
//                 minHeight: "500px",
//                 height: "100%",
//               }}
//               //   center={center}
//               //   zoom={10}
//               center={selectedLocation || center}
//               zoom={selectedLocation ? 20 : 10}
//             >
//               {markers.map(({ id, address, position }) => (
//                 <Marker
//                   key={id}
//                   position={position}
//                   onClick={() => handleActiveMarker(id)}
//                 >
//                   {activeMarker === id ? (
//                     <InfoWindow onCloseClick={() => setActiveMarker(null)}>
//                       <div>
//                         <a
//                           href={`https://maps.google.com/?q=${position.lat},${position.lng}`}
//                           target="_blank"
//                         >
//                          <div className="store-address">{address}</div>
//                         </a>
//                       </div>
//                     </InfoWindow>
//                   ) : null}
//                 </Marker>
//               ))}
//             </GoogleMap>
//           ) : null}
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

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
    setSelectedLocation(position);
    console.log('position', position.element);
    setInfo(position.element);
    if (map) {
      map.panTo(position);
      map.setZoom(20);
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

  const handleActiveMarker = (marker) => {
    if (info && info.id === marker.id) {
      setInfo(null);
      return;
    }

    setInfo(marker);
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
          sx={{justifyContent:'start !important'}}
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
            className="find-store-google-map-container p-3"
            item
            xs={12}
            md={5.8}
          >
            <div style={{ position: 'relative'}}>
              {/* Directions */}
              {info && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    zIndex: 1,
                    width: '260px',
                    transition: 'opacity 0.3s ease-in-out',
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 10px 0',
                      fontSize: '18px',
                      fontWeight: '700',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}
                  >
                    <PlaceIcon style={{ fontSize: '20px', color: 'red' }} />{' '}
                    Chandukaka Saraf Jewels
                  </h3>
                  <h6
                    style={{
                      margin: '0 0 5px 0',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}
                  >
                    {info.name || info.store_name}
                  </h6>

                  {/* Address */}
                  <p
                    style={{
                      margin: '10px 0 10px 0',
                      fontSize: '14px',
                      color: '#555'
                    }}
                  >
                    {info.address}
                  </p>

                  {/* 🛣️ Stylish Get Directions Button */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${info.latitude},${info.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      padding: '10px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#0056b3')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = '#007bff')
                    }
                  >
                    <DirectionsIcon style={{ fontSize: '18px' }} />
                    Get Directions
                  </a>

                  {/* Close Button */}
                </div>
              )}
              {/* Google Map */}
              {isLoaded && markers.length >= 0 ? (
                <GoogleMap
                  onLoad={handleOnLoad}
                  onClick={() => setInfo(null)}
                  mapContainerStyle={{
                    width: '100%',
                    minHeight: '83vh',
                    height: '100%'
                  }}
                  center={selectedLocation || center}
                  zoom={selectedLocation ? 20 : 10}
                >
                  {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={marker.position}
                      // onClick={() => handleActiveMarker(marker)}
                    />
                  ))}
                </GoogleMap>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </div>
  );
}
