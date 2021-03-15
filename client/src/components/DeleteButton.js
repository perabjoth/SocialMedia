import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Button, Icon, Confirm} from "semantic-ui-react";

import {FETCH_POSTS_QUERY} from '../util/graphql';
import {cloneDeep} from "@apollo/client/utilities";

function DeleteButton({postId, callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            let updatedData = cloneDeep(data);
            updatedData.getPosts = data.getPosts.filter((p) => p.id !== postId);
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data: updatedData});
            if (callback) callback();
        },
        onError(err) {
            return err;
        },
        variables: {postId: postId}
    });

    return (
        <>
            <Button as='div' color='red' floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{margin: 0}}/>
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost}/>
        </>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

export default DeleteButton;