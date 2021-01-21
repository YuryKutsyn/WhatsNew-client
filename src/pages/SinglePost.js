import { useContext, useState, useRef } from 'react'
import gql from "graphql-tag/lib/graphql-tag.umd";
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Grid, Card, Button, Form, Icon, Label, Image, Transition } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "context/auth";
import LikeButton from "components/LikeButton";
import DeleteButton from "components/DeleteButton";
import {MyPopup} from "util/MyPopup";


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
                            src='https://petadvisor.in.ua/blog/wp-content/uploads/2019/09/mops-1.jpg'
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

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: String!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id body createdAt username
            }
            commentCount
        }
    }
`

const GET_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id username body createdAt
            likes{
                username
            }
            likeCount
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`

export default SinglePost;