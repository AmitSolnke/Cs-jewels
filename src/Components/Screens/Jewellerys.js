import React, { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Chip, Divider, Grid, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ClearFilterIcon from "../../images/icons/ClearFilterIcon.svg";
import jewellerysImage from "../../images/jewellerysImage.png"
import ProductCard from '../ProductCard';
import CarouselJewellery from './CarouselJewellery';
import { getProducts } from '../../services/FrontApp/index.service';
import { Paginator } from '../Common/Paginator';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

const typeValues = [
    {
        "id": 1,
        name: "Diwali Offers"
    },
    {
        "id": 2,
        name: "Diamond Offers"
    },
    {
        "id": 3,
        name: "Everday Offers"
    },
    {
        "id": 3,
        name: "Gold Offers"
    },
]

const allProduct = [
    {
        productImage: jewellerysImage,
        Description:"10% of on Siliver rings"
    },
    {
        productImage: jewellerysImage,
        Description:"10% of on Siliver rings"
        
    },
    {
        productImage: jewellerysImage,
        Description:"10% of on Siliver rings"
    },
    {
        productImage: jewellerysImage,
        Description:"10% of on Siliver rings"
        
    },
    {
        productImage: jewellerysImage,
        Description:"10% of on Siliver rings"
    },
    {
        productImage: jewellerysImage,
         Description:"10% of on Siliver rings"
        
    },
    {
        productImage: jewellerysImage,
         Description:"10% of on Siliver rings"
    },
    {
        productImage: jewellerysImage,
         Description:"10% of on Siliver rings"
        
    },
    {
        productImage: jewellerysImage,
         Description:"10% of on Siliver rings"
    },
    {
        productImage: jewellerysImage,
         Description:"10% of on Siliver rings"
       
    },
    {
        productImage: jewellerysImage,
         Description:"10% of on Siliver rings"
    },
    {
        productImage: jewellerysImage,
         Description:"10% of on Siliver rings"
       
    },


  
]
export default function Jewellerys() {
    const [typeNameSelected, setTypeName] = React.useState([
        {
            "id": 1,
            name: "DIWALI OFFERS"
        },
        {
            "id": 2,
            name: "SILVER"
        },
    ]);

    const [filterData, setFilterData] = useState({
        limit: 10,
        page: 1,
        sort_by: ''
    })
    const [refrashCount, setRefrashCount] = useState(0)

    const [products, setProducts] = useState([])

    const getData = async () => {
        console.log(filterData)
        const result = await getProducts(filterData)
        setProducts(result.data.data.data)
    }

    useEffect(() => {
        getData()
    }, [refrashCount])

    const handleChange = ({ target }) => {
        filterData[target.name] = target.value
        const temp = Object.assign({}, filterData)
        setFilterData(temp)
        setRefrashCount(refrashCount + 1)
    }

    const handleChangePage = (event, newPage) => {
        filterData['page'] = newPage
        const temp = Object.assign({}, filterData)
        setFilterData(temp)
        setRefrashCount(refrashCount + 1)
    };

    const handleDeleteFilterData = (event) => {
        var tempArray = typeNameSelected;
        tempArray = removeByAttr(tempArray, 'id', event)
        setTypeName(tempArray)
        console.info(tempArray);
    };
    return (
        <div className='about-us'>
            <div className='col-12'>
            <div>
            <CarouselJewellery />
          </div>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Select
                            defaultValue={1}
                            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            displayEmpty
                            value={typeNameSelected}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => "OFFER TYPE"}
                        >
                            {typeValues.map(variant => (
                                <MenuItem key={variant.id} value={variant}>
                                    <Checkbox
                                        checked={
                                            typeNameSelected.findIndex(item => item.id === variant.id) >= 0
                                        }
                                    />
                                    <ListItemText primary={variant.name} />
                                </MenuItem>
                            ))}
                        </Select>
                      
                   
                    </Grid>
                    <Grid className='product-page-sort-by-container' item xs={1} md={6}>
                        <Select
                            defaultValue=''
                            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                            value={filterData.sort_by}
                            name='sort_by'
                            onChange={handleChange}
                        >
                            <MenuItem value=''>SORT BY</MenuItem>
                            <MenuItem value='low_to_high'>Price - low to high</MenuItem>
                            <MenuItem value='high_to_low'>Price - high to low</MenuItem>
                            <MenuItem value='is_popular'>Popularity</MenuItem>
                            <MenuItem value='newly_added'>Newly added</MenuItem>
                            <MenuItem value='bestseller'>Bestsellers</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={1} md={12}>
                        <Divider className='product-page-divider' variant="middle" />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={1} md={10}>
                        {typeNameSelected.map(element =>
                        (<Chip
                            className='product-page-chip'
                            key={element.id}
                            onDelete={() => handleDeleteFilterData(element.id)}
                            label={element.name}
                            deleteIcon={<img src={ClearFilterIcon} />}
                        />)
                        )}
                        <Button className='product-page-clear-all-button' >CLEAR ALL</Button>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>

                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} className="product-grid-container">
                    <Grid className="product-list-grid-section" item xs={12} md={10}>
                        {products.map(product => (
                            <ProductCard
                                productImage={product.image_path}
                                description={product.description}
                                key={product.id}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Box>
            <Paginator currentPage={filterData.page} itemsPerPage={filterData.limit} productsLength={products.length} handleChangePage={handleChangePage} />
        </div>
    )
}
