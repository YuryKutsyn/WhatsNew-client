import { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Transition } from "semantic-ui-react";

import PostCard from 'components/PostCard'
import PostForm from 'components/PostForm'
import { FETCH_POSTS_QUERY } from "util/graphql";

import { AuthContext } from "context/auth";

const Home = () => {
    const { user } = useContext( AuthContext )
    const { loading, data } = useQuery(FETCH_POSTS_QUERY,{
        onError: (err) => {
            console.log('error: ', err)
        }
    })
    const posts = data && data.getPosts

    return (
        <Grid columns={3}>
                <Grid.Row className='homePage__title'>
                    <h1>Recent Posts</h1>
                </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                { loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                <Transition.Group
                    animation='slide up'
                    duration={500}
                >
                    { posts &&
                    posts.map(post => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }} >
                        <PostCard post={post} />
                    </Grid.Column> ))}
                </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Home;