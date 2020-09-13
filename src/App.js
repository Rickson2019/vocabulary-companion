import React from 'react';

import UnitChoice from './Pages/UnitChoice/UnitChoice'
import Settings from './Pages/Settings/Settings'
import WordFlashCards from './Pages/WordFlashCards/WordFlashCards'
import WordQuiz from './Pages/WordQuiz/WordQuiz'
import Admin from './Pages/Admin/Admin'

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

      {/* Route是路径，访问相应的path就会渲染相应的component*/}
      <div className="vocabulary-companion-div">
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/unit-choice' component={UnitChoice} />
        <Route exact path='/word-flash-cards' component={WordFlashCards} />
        <Route exact path='/word-quiz' component={WordQuiz} />
        <Route exact path='/admin' component={Admin} />
      </div>

     {/*<Route>标签之间所包围的部分就是渲染的内容 */}
      <Route exact path='/'>
        <div className="button-div">

          {/* Link相当于链接，按下后会被redirect到'to'的位置 */}
          
          <Link style={{ textDecoration: 'none' }} to='/settings' ><Button>Settings</Button></Link>
          <Link style={{ textDecoration: 'none' }} to='/word-quiz' ><Button>word-quiz</Button></Link>

          <Link style={{ textDecoration: 'none' }} to='/word-flash-cards' ><Button>Flash Cards</Button></Link>
          <Link style={{ textDecoration: 'none' }} to='/unit-choice'><Button>Unit Choice</Button></Link>
        </div>
      </Route>

    </div>
  );
}

export default App;
