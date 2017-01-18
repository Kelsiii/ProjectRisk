import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

export default class UserAdd extends React.Component {
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
        <div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">员工</strong> / <small>新增账户</small></div>
      </div>

      <hr/>

      <div className="am-g">
        <div className="am-u-sm-12 am-u-md-4 am-u-md-push-8">

        </div>

        <div className="am-u-sm-12 am-u-md-9 am-u-md-pull-3">
          <form className="am-form am-form-horizontal">
						<div className="am-form-group">
              <label for="user-id" className="am-u-sm-3 am-form-label">用户名 / ID</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-name" placeholder="用户名 / ID" />
								<small style={{color:'red'}}>*不可重复</small>
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-name" className="am-u-sm-3 am-form-label">姓名 / Name</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-name" placeholder="姓名 / Name" />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-email" className="am-u-sm-3 am-form-label">邮箱 / Email</label>
              <div className="am-u-sm-9">
                <input type="email" id="user-email" placeholder="邮箱 / Email" />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-phone" className="am-u-sm-3 am-form-label">电话 / Telephone</label>
              <div className="am-u-sm-9">
                <input type="tel" id="user-phone" placeholder="电话 / Telephone" />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-department" className="am-u-sm-3 am-form-label">部门 / Department</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-department" placeholder="部门 / Department" />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-position" className="am-u-sm-3 am-form-label">职位 / Position</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-position" placeholder="职位 / Position" />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-intro" className="am-u-sm-3 am-form-label">备注 / Remark</label>
              <div className="am-u-sm-9">
                <textarea className="" rows="5" id="user-intro" placeholder="备注 / Remark"></textarea>
                <small>250字以内</small>
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