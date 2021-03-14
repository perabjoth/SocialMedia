import React, {useEffect, useState} from 'react';
import {Button, Icon, Label} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function LikeButton({post: {id, likes, likeCount}, user}) {
    const [liked, setLiked] = useState(false);

    useEffect(()=>{
       if(user && likes.find(like => like.username === user.username)){
           setLiked(true);
       } else {
           setLiked(false);
       }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables: {postId: id},
        onError(err){
            return err;
        }
    });

    const likeButton = user ? (
        liked ? (
            <Button color='pink' >
                <Icon name='heart' />
            </Button>
        ) : (
            <Button basic color='pink' >
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" basic color='pink' >
            <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='pink' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    );
}

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
    likePost(postId: $postId){
        id 
        likes{
            id username
        }
        likeCount
    }
}
`

export default LikeButton;