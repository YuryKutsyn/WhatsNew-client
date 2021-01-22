import { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from "context/auth";
import { pathnameForMenuBar } from "util/url";

const MenuBar = () => {
    const { user, logout } = useContext( AuthContext )
    const [ activeItem, setActiveItem ] = useState( pathnameForMenuBar( window.location.pathname ))

    const handleItemClick = (_, { name }) => setActiveItem( name )
    console.log(activeItem)
    const menuBar = user ? (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name={ user.username }
                active={ activeItem === user.username || activeItem === 'home' }
                onClick={ handleItemClick }
                as={ Link }
                to='/'
            />
            <Menu.Item
                name='settings'
                active={ activeItem === 'settings' }
                onClick={ handleItemClick }
                as={ Link }
                to='/settings'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={ logout }
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name='home'
                active={ activeItem === 'home' }
                onClick={ handleItemClick }
                as={ Link }
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={ activeItem === 'login' }
                    onClick={ handleItemClick }
                    as={ Link }
                    to='/login'
                />
                <Menu.Item
                    name='register'
                    active={ activeItem === 'register' }
                    onClick={ handleItemClick }
                    as={ Link }
                    to='/register'
                />
            </Menu.Menu>
        </Menu>
    )

    return menuBar
}

export default MenuBar;