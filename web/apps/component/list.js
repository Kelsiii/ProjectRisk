import React, { PropTypes } from 'react'
import Client from '../../service/client'
import { Link } from 'react-router'

export default class List extends React.Component {
  constructor(props) {
    super(props);
		let type = props.type;
		this.state = {
			projects : [],
			type
		}
  };

	componentDidMount() {
		Client.queryProjects({type : this.state.type}).then( projects => {
			this.setState({
				projects
			})
		});
	}
	render() {
		let projects = this.state.projects;
		const rows = projects.map( (project, i) => {
			let status;
			switch (project.status) {
				case 'unopend':
					status = '未启动'
					break;
				case 'underway':
					status = '进行中'
					break;
				case 'paused':
					status = '暂停'
					break;
				case 'canceled':
					status = '取消'
					break;
				case 'completed':
					status = '完成'
					break;
				default:
					status = 'unknown'
					break;
			}
			let riskBadge;
			if(project.riskNum <= 3){
				riskBadge = (<span className="am-badge am-badge-success">+{project.riskNum}</span>)
			} else if(project.riskNum <= 5 ){
				riskBadge = (<span className="am-badge am-badge-secondary">+{project.riskNum}</span>)
			} else if(project.riskNum <= 10 ){
				riskBadge = (<span className="am-badge am-badge-warning">+{project.riskNum}</span>)
			} else {
				riskBadge = (<span className="am-badge am-badge-danger">+{project.riskNum}</span>)
			}
			return (
				<tr key={'row'+i}>
					<td>{i+1}</td>
					<td>{project.owner}</td>
					<td><a href={`#/project/${project.id}`}>{project.name}</a></td>
					<td>{riskBadge}</td>
					<td>{status}</td>
					<td>{project.date}</td>
					<td>
						<Link to={`/project/${project.id}`}><button className="am-btn am-btn-default am-btn-xs" data-am-dropdown-toggle><span className="am-icon-cog"></span> </button></Link>	
					</td>
				</tr>
			)
		})
		return (
			<table className="am-table am-table-bd am-table-striped admin-content-table">
				<thead>
					<tr>
						<th>ID</th><th>Owner</th><th>项目名</th><th>风险</th><th>状态</th><th>启动日期</th><th>管理</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}
}
