import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Client from '../../service/user-client'
import session from '../../service/session'
import { hex_sha1 } from '../../service/sha1'

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			user: {},
      pwdMatch: false,
      newMatch: false,
      pwdValid: false,
      input: '',
      newPwd: '',
      pwdConfirm: ''
		}
  };

  componentDidMount() {
    Client.queryUser(session.id()).then(user => {
			this.setState({
				user: user[0]
			})
		});
  }

  handleUpdate() {
    let hex = hex_sha1(this.state.newPwd);
    let user = this.state.user;
    user.password = hex;
    Client.updateUser(user).then(resp => {
      if(resp){
        alert('修改成功');
				location.reload();
      }
    })
  }

	render() {
    const user = this.state.user || {};
    let reminder = '';
    if( this.state.input !== '' && !this.state.pwdMatch ){
      reminder = (<span className="am-icon-warning">原密码错误</span>)
    }
    if( this.state.newPwd !== '' && !this.state.pwdValid ){
      reminder = (<span className="am-icon-warning">新密码需要至少8位</span>)
    }
    if( this.state.pwdConfirm !== '' && !this.state.newMatch ){
      reminder = (<span className="am-icon-warning">两次输入不符</span>)
    }
		return (
			<div className="admin-content-body">
        <div className="am-cf am-padding am-padding-bottom-0">
          <div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">个人设置</strong> / <small>Personal information</small></div>
        </div>

        <hr/>

        <div className="am-g">
          <div className="am-u-sm-12 am-u-md-4 am-u-md-push-8">
            <div className="am-panel am-panel-default">
              <div className="am-panel-bd">
                <div className="user-info">
                  <p className="am-text-primary am-text-md">账号信息</p>
                  <p className="user-info-order">
                    ID： <strong>{user.id || ''}</strong> <br/>
                    账号类型： <strong>普通</strong> <br/>
                    账号状态： <strong>正常</strong> <br/>
                    账号有效期： <strong>{user.valid || ''}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="am-panel am-panel-default">
              <div className="am-panel-bd">
                <div className="user-info">
                  <p className="am-text-primary am-text-md">个人信息</p>
                  <p className="user-info-order">
                    姓名：<strong>{user.name || ''}</strong> <br/>
                    部门：<strong>{user.department || ''}</strong> <br/>
                    职位： <strong>{user.position || ''}</strong> <br/>
                    邮箱：<strong>{user.email || ''}</strong> <br/>
                    联系电话：<strong>{user.tel || ''}</strong> <br/>
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="am-u-sm-12 am-u-md-7 am-u-md-pull-5">
            <form className="am-form am-form-horizontal">
              <div className="am-form-group">
                <label for="user-id" className="am-u-sm-3 am-form-label">当前密码：</label>
                <div className="am-u-sm-9">
                  <input type="password" placeholder="请输入原密码"
                  onChange = { e =>{
                    this.setState({
                      input: e.target.value
                    })
                    if(hex_sha1(e.target.value) === user.password){
                      this.setState({
                        pwdMatch : true,
                      })
                    }
                  }} 
                  />
                </div>
              </div>

              <div className="am-form-group">
                <label for="user-name" className="am-u-sm-3 am-form-label">新密码：</label>
                <div className="am-u-sm-9">
                  <input type="password" placeholder="字母，符号或数字，至少8个字符"
                  onChange = { e =>{
                    this.setState({
                      newPwd: e.target.value
                    })
                    if(e.target.value.length > 7){
                      this.setState({
                        pwdValid : true
                      })
                    }
                  }}/>
                </div>
              </div>

              <div className="am-form-group">
                <label for="user-email" className="am-u-sm-3 am-form-label">确认新密码：</label>
                <div className="am-u-sm-9">
                  <input type="password" placeholder="请再次输入新设置密码"
                  onChange = { e =>{
                    this.setState({
                      pwdConfirm: e.target.value
                    })
                    if(e.target.value === this.state.newPwd){
                      this.setState({
                        newMatch : true
                      })
                    }
                  }}/>
                  <p style={{color:'red'}}>{reminder}</p>
                </div>
              </div>

              <div className="am-form-group">
                <div className="am-u-sm-9 am-u-sm-push-3">
                  <button type="button" 
                  disabled={!(this.state.pwdMatch || this.state.newMatch || this.state.pwdValid)} 
                  className="am-btn am-btn-primary"
                  onClick = {() => {this.handleUpdate()}}
                  >保存修改</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
		)
	}
}

UserInfo.contextTypes = {
  router: PropTypes.object.isRequired
}