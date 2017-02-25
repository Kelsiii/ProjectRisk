import React, { PropTypes } from 'react'
import {
  Button, 
  DropdownButton,
  MenuItem,
} from 'react-bootstrap'
import 'whatwg-fetch'
import session from '../service/session'
import Client from '../service/client'

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			currentProject: 0
		}
  }

  componentWillMount() {
    session.isAuthenticated().then(isAuthenticated => {
      if (!isAuthenticated) {
        this.context.router.push('/login');
      }
    })
  }

  componentDidMount() {
    console.log('login as : '+session.username());
    Client.stat().then(resp => {
			let projectStatus = resp.aggregations.status.buckets;
			projectStatus.forEach(status => {
				if(status.key === 'underway'){
					this.setState({ currentProject:status.doc_count });
				}
			});
		})
  }

  logout() {
    session.clear();
    this.context.router.push('/login');
  }

  render() {

    return (
      <div>
        <header className="am-topbar am-topbar-inverse admin-header">
            <div className="am-topbar-brand">
              <strong>RiskCon</strong> <small>项目风险管理</small>
            </div>

            <button className="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span className="am-sr-only">导航切换</span> <span className="am-icon-bars"></span></button>

            <div className="am-collapse am-topbar-collapse" id="topbar-collapse">

              <ul className="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
                <li>
                  <button style={{marginTop:"7px"}} className="am-btn am-btn-primary"><i className="am-icon-envelope-o"></i> 收件箱 </button>
                </li>
                <li className="am-dropdown" data-am-dropdown>
                  <button style={{marginTop:"7px"}} className="am-btn am-btn-primary am-dropdown-toggle" data-am-dropdown-toggle>
                    <i className="am-icon-users"></i> {session.username()} <i className="am-icon-caret-down"></i>
                  </button>
                  <ul className="am-dropdown-content">
                    <li><a href="#"><span className="am-icon-user"></span> 资料</a></li>
                    <li><a href="#"><span className="am-icon-cog"></span> 设置</a></li>
                    <li><a href="#" onClick={()=>{this.logout()}}><span className="am-icon-power-off"></span> 退出</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </header>
        <div className="am-cf admin-main">
          <div className="admin-sidebar am-offcanvas" id="admin-offcanvas">
            <div className="am-offcanvas-bar admin-offcanvas-bar">
              <ul className="am-list admin-sidebar-list">
                <li><a href="/#apps"><span className="am-icon-home"></span> 首页</a></li>
                <li className="admin-parent">
                  <a className="am-cf" data-am-collapse="{target: '#collapse-nav'}"><span className="am-icon-file"></span> 项目 <span className="am-icon-angle-right am-fr am-margin-right"></span></a>
                  <ul className="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav">
                    <li><a href="/#current"><span className="am-icon-hourglass"></span> 正在进行<span className="am-badge am-badge-secondary am-margin-right am-fr">{this.state.currentProject}</span></a></li>
                    <li><a href="/#current"><span className="am-icon-archive"></span> 待完善<span className="am-badge am-badge-secondary am-margin-right am-fr">{this.state.currentProject}</span></a></li>
                    <li><a href="/#all" className="am-cf"><span className="am-icon-th"></span> 所有项目<span className="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                    <li><a href="/#add"><span className="am-icon-pencil-square-o"></span> 添加</a></li>
                  </ul>
                </li>
                <li><a href="/#users"><span className="am-icon-user"></span> 员工</a></li>
                <li><a href="#userinfo"><span className="am-icon-cogs"></span> 设置</a></li>
                <li><a href="#"><span className="am-icon-puzzle-piece"></span> 帮助</a></li>
              </ul>
            </div>
          </div>
          <div className="admin-content">
            {this.props.children}
            <footer className="admin-content-footer">
              <hr />
              <p className="am-padding-left">© 2017 Jingyi Z. Software Institute, NJU.</p>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}
Wrapper.contextTypes = {
  router: PropTypes.object.isRequired
}
Wrapper.propTypes = {
  children: React.PropTypes.node
}
