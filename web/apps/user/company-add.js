import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Client from '../../service/user-client'

export default class UserAdd extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			id : '',
			name : '',
      contact : '',
			email: '',
			tel: '',
			address: '',
			industry: '',
			intro: '',
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
			contact: this.state.contact,
			address: this.state.address,
			intro: this.state.intro,
			password : 'default',
			valid : date+' '+now.toTimeString().substring(0,8),
      type: 'company',
      status: '正常'
		};
		Client.addUser(user).then(resp => {
			if(resp.created === true){
				alert('创建成功');
				this.context.router.push('/mkt/company');
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
          id,
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
        <div className="am-fl am-cf"><a href="/#/admin/users"><strong className="am-text-primary am-text-lg">企业</strong></a> / <small>新增账户</small></div>
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
                  this.checkRepeat(e.target.value);
                }} />
								<small style={{color:'red'}}>{reminder}</small>
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-name" className="am-u-sm-3 am-form-label">公司名称 / Company</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-name" placeholder="公司名称 / Company" 
                onChange={ e => { this.setState({ name: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-email" className="am-u-sm-3 am-form-label">联系人 / Contact</label>
              <div className="am-u-sm-9">
                <input type="email" id="user-email" placeholder="联系人 / Contact" 
                onChange={ e => { this.setState({ contact: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-email" className="am-u-sm-3 am-form-label">邮箱 / Email</label>
              <div className="am-u-sm-9">
                <input type="email" id="user-email" placeholder="邮箱 / Email" 
                onChange={ e => { this.setState({ email: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-phone" className="am-u-sm-3 am-form-label">联系电话 / Telephone</label>
              <div className="am-u-sm-9">
                <input type="tel" id="user-phone" placeholder="联系电话 / Telephone" 
                onChange={ e => { this.setState({ tel: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-address" className="am-u-sm-3 am-form-label">地址 / Address</label>
              <div className="am-u-sm-9">
                <input type="tel" id="user-address" placeholder="地址 / Address" 
                onChange={ e => { this.setState({ address: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-industry" className="am-u-sm-3 am-form-label">主营业务 / Industry</label>
              <div className="am-u-sm-9">
                <input type="text" id="user-industry" placeholder="主营业务 / Industry" 
                onChange={ e => { this.setState({ industry: e.target.value });}} />
              </div>
            </div>

            <div className="am-form-group">
              <label for="user-intro" className="am-u-sm-3 am-form-label">简介 / Intro</label>
              <div className="am-u-sm-9">
                <textarea className="" rows="5" id="user-intro" placeholder="简介 / Intro"
                onChange={ e => { this.setState({ intro: e.target.value });}} ></textarea>
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