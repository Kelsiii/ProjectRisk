import React from 'react'
import { render } from 'react-dom'
import {
  hashHistory,
  IndexRedirect,
  Router,
  Route,
  IndexRoute
} from 'react-router'
import Wrapper from './controller/wrapper'
import UserController from './controller/hr-wrapper'
import MktController from './controller/mkt-wrapper'
import CstmController from './controller/clt-wrapper'
import Apps from './apps/dashboard'
import Login from './apps/login'
import Current from './apps/project/current-list'
import Add from './apps/project/add'
import All from './apps/project/all-list'
import Completed from './apps/project/completed-list'
import Users from './apps/user/user-list'
import UserAdd from './apps/user/user-add'
import UserInfo from './apps/user/user-info'
import Project from './apps/component/project'
import Clients from './apps/user/client-list'

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
      <Route path='userinfo' component={UserInfo}/>
      <Route path='project/:id' component={Project}/>

    </Route>
    <Route path='/admin' component={UserController}>
      <IndexRedirect to="/admin/users" />
      <Route path='users' component={Users}/>
      <Route path='add' component={UserAdd}/>
    </Route>
    <Route path='/mkt' component={MktController}>
      <IndexRedirect to="/mkt/apps" />
      <Route path='apps' component={Apps}/>
      <Route path='client' component={Clients}/>
      <Route path='users' component={Users}/>
      <Route path='userinfo' component={UserInfo}/>
    </Route>
  </Router>,
  document.querySelector('.wrapper')
)