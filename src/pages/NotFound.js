import { Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <Grid 
        textAlign='center'
        >
            <Grid.Row>
                <Image
                size='large'
                src='https://static.wamiz.com/images/articles/facebook/article/raisonnement6-bande-fb-5accde5e85fc4.jpg'
                />  
            </Grid.Row>
            <h1>Page not found...</h1>
            <Grid.Row>
                <Button 
                as={ Link } 
                to='/' 
                color='teal' 
                
                content='Back to posts page'
                />
            </Grid.Row>
        </Grid>
    )
}

export default NotFound;
