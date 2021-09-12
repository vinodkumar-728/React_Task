import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchField from './SearchField';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import InfiniteScroll from "react-infinite-scroll-component";
import { getRequest } from "./Axios";
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));


const ImageDisplay = () => {
    const [searchText, setSearchText] = useState();
    const [itemData, setItemData] = useState({ pageCount: 1, itemList: [] });
    const classes = useStyles();

    useEffect(() => {
        data();
    }, [])

    const data = async () => {
        let uri = '&image_type=photo&page=' + itemData?.pageCount + '&per_page=50';
        if (searchText && searchText != "") {
            uri = uri + '&q=' + searchText;
        }
        let response = await getRequest(uri);
        setItemData({ ...itemData, ...response?.data, pageCount: (itemData.pageCount + 1), itemList: [...itemData?.itemList, ...response?.data?.hits] });
    }

    const loadMore = () => {
        data();
    }

    const handleChange = (event) => {
        setSearchText(event.target.value);
        console.log('data', event.target.value);
    };

    const handleSearch = () => {
        setItemData({ ...itemData, pageCount: 1, itemList: [] });
        data();
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Typography component="h3">
                    Images List Based on Pixabay API
                </Typography>

            </Grid>
            <Grid item xs={12} >
                <SearchField handleChange={handleChange} handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={12}  >
                <InfiniteScroll
                    dataLength={itemData?.itemList?.length}
                    next={loadMore}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    <ImageList rowHeight={160} className={classes.imageList} style={{ height: "100%" }} cols={4} >
                        {itemData?.itemList.map((item, index) => (
                            <ImageListItem key={index} >
                                <img src={item?.webformatURL} width={item?.webformatWidth} height={item?.webformatHeight} alt={item?.type} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </InfiniteScroll>

            </Grid>
        </Grid>
    );
}

export default ImageDisplay;