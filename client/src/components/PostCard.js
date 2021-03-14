import React, {useContext} from 'react';
import {Button, Card, Icon, Image, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import {AuthContext} from '../context/auth';
import LikeButton from './LikeButton';

function PostCard({
                      post: {body, createdAt, username, id, likeCount, commentCount, likes}
                  }) {

    const {user} = useContext(AuthContext);

    function commentOnPost(){

    }

    function deletePost(){

    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount}}/>
                <Button labelPosition='right' as={Link} to={`/posts/${id}`} onClick={commentOnPost}>
                    <Button basic color='blue' >
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username &&
                    (<Button  as='div' color='red' onClick={deletePost} floated="right">
                        <Icon name='trash' style={{margin: 0}} />
                    </Button>)
                }
            </Card.Content>
        </Card>
    )
};

export default PostCard;