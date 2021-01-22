import { useContext, useState, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Grid, Card, Button, Form, Icon, Label, Image, Transition } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "context/auth";
import LikeButton from "components/LikeButton";
import DeleteButton from "components/DeleteButton";
import { MyPopup } from "util/MyPopup";
import { GET_POST_QUERY, SUBMIT_COMMENT_MUTATION } from 'util/graphql'


const SinglePost = (props) => {
    const postId = props.match.params.postId
    const { user } = useContext( AuthContext )
    const commentInputRef = useRef(null)

    const [ comment, setComment ] = useState('')

    const { data } = useQuery(GET_POST_QUERY, {
        variables: { postId }
    })

    const [ submitComment ] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('')
            commentInputRef.current.blur()
        },
        variables: {
            postId,
            body: comment
        }
    })

    const deletePostCallback = () => {
        props.history.push('/')
    }

    let postMarkup
    if( !data?.getPost ) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } =
            data?.getPost

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column 
                    width={3}
                    mobile={4}
                    style={{ marginBottom: 12 }}
                    >
                        <Image
                            src='https://www.clipartkey.com/mpngs/m/201-2014169_poodle-puppy-face-pug-emoji-dog-emoji-pug.png'
                            float='right'
                        />
                    </Grid.Column>
                    <Grid.Column 
                    width={13}
                    largeScreen={12}
                    mobile={16}
                    >
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{ username }</Card.Header>
                                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                                <Card.Description>{ body }</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <MyPopup
                                    content='Comment on post'
                                >
                                    <Button
                                        as='div'
                                        labelPosition='right'
                                    >
                                        <Button
                                            basic
                                            color='blue'
                                        >
                                            <Icon
                                                name='comments'
                                            />
                                        </Button>
                                        <Label
                                            basic
                                            color='blue'
                                            pointing='left'
                                        >
                                            { commentCount }
                                        </Label>
                                    </Button>
                                </MyPopup>
                                { user && user.username === username && (
                                    <DeleteButton postId={ postId } callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        { user &&
                        <Card fluid>
                            <Card.Content>
                                <p>Post a Comment</p>
                                <Form>
                                    <div className='ui action input fluid'>
                                        <input
                                            type="text"
                                            placeholder='Comment...'
                                            name='comment'
                                            value={comment}
                                            onChange={e=> setComment(e.target.value)}
                                            ref={ commentInputRef }
                                        />
                                        <button
                                            type='submit'
                                            className='ui button teal'
                                            disabled={ comment.trim() === '' }
                                            onClick={ submitComment }
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>
                        }
                        <Transition.Group
                            animation='slide up'
                            duration={500}
                        >
                        { comments && comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    { user && user.username === username &&
                                        <DeleteButton postId={ id } commentId={ comment.id } />
                                    }
                                    <Card.Header>{ comment.username }</Card.Header>
                                    <Card.Meta>{ moment(comment.createdAt).fromNow() }</Card.Meta>
                                    <Card.Description>{ comment.body }</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                        </Transition.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

    }

    return postMarkup
};

export default SinglePost;