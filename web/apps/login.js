import React, { PropTypes } from 'react'
import {
  Button
} from 'react-bootstrap'
import $ from 'jquery'
import session from '../service/session'
import { hex_sha1 } from '../service/sha1'
require('icheck')

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    session.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated) {
        this.context.router.push('/');
      }
    })
  }

  componentDidMount() {
    $(this.refs.remember).iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
    //document.body.classList.toggle('login-page');
  }

  componentWillUnmount() {
    //document.body.classList.toggle('login-page');
  }

  handleSubmit(e) {
    e.preventDefault();
    var data = $('.am-form').serializeArray().reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});
    var pwd = hex_sha1(data.password);
    session.authenticate(data.username, pwd).then((user) => {
      console.log(`Authenticated as ${user.id}`);
      console.log(user.department);
      if(user.type === 'staff'){
        if(user.department === 'hr'){
				  this.context.router.push('/admin/users');
        }
        if(user.department === 'mkt'){
				  this.context.router.push('/mkt');
        }
      }
      else{
        this.context.router.push('/cstm');
      }
    }, (err) => {
      console.debug(err);
      alert(err);
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="am-g">
            <h1>Risk Console</h1>
            <p>Risk Evaluation and Management for Project Investment<br/>项目规划，风险评估，投资决策，风险状态跟踪</p>
          </div>
          <hr />
        </div>
        <div className="am-g">
          <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
            <h3>登录</h3>
            <hr />

            <form method="post" className="am-form" onSubmit={this.handleSubmit.bind(this)}>
              <label for="username">用户名:</label>
              <input type="text" name="username" />
              <br />
              <label for="password">密码:</label>
              <input type="password" name="password" id="password" />
              <br />
              <label for="remember-me">
                <input ref='remember' name="remember" id="remember-me" type="checkbox" />
                记住密码
              </label>
              <br />
              <div className="am-cf">
                <Button type="submit" name=""  className="am-btn am-btn-primary am-btn-sm am-fl" >登录</Button>
                <Button  name=""  className="am-btn am-btn-default am-btn-sm am-fr" >忘记密码 ^_^?</Button>
              </div>
            </form>
            <hr />
            <p>© 2017 Jingyi Z. Software Institute, NJU.</p>
          </div>
        </div>
      </div>
    )
  }
}
Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}