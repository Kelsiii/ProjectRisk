import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			type: 'all'
		}
  };

	render() {
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
                    ID： <strong>XXXXXX12345</strong> <br/>
                    账号类型： <strong>普通</strong> <br/>
                    账号状态： <strong>正常</strong> <br/>
                    账号有效期： <strong>2027.01.15</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="am-panel am-panel-default">
              <div className="am-panel-bd">
                <div className="user-info">
                  <p className="am-text-primary am-text-md">个人信息</p>
                  <p className="user-info-order">
                    姓名：<strong>XXX</strong> <br/>
                    部门：<strong>财务部</strong> <br/>
                    职位： <strong>Accountant</strong> <br/>
                    邮箱：<strong>abc@123.com</strong> <br/>
                    联系电话：<strong>025-121242412</strong> <br/>
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
                  <input type="text" id="user-name" placeholder="请输入原密码" />
                </div>
              </div>

              <div className="am-form-group">
                <label for="user-name" className="am-u-sm-3 am-form-label">新密码：</label>
                <div className="am-u-sm-9">
                  <input type="text" id="user-name" placeholder="字母，符号或数字，至少8个字符" />
                </div>
              </div>

              <div className="am-form-group">
                <label for="user-email" className="am-u-sm-3 am-form-label">确认新密码：</label>
                <div className="am-u-sm-9">
                  <input type="email" id="user-email" placeholder="请再次输入新设置密码" />
                </div>
              </div>

              <div className="am-form-group">
                <div className="am-u-sm-9 am-u-sm-push-3">
                  <button type="button" className="am-btn am-btn-primary">保存修改</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
		)
	}
}