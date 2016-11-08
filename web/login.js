import React, { PropTypes } from 'react'
import {
  Button
} from 'react-bootstrap'
import $ from 'jquery'
require('icheck')

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    /*session.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated) {
        this.context.router.push('/');
      }
    })*/
  }

  componentDidMount() {
    /*$(this.refs.remember).iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
    document.body.classList.toggle('login-page');*/
  }

  componentWillUnmount() {
    //document.body.classList.toggle('login-page');
  }

  handleSubmit(e) {
    /*e.preventDefault();
    var data = $('form').serializeArray().reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});
    session.authenticate(data.username, data.password).then((sessionId) => {
      console.log(`Authenticated as ${sessionId}`);
      this.context.router.push('/');
    }, (err) => {
      console.debug(err);
      alert(err);
    });*/
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="am-g">
            <h1>Risk Console</h1>
            <p>Risk Management in Project Development<br/>代码编辑，代码生成，界面设计，调试，编译</p>
          </div>
          <hr />
        </div>
        <div className="am-g">
          <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
            <h3>登录</h3>
            <hr />

            <form method="post" className="am-form">
              <label for="email">用户名:</label>
              <input type="email" name="" id="email" value="" />
              <br />
              <label for="password">密码:</label>
              <input type="password" name="" id="password" value="" />
              <br />
              <label for="remember-me">
                <input id="remember-me" type="checkbox" />
                记住密码
              </label>
              <br />
              <div className="am-cf">
                <Button  name=""  className="am-btn am-btn-primary am-btn-sm am-fl" >登录</Button>
                <Button  name=""  className="am-btn am-btn-default am-btn-sm am-fr" >忘记密码 ^_^?</Button>
              </div>
            </form>
            <hr />
            <p>© 2016 XXXXX. Software Institute, NJU.</p>
          </div>
        </div>
      </div>
    )
  }
}
Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}