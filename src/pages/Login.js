import { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from "context/auth";
import { useForm } from 'util/hooks'
import { LOGIN_USER } from 'util/graphql'

const Login = props => {
    const [ errors, setErrors ] = useState({})
    const context = useContext( AuthContext )

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [ loginUser, { loading } ] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData }}){
            context.login( userData )
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser()
    }


    return (
        <div className='form__container'>
            <Form onSubmit={ onSubmit } noValidate className={ loading ? 'loading' : '' }>
                <h1>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='Username..'
                    name='username'
                    type='text'
                    value={ values.username }
                    error={!!errors.username}
                    onChange={ onChange }
                />
                <Form.Input
                    label='Password'
                    placeholder='Password..'
                    name='password'
                    type='password'
                    value={ values.password }
                    error={!!errors.password}
                    onChange={ onChange }
                />
                <Button
                    type='submit'
                    primary
                >
                    Login
                </Button>
            </Form>
            { Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className='list'>
                        {Object.values(errors).map(err => (
                            <li key={err}>
                                { err }
                            </li>
                        ))}
                    </ul>
                </div>
            ) }
        </div>
    );
};

export default Login;