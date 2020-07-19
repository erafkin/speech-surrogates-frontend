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
import AdminPanel from './components/admin-panel';
import About from './components/about';
import SpeechSurrogates from './components/speech-surrogates';
import LanguagePage from './components/language';
import NewGrantLanguage from './components/new-grant-lang';
import MyBio from './components/my-bio';
import Bios from './components/bios';


const FallBack = () => {
  return <div>URL not found</div>;
};

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
    this.props.getAllUsers();
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
            <Route path={ROUTES.NEW_LANG} component={NewGrantLanguage} />
            <Route path={ROUTES.LANGUAGES} component={LanguagePage} />
            <Route path={ROUTES.SPEECH_SURROGATES} component={SpeechSurrogates} />
            <Route path={ROUTES.ABOUT} component={About} />
            <Route path={ROUTES.ADMIN} component={AdminPanel} />
            <Route path={ROUTES.NEW_BLOG} component={IndivBlog} />
            <Route path={ROUTES.BLOG} component={Blog} />
            <Route path={ROUTES.LOGIN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.MY_BIO} component={MyBio} />
            <Route path={ROUTES.BIOS} component={Bios} />
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
