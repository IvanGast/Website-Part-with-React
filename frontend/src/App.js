import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';

import UserNavBar from './components/nav-bars/UserNavBar';
import FunctionsNavBar from './components/nav-bars/FunctionsNavBar';
import QuestionList from './components/questions/QuestionList';
import ErrorSnackbar from './components/components/ErrorSnackbar';
import SignInForm from './components/sign-in/SignInForm';
import RestorePasswordForm from './components/sign-in/RestorePasswordForm';
import SignUpForm from './components/sign-up/SignUpForm';
import Home from './components/home/Home';

function App() {
  const user = useSelector((store) => store.user.user);
  return (
    <BrowserRouter>
      <CssBaseline />
      <UserNavBar />
      {user && <FunctionsNavBar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/questions/:roomId" component={QuestionList} />
        <Route exact path="/sign-in" component={SignInForm} />
        <Route exact path="/restore-password" component={RestorePasswordForm} />
        <Route exact path="/sign-up" component={SignUpForm} />
      </Switch>
      <ErrorSnackbar />
    </BrowserRouter>
  );
}

export default App;
