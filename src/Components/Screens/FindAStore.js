import React, { useState, useEffect } from 'react'
import storeLocaterTitleImage from "../../images/storeLocaterTitleImageCropped.png";
import { Button, Grid } from '@mui/material';
import fillWhiteLeftIcon from '../../images/icons/fillWhiteLeftIcon.svg';
import fillWhiteRightIcon from '../../images/icons/fillWhiteRightIcon.svg';
import AllStores from '../AllStores';
import { getStores, searchStores } from '../../services/FrontApp/index.service';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";

export default function FindAStore() {
    const [errors, setErrors] = useState([])
    const center = {
        lat: 18.5204,
        lng: 73.8567
      };
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY // API key
      });
    const [markers, setMarkers] = useState([])

    useEffect(() => {
    }, [isLoaded])
    const [searchData, setSearchData] = useState({
        search: ''
    })

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const result = await getStores();
            setData(result.data.data)
            let markerData = []
            for (let i = 0; i < result.data.data.length; i++) {
                markerData[i] = {
                    id: i + 1,
                    name: result.data.data[i].store_name,
                    position: { lat: parseFloat(result.data.data[i].latitude), lng: parseFloat(result.data.data[i].longitude)}
                  };
                
            }
            setMarkers(markerData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleChange = ({ target }) => {
        searchData[target.name] = target.value
        const temp = Object.assign({}, searchData)
        setSearchData(temp)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors([])
        // setSuccesMsg('')
        try {
            const result = await searchStores(searchData);
            setData(result.data.data)
            let markerData = []
            for (let i = 0; i < result.data.data.length; i++) {
                markerData[i] = {
                    id: i + 1,
                    address: result.data.data[i].address,
                    position: { lat: parseFloat(result.data.data[i].latitude), lng: parseFloat(result.data.data[i].longitude)}
                  };
                
            }
            setMarkers(markerData)
        } catch (error) {
            setErrors(error.response.data.message)
            setData([])
        }
    };

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <div className='find-store-main-container'>
            <div className='section-title' style={{ backgroundImage: `url(${storeLocaterTitleImage})` }}>
                <div className="section-contents">
                    <div className="header-title">
                        <img src={fillWhiteLeftIcon} alt="React Logo" />
                        <h4>Store Locator</h4>
                        <img src={fillWhiteRightIcon} alt="React Logo" />
                    </div>
                    <div className="section-info">
                        Come and say hello. Find your nearest store and check its opening hours and contact details.
                    </div>
                    <div className="find-store-change-location">
                        <input type="text" placeholder='Enter Pincode or city' sx={{ border: 'none' }} name='search' value={searchData.search} onChange={handleChange} />
                        <Button onClick={handleSubmit} className='location-change-button'>FIND STORES</Button>
                    </div>
                </div>


            </div>

            <Grid container spacing={3} className='store-main-content'>
                <Grid className='all-store-container' item xs={12} md={5}>
                    <div className='all-store-titles p-3'>
                        ALL STORES
                    </div>
                    <div className='store-locations-acordion'>
                        <AllStores data={data} />
                    </div>
                </Grid>
                <Grid className='find-store-google-map-container p-3' item xs={12} md={5}>
                 {isLoaded && markers.length >= 0 ? (<GoogleMap
                        onLoad={handleOnLoad}
                        onClick={() => setActiveMarker(null)}
                        mapContainerStyle={{ width: "100%", height: "500px" }}
                        center={center}
                        zoom={10}
                    >
                        {markers.map(({ id, address, position }) => (
                            <Marker
                                key={id}
                                position={position}
                                onClick={() => handleActiveMarker(id)}
                            >
                                {activeMarker === id ? (
                                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                        <div>{address}</div>
                                    </InfoWindow>
                                ) : null}
                            </Marker>
                        ))}
                    </GoogleMap>) : null }
                </Grid>
            </Grid>
        </div>
    )
}
