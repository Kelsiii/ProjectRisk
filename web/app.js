import React from 'react'
import { render } from 'react-dom'
import {
  hashHistory,
  IndexRedirect,
  Router,
  Route
} from 'react-router'
import Wrapper from './wrapper'
import Apps from './apps/dashboard'
import Login from './login'
import Current from './apps/current-list'
import Add from './apps/add'
import All from './apps/all-list'

render(
  <Router history={ hashHistory }>
    <Route path='/login' component={Login}/>
    <Route path='/' component={Wrapper}>
      <IndexRedirect to="/apps" />
      <Route path='apps' component={Apps}/>
      <Route path='login' component={Login}/>
      <Route path='current' component={Current}/>
      <Route path='all' component={All}/>
      <Route path='add' component={Add}/>
    </Route>
  </Router>,
  document.querySelector('.wrapper')
)