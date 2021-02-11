import React from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {deletePost, likePost} from '../../../actions/posts';

import useStyle from './styles';
const Post = ({ post, setCurrentId  }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    return (
        <Card className={classes.card}>
          {/* {console.log('post is post.js -- ', post)}   */}
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6" >{post.creator}</Typography>
                <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small"onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default"></MoreHorizIcon>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} varaint="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography varaint="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { dispatch(likePost(post._id)) }}>
                    <ThumbUpAltIcon fontSize="small" />
                        Like &nbsp;
                        {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)) }}>
                    <DeleteIcon fontSize="small" />
                        Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;