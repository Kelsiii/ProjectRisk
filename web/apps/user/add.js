import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Client from '../../service/user-client'

export default class UserAdd extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			id : '',
			name : '',
			email: '',
			tel: '',
			department: '',
			position: '',
			remark: '',
      repeated: false
		}
  };

  handleAdd(){
		let now = new Date();
    let month = now.getMonth() + 1;
    if( month < 10 ){
      month = '0' + month;
    }
    let day = now.getDate();
    if( day < 10 ){
      day = '0' + day;
    }
    let date = (now.getFullYear() + 10) + '-' + month + '-' + day;
		let user = {
			id : this.state.id,
			name : this.state.name,
			email: this.state.email,
			tel: this.state.tel,
			department: this.state.department,
			position: this.state.position,
			remark: this.state.remark,
			password : 'default',
			valid : date+' '+now.toTimeString().substring(0,8),
      type: '普通',
      status: '正常'
		};
		Client.addUser(user).then(resp => {
			if(resp.created === true){
				alert('创建成功');
				this.context.router.push('/users');
			}
		});
	}

  checkRepeat(id){
    Client.queryUser(id).then(resp =>{
      if(resp !== 'missing'){
        this.setState({
          repeated: true
        })
      } else{
        this.setState({
          repeated: false
        })
      }
    })
  }

	render() {
    let reminder = '';
    if(this.state.repeated){
      reminder = '该ID已被使用'
    }
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
                <input type="text" id="user-id" placeholder="用户名 / ID (不可重复)" 
                onChange={ e => { 
                  this.setState({ id: e.target.value, email: e.target.value+'@cim.com' });
                  this.checkRepeat(e.target.value);
                }} />
								<small style={{color:'red'}}>{reminder}</small>
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-name" className="am-u-sm-3 am-form-label">姓名 / Name</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-name" placeholder="姓名 / Name" 
                onChange={ e => { this.setState({ name: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-email" className="am-u-sm-3 am-form-label">邮箱 / Email</label>
              <div className="am-u-sm-9">
                <input type="email" id="user-email" placeholder="邮箱 / Email" 
                value = {this.state.email}
                onChange={ e => { this.setState({ email: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-phone" className="am-u-sm-3 am-form-label">电话 / Telephone</label>
              <div className="am-u-sm-9">
                <input type="tel" id="user-phone" placeholder="电话 / Telephone" 
                onChange={ e => { this.setState({ tel: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-department" className="am-u-sm-3 am-form-label">部门 / Department</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-department" placeholder="部门 / Department" 
                onChange={ e => { this.setState({ department: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-position" className="am-u-sm-3 am-form-label">职位 / Position</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-position" placeholder="职位 / Position" 
                onChange={ e => { this.setState({ position: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-intro" className="am-u-sm-3 am-form-label">备注 / Remark</label>
              <div className="am-u-sm-9">
                <textarea className="" rows="5" id="user-intro" placeholder="备注 / Remark"
                onChange={ e => { this.setState({ remark: e.target.value });}} ></textarea>
                <small>250字以内</small>
              </div>
            </div>

            <div className="am-form-group">
              <div className="am-u-sm-9 am-u-sm-push-3">
                <button type="button" className="am-btn am-btn-primary" disabled={this.state.id === '' || this.state.repeated} onClick = {()=>this.handleAdd()}>保存修改</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
		)
	}
}

UserAdd.contextTypes = {
  router: PropTypes.object.isRequired
}