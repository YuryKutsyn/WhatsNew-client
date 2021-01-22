import { useContext, useState } from 'react'

import { Card, Icon, Label, Image, Button, Loader } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from "react-router-dom";

import { AuthContext } from "context/auth";
import LikeButton from 'components/LikeButton'
import DeleteButton from 'components/DeleteButton'
import { MyPopup } from "util/MyPopup";

const PostCard = ({
post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) => {
    const { user } = useContext( AuthContext )
    const [ loading, setIsLoading ] = useState(false)

    if ( loading ) return ( <Loader active inline='centered' /> )

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://www.clipartkey.com/mpngs/m/201-2014169_poodle-puppy-face-pug-emoji-dog-emoji-pug.png'
                />
                <Card.Header>{ username }</Card.Header>
                <Card.Meta as={ Link } to={`/posts/${ id }`}>{ moment(createdAt).fromNow(true) }</Card.Meta>
                <Card.Description>
                    { body }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton
                    user={ user }
                    post={{ id, likes, likeCount }}
                />
                <MyPopup
                    content='Comment on post'
                >
                    <Button as={ Link }
                            to={`/posts/${id}`}
                            labelPosition='right'
                    >
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            { commentCount }
                        </Label>
                    </Button>
                </MyPopup>
                { user && user.username === username && <DeleteButton postId={id} setIsLoading={setIsLoading} />}
            </Card.Content>
        </Card>
    );
};

export default PostCard;