import React from 'react';

import UnitChoice from './Pages/UnitChoice/UnitChoice'
import Settings from './Pages/Settings/Settings'
import WordFlashCards from './Pages/WordFlashCards/WordFlashCards'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

import NotLiveRoute from 'react-live-route'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core';

const LiveRoute = withRouter(NotLiveRoute)

function App() {

  return (
    <div>


      <div className="vocabulary-companion-div">
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/unit-choice' component={UnitChoice} />
        <Route exact path='/word-flash-cards' component={WordFlashCards} />
      </div>

      <Route exact path='/'>
        <div className="button-div">
          <Link style={{ textDecoration: 'none' }} to='/settings' ><Button>Settings</Button></Link>
          <Link style={{ textDecoration: 'none' }} to='/unit-choice'><Button>Unit Choice</Button></Link>
        </div>
      </Route>

    </div>
  );
}

export default App;
