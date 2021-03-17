import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'

import UnitChoice from './Pages/UnitChoice/UnitChoice'
import Settings from './Pages/Settings/Settings'
import WordFlashCards from './Pages/WordFlashCards/WordFlashCards'
import WordQuiz from './Pages/WordQuiz/WordQuiz'
import Admin from './Pages/Admin/Admin'

import Admin2 from './Pages/Test/MultipleChoice'

import LoginButton from './Pages/Auth0/LoginButton'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

import NotLiveRoute from 'react-live-route'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core';


import styles from './Styles/home.module.scss'

import { Home } from '@material-ui/icons';

const LiveRoute = withRouter(NotLiveRoute)

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log(user)
  }, [isAuthenticated])

  return (
    <div className={styles.home}>

      {/* Route是路径，访问相应的path就会渲染相应的component*/}
      <div className="vocabulary-companion-div">
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/unit-choice' component={UnitChoice} />
        <Route exact path='/word-flash-cards' component={WordFlashCards} />
        <Route exact path='/word-quiz' component={WordQuiz} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/test' component={Admin2} />
      </div>

      {/*<Route>标签之间所包围的部分就是渲染的内容 */}
      <Route exact path='/'>
        <div className={styles.button_div}>

          {/* Link相当于链接，按下后会被redirect到'to'的位置 */}

          <Link style={{ textDecoration: 'none' }} to='/settings' ><Button>Settings</Button></Link>
          <Link style={{ textDecoration: 'none' }} to='/word-quiz' ><Button>word-quiz</Button></Link>

          <Link style={{ textDecoration: 'none' }} to='/word-flash-cards' ><Button>Flash Cards</Button></Link>
          <Link style={{ textDecoration: 'none' }} to='/unit-choice'><Button>Unit Choice</Button></Link>
          <LoginButton />
        </div>
      </Route>

    </div>
  );
}

export default App;
