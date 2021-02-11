import React, {useState, useEffect} from 'react';
import { Container, AppBar, Typography, Grid, Grow } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import memories from './images/memories.png';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form';
import useStyle from './styles';

import {getPosts} from './actions/posts';


const App = () => {
    const [currId, setCurrId] = useState(null);
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    },[currId, dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appbar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                   My Collection
                </Typography>
                {/* <img className={classes.image} src={memories} alt="icon" height="60" /> */}
            </AppBar>
            <Grow in>
                <Container style={{paddingTop : "20px"}}>
                    <Grid container className={classes.mainContainer}  justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId = {setCurrId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId = {currId} setCurrentId = {setCurrId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}


export default App;