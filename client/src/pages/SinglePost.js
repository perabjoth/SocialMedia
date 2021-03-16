import React, {useContext, useRef, useState} from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Button, Card, Form, Grid, Icon, Image, Label} from "semantic-ui-react";
import moment from 'moment';
import {isMobile} from 'react-device-detect';

import {AuthContext} from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from "../components/DeleteButton";
import MyPopup from '../util/MyPopup';

function SinglePost(props) {
    const postId = props.match.params.postId;
    const {user} = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');

    const {data: {getPost} = {}} = useQuery(FETCH_POST_QUERY, {variables: {postId}});

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {postId: postId, body: comment}
    });

    function deletePostCallback() {
        props.history.push("/");
    }

    const image = (<Image
        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        size='small'
        float="right"
    />)
    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading Post...</p>
    } else {
        const {id, body, createdAt, username, likes, likeCount, comments, commentCount} = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    {isMobile ? null : (<Grid.Column width="2">
                        {image}
                    </Grid.Column>)}
                    <Grid.Column width={isMobile ? 16 : 10}>
                        <Card fluid>
                            <Card.Content>
                                {isMobile ? image : null}
                                <Card.Header style={{marginTop: 20}}>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likeCount, likes}}/>
                                <MyPopup content="Comment on post">
                                    <Button labelPosition='right' as="div">
                                        <Button basic color='blue'>
                                            <Icon name='comments'/>
                                        </Button>
                                        <Label basic color='blue' pointing='left'>
                                            {commentCount}
                                        </Label>
                                    </Button>
                                </MyPopup>
                                {user && user.username === username &&
                                (<DeleteButton postId={id} callback={deletePostCallback}/>)
                                }
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Submit a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="comment..."
                                                name="comment"
                                                value={comment}
                                                onChange={event => {
                                                    setComment(event.target.value);
                                                }}
                                                ref={commentInputRef}
                                            />
                                            <Button
                                                type="submit"
                                                className="ui button teal"
                                                disabled={comment.trim() === ''}
                                                onClick={submitComment}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username &&
                                    (<DeleteButton postId={id} commentId={comment.id}/>)
                                    }
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likes{
                username
            }
            likeCount
            comments{
                id createdAt username body
            }
            commentCount
        }
    }
`;

const SUBMIT_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id createdAt username body
            }
            commentCount
        }
    }
`
export default SinglePost;