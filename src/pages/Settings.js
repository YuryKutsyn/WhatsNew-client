import { useState, useContext } from 'react'
import { Button, Divider, Form, Grid } from 'semantic-ui-react'
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from "context/auth";
import { useForm } from 'util/hooks'

const Settings = props => {
    const { user } = useContext(AuthContext)
    
    return (
        <Grid columns={2}>
        <Grid.Row className='homePage__title'>
            <h1>Settings</h1>
        </Grid.Row>
        </Grid>
    )
};


export default Settings;