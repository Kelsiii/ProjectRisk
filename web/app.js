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
import CstmController from './controller/cpny-wrapper'
import DcsController from './controller/dcs-wrapper'
import Apps from './apps/dashboard'
import Login from './apps/login'
import My from './apps/project/my-list'
import ProjectAdd from './apps/project/add'
import All from './apps/project/all-list'
import Unchecked from './apps/project/unchecked-list'
import Unfinished from './apps/project/unfinished-list'
import Unevaluated from './apps/project/unevaluated-list'
import Invested from './apps/project/invested-list'
import Submitted from './apps/project/submitted-list'
import Users from './apps/user/user-list'
import UserAdd from './apps/user/user-add'
import UserInfo from './apps/user/user-info'
import Project from './apps/component/project'
import Analysis from './apps/component/project-analysis'
import CheckProject from './apps/component/project-check'
import Companies from './apps/user/company-list'
import CompanyAdd from './apps/user/company-add'

render(
  <Router history={ hashHistory }>
    <Route path='/login' component={Login}/>
    <Route path='/' component={Wrapper}>
      <IndexRedirect to="/apps" />
      <Route path='apps' component={Apps}/>
      <Route path='login' component={Login}/>
      <Route path='My' component={My}/>
      <Route path='all' component={All}/>
      <Route path='add' component={ProjectAdd}/>
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
      <Route path='company' component={Companies}/>
      <Route path='company/add' component={CompanyAdd}/>
      <Route path='users' component={Users}/>
      <Route path='userinfo' component={UserInfo}/>
      <Route path='my' component={My}/>
      <Route path='unchecked' component={Unchecked}/>
      <Route path='all' component={All}/>
      <Route path='project/:id' component={CheckProject}/>
    </Route>

    <Route path='/cstm' component={CstmController}>
      <IndexRedirect to="/cstm/apps" />
      <Route path='apps' component={Apps}/>
      <Route path='userinfo' component={UserInfo}/>
      <Route path='submitted' component={Submitted}/>
      <Route path='unfinished' component={Unfinished}/>
      <Route path='all' component={All}/>
      <Route path='add' component={ProjectAdd}/>
      <Route path='project/:id' component={Project}/>
    </Route>

    <Route path='/dcs' component={DcsController}>
      <IndexRedirect to="/dcs/apps" />
      <Route path='apps' component={Apps}/>
      <Route path='userinfo' component={UserInfo}/>
      <Route path='unevaluated' component={Unevaluated}/>
      <Route path='invested' component={Invested}/>
      <Route path='all' component={All}/>
      <Route path='project/:id' component={Analysis}/>
    </Route>
  </Router>,
  document.querySelector('.wrapper')
)