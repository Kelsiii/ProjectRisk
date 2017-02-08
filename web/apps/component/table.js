import React, { PropTypes } from 'react'
import Client from '../../service/user-client'
import session from '../../service/session'

export default class Table extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			users : [],
			type: props.department || 'all'
		}
  };

	componentDidMount() {
		Client.queryUsers().then( users => {
			this.setState({
				users
			})
		});
	}

	componentWillReceiveProps(nextProps) {
    this.setState({
			department: nextProps.department
		})
  }

	render() {
		let users = this.state.users;
		if(this.state.department && this.state.department !== 'all'){
			users = users.filter(user => user.department === this.state.type)
		}
		const rows = users.map( (user, i) => { 
			return(
				<tr key={user.id}>
					<td>{i+1}</td>
					<td><a>{user.name}</a></td>
					<td>{user.department}</td>
					<td className="am-hide-sm-only">{user.position || '无'}</td>
					<td className="am-hide-sm-only">{user.email}</td>
					<td className="am-hide-sm-only">{user.tel}</td>
					<td>
						<div className="am-btn-toolbar">
							<div className="am-btn-group am-btn-group-xs">
								<button className="am-btn am-btn-default am-btn-xs am-text-secondary" disabled={session.id() !== 'admin'}><span className="am-icon-pencil-square-o"></span> 编辑</button>
								<button className="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only" disabled={session.id() !== 'admin'}><span className="am-icon-trash-o"></span> 删除</button>
							</div>
						</div>
					</td>
				</tr>
			)
		});
		return (
			<form className="am-form">
				<table className="am-table am-table-striped am-table-hover table-main">
					<thead>
					<tr>
						<th className="table-id">ID</th>
						<th>用户</th>
						<th>部门</th>
						<th className="am-hide-sm-only">职位</th>
						<th className="am-hide-sm-only">邮箱</th>
						<th className="am-hide-sm-only">联系电话</th>
						<th>操作</th>
					</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<div className="am-cf">
					共 {users.length} 条记录
					
				</div>
			</form>
		)
	}
}