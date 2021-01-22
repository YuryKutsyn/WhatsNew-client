import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from 'util/hooks'
import { FETCH_POSTS_QUERY } from "util/graphql";
import { CREATE_POST_MUTATION } from 'util/graphql'

const PostForm = (props) => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })

    const [ createPost, { error, loading } ] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [result.data.createPost, ...data.getPosts] },
            });
            values.body = '';
        },
        onError(err) {
            console.log('Error: ', err.graphQLErrors[0].message)
        },
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <>
        <Form onSubmit={ onSubmit } className={ loading ? 'loading' : '' }>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder='Hi world'
                    name='body'
                    onChange={ onChange }
                    value={ values.body }
                    error={!!error}
                />
                <Button type='submit' color='teal'>
                    Submit
                </Button>
            </Form.Field>
        </Form>
            {error && (
                <div className='ui error message' style={{marginBottom: 20}}>
                    <ul className="list">
                        <li>{ error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default PostForm;