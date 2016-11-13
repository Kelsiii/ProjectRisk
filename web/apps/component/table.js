import React, { PropTypes } from 'react'
import Client from '../../service/client'
import session from '../../service/session'

export default class Table extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			users : [],
			type: props.usertype || 'all'
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
			type: nextProps.usertype
		})
  }

	render() {
		let users = this.state.users;
		if(this.state.type && this.state.type !== 'all'){
			users = users.filter(user => user.type === this.state.type)
		}
		const rows = users.map( (user, i) => { 
			return(
				<tr key={user.id}>
					<td>{i+1}</td>
					<td><a>{user.username}</a></td>
					<td>{user.type}</td>
					<td className="am-hide-sm-only">{user.team || '无'}</td>
					<td className="am-hide-sm-only">{user.date}</td>
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
						<th className="table-id">ID</th><th className="table-title">用户</th><th className="table-type">类别</th><th className="table-author am-hide-sm-only">团队</th><th className="table-date am-hide-sm-only">修改日期</th><th className="table-set">操作</th>
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