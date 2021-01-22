import { useEffect, useState } from 'react'
import {Button, Icon, Label} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import {MyPopup} from "util/MyPopup";
import { LIKE_POST_MUTATION } from 'util/graphql'


const LikeButton = ({ user, post: { id, likes, likeCount }}) => {
    const [ liked, setLiked ] = useState(false)
    const [ likePost ] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
        onError: (err) => {
            console.log('Error: ', err.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        let compIsMount = true
        if (user && likes.find(like => like.username === user.username)) {
            compIsMount && setLiked(true)
        } else {
            compIsMount && setLiked(false)
        }

        return () => compIsMount = false
    }, [ user, likes ])

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={ Link } to='/login' color='teal' basic>
            <Icon name='heart' />
        </Button>
    )

    return (
            <Button as='div'
                    labelPosition='right'
                    onClick={ likePost }
            >
                <MyPopup
                    content={liked ? 'Unlike' : 'Like'}
                >
                    { likeButton }
                </MyPopup>
                <Label basic color='teal' pointing='left'>
                    { likeCount }
                </Label>
            </Button>
    );
};

export default LikeButton;