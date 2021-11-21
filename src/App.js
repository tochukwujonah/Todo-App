import React from 'react';
import './App.css';
import Welcome from './screens/welcome';
import Home from './screens/home';
import Error from './screens/error';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { auth } from './screens/constants';



const RequireAuth = ({ children })=> {
  let location = useLocation();

  if (!auth.isAuth) {
    // Redirect them to the /welcome page, but save the current location they were
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

const App = _=> {
  return (

      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/:error" element={<Error />} />
          <Route exact path="/todo" element={
          <RequireAuth>
            <Home />
          </RequireAuth>}
          />
        </Routes>
      </Router>

        /*<Routes>
          <Route exact path = "/" elememt={<App>}/>
          <Route exact path = "/welcome" element={<Welcome>}/>
          
        </Routes> */
  );
}

export default App;
