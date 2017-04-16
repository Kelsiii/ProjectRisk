import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Table from '../component/table'
import session from '../../service/session'
import Client from '../../service/user-client'

export default class Users extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			users : [],
			department: 'all'
		}
  };

	componentDidMount() {
		Client.queryUsers().then( users => {
			this.setState({
				users
			})
		});
	}

	handleDelete(user) {
		user.status = 'disabled';
		Client.updateUser(user).then(resp => {
		if(resp){
				location.reload();
			}
		})
	}

	render() {
		let users = this.state.users;
		if(this.state.department && this.state.department !== 'all'){
			users = users.filter(user => user.department === this.state.type)
		}
		const rows = users.map( (user, i) => { 
			let department;
			switch (user.department){
				case 'hr':
					department = '人事部';
					break;
				case 'mkt':
					department = '业务部';
					break;
				case 'investment':
					department = '投资决策部';
					break;
				default:
					department = user.department;
					break;
			}
			return(
				<tr key={user.id}>
					<td>{i+1}</td>
					<td><a>{user.name}</a></td>
					<td>{department}</td>
					<td className="am-hide-sm-only">{user.position || '无'}</td>
					<td className="am-hide-sm-only">{user.email}</td>
					<td className="am-hide-sm-only">{user.tel}</td>
					<td>
						<div className="am-btn-toolbar">
							<div className="am-btn-group am-btn-group-xs">
								<button className="am-btn am-btn-default am-btn-xs am-text-secondary" disabled={session.type() !== 'hr'}><span className="am-icon-pencil-square-o"></span> 编辑</button>
								<button className="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only" onClick={()=>{this.handleDelete(user)}} disabled={session.type() !== 'hr'}><span className="am-icon-trash-o"></span> 删除</button>
							</div>
						</div>
					</td>
				</tr>
			)
		});
		const head = (
			<tr>
				<th className="table-id">ID</th>
				<th>用户</th>
				<th>部门</th>
				<th className="am-hide-sm-only">职位</th>
				<th className="am-hide-sm-only">邮箱</th>
				<th className="am-hide-sm-only">联系电话</th>
				<th>操作</th>
			</tr>
		)
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding am-padding-bottom-0">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">员工</strong> / <small>全部</small></div>
				</div>

				<hr/>

				<div className="am-g">
					<div className="am-u-sm-12 am-u-md-6">
						<div className="am-btn-toolbar">
							<div className="am-btn-group am-btn-group-xs">
								<button type="button" className="am-btn am-btn-default" disabled={session.type() !== 'hr'}><a href="/#/admin/add"><span className="am-icon-plus"></span> 新增 </a></button>
								<button type="button" className="am-btn am-btn-default" ><span className="am-icon-save"></span> 保存</button>
							</div>
						</div>
					</div>
					<div className="am-u-sm-12 am-u-md-3">
						<div className="am-form-group">
							<FormControl componentClass='select' value={this.state.department} onChange={e => { this.setState({ department: e.target.value }); }}>
								<option value="all">所有部门</option>
								<option value="mkt">业务部</option>
								<option value="investment">投资决策部</option>
								<option value="hr">人事部</option>
							</FormControl>
						</div>
					</div>
					<div className="am-u-sm-12 am-u-md-3">
						<div className="am-input-group am-input-group-sm">
						<input type="text" className="am-form-field" />
						<span className="am-input-group-btn">
						<button className="am-btn am-btn-default" type="button">搜索</button>
						</span>
						</div>
					</div>
				</div>

				<div className="am-g">
					<div className="am-u-sm-12">
						<Table head={head} rows={rows}/>
					</div>
				</div>
				
    	</div>
		)
	}
}