import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import Landing from './Landing';
import Navigation from './Navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Workspaces from './Workspaces';
import Workspace from './Workspace';
import CreateWorkspace from './CreateWorkspace';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          {/* <header className='App-header'> */}
          <Navigation />
          {/* </header> */}
        </div>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/workspaces' element={<PrivateRoute />}>
            <Route path='/workspaces' element={<Workspaces />} />
          </Route>
          <Route path='/workspace/:id' element={<PrivateRoute />}>
            <Route path='/workspace/:id' element={<Workspace />} />
          </Route>
          <Route path='/createworkspace' element={<PrivateRoute />}>
            <Route path='/createworkspace' element={<CreateWorkspace />} />
          </Route>
          <Route path='/users/login' element={<SignIn />} />
          <Route path='/users/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
