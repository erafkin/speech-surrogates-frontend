import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOCAL_STORAGE_TOKEN_KEY, ROUTES, LOCAL_STORAGE_USERNAME_KEY } from './constants';
import { getUser, getAllUsers } from './state/actions';

import Navbar from './components/navbar';
import Home from './components/home';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Blog from './components/blog';
import IndivBlog from './components/new-blog';


const FallBack = () => {
  return <div>URL not found</div>;
};

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);

    // load data if token exists
    if (token && token.length > 0 && username && username.length > 0) {
      this.props.getUser(token, username);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path={ROUTES.NEW_BLOG} component={IndivBlog} />
            <Route path={ROUTES.BLOG} component={Blog} />
            <Route path={ROUTES.LOGIN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.HOME} component={Home} /> {/* home always has to be at the bottom of this stack */}
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token, username) => {
      dispatch(getUser(token, username));
    },
    getAllUsers: (token, username) => {
      dispatch(getAllUsers(token, username));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
