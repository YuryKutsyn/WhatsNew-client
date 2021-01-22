import { useState } from 'react'
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks'


import { FETCH_POSTS_QUERY } from "util/graphql";
import { MyPopup } from "util/MyPopup";
import { DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from 'util/graphql'


const DeleteButton = ({ postId, commentId, callback }) => {

    const [ confirmOpen, setConfirmOpen ] = useState(false)
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [ deleteHandler ] = useMutation(mutation, {
        update(proxy, result){
            setConfirmOpen(false)
            if ( !commentId ) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
                const refreshPostsData = data.getPosts.filter(post => post.id !== postId)
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: refreshPostsData },
                });
            }
            callback && callback()
        },
        variables: { postId, commentId },
        onError: (err) => {
            console.log('ERROR: ', err.graphQLErrors[0].message)
        }
    })

    return (
        <>
        <MyPopup
            content={ commentId ? 'Delete comment' : 'Delete post' }>
            <Button
                as='div'
                color='red'
                floated='right'
                onClick={()=> setConfirmOpen(true)}
            >
                <Icon
                    name='trash'
                    style={{ margin: 0 }}
                />
            </Button>
        </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={()=> setConfirmOpen(false)}
                onConfirm={ deleteHandler }
            />
        </>
    );
};

export default DeleteButton;