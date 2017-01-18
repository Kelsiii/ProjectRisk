import React from 'react'
import { render } from 'react-dom'
import {
  hashHistory,
  IndexRedirect,
  Router,
  Route,
  IndexRoute
} from 'react-router'
import Wrapper from './wrapper'
import Apps from './apps/dashboard'
import Login from './apps/login'
import Current from './apps/project/current-list'
import Add from './apps/project/add'
import All from './apps/project/all-list'
import Completed from './apps/project/completed-list'
import Users from './apps/user/user-list'
import UserAdd from './apps/user/add'
import UserInfo from './apps/user/user-info'
import Project from './apps/component/project'

render(
  <Router history={ hashHistory }>
    <Route path='/login' component={Login}/>
    <Route path='/' component={Wrapper}>
      <IndexRedirect to="/apps" />
      <Route path='apps' component={Apps}/>
      <Route path='login' component={Login}/>
      <Route path='current' component={Current}/>
      <Route path='all' component={All}/>
      <Route path='completed' component={Completed}/>
      <Route path='add' component={Add}/>
      <Route path='users' component={Users}/>
      <Route path='users/add' component={UserAdd}/>
      <Route path='userinfo' component={UserInfo}/>
      <Route path='project/:id' component={Project}/>

    </Route>
  </Router>,
  document.querySelector('.wrapper')
)