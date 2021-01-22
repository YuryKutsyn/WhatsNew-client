import { useContext, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid } from "semantic-ui-react";
import chunk from 'lodash/chunk'

import PostCard from 'components/PostCard'
import PostForm from 'components/PostForm'
import { FETCH_POSTS_QUERY } from "util/graphql";
import { AuthContext } from "context/auth";
import PaginationTabs from 'components/Pagination'

const Home = () => {
    const { user } = useContext( AuthContext )
    const [ pagPage, setPagPage ] = useState(0)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY,{
        onError: (err) => {
            console.log('error: ', err)
        }
    })
    const posts = data && data.getPosts && chunk(data.getPosts, 5)

    return (
        <Grid columns={2}>
                <Grid.Row className='homePage__title'>
                    <h1>Recent Posts</h1>
                </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column
                        mobile={16}
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        >
                        <PostForm />
                    </Grid.Column>
                )}
                { loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    posts && posts[pagPage].map(post => (
                    <Grid.Column
                        mobile={16}
                        largeScreen={8}
                        computer={8}
                        widescreen={8}
                        stretched={true}
                        key={post.id} 
                        style={{ marginTop: 20 }}
                        >
                        <PostCard post={post} />
                    </Grid.Column> ))
                )}
            </Grid.Row>
            <Grid.Row centered>
                { data && <PaginationTabs totalPages={ posts && posts.length } setPagPage={ setPagPage } /> }
            </Grid.Row>
        </Grid>
    );
};

export default Home;