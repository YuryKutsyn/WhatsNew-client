import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.scss';

import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import SinglePost from 'pages/SinglePost'
import MenuBar from "components/MenuBar";
import Settings from "pages/Settings";

import { AuthProvider } from "context/auth";
import AuthRoute from "util/AuthRoute";


const App = () => {
  return (
      <AuthProvider>
          <Router>
              <Container>
                  <MenuBar />
                  <Route exact path='/' component={ Home } />
                  <Route exact path='/settings' component={ Settings } />
                  <AuthRoute exact path='/login' component={ Login } />
                  <AuthRoute exact path='/register' component={ Register } />
                  <Route exact path='/posts/:postId' component={ SinglePost } />
              </Container>
          </Router>
      </AuthProvider>
  );
}

export default App;
