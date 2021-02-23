import React,{useState,useEffect} from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import { useDispatch } from 'react-redux';


//import useStyle from '../';

import { getPosts } from '../../actions/posts';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    const [currId, setCurrId] = useState(null);
  //  const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [currId, dispatch])
 
    return (
        <Grow in>
            <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currId} setCurrentId={setCurrId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;