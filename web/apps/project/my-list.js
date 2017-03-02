import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Client from '../../service/project-client'
import List from '../component/list'
import session from '../../service/session'

export default class My extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			projects: []
		}
  };

	componentDidMount() {
		let ctx = {};
		if(session.type() === 'company'){
			ctx.company = session.id();
		}
		if(session.type() === 'mkt'){
			ctx.owner = session.id()
		}
		Client.queryProjects(ctx).then( projects => {
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
				case 'unfinished':
					status = '待完善'
					break;
				case 'unchecked':
					status = '材料待审核'
					break;
				case 'evaluating':
					status = '待评估'
					break;
				case 'invested':
					status = '已投资'
					break;
				case 'paused':
					status = '暂缓投资'
					break;
				default:
					status = 'unknown'
					break;
			}
			let industry;
			switch (project.industry) {
				case 'finance':
					industry = '金融业'
					break;
				case 'technology':
					industry = '科学研究/技术服务'
					break;
				case 'construction':
					industry = '建筑/房地产/租赁和商务服务'
					break;
				case 'agriculture':
					industry = '农、林、牧、渔业'
					break;
				case 'manufacturing':
					industry = '制造业'
					break;
				case 'energy':
					industry = '电力、热力、燃气及水生产和供应'
					break;
				case 'IT':
					industry = '信息传输/软件/信息技术服务'
					break;
				case 'entertainment':
					industry = '文化/体育/娱乐'
					break;
				case 'education':
					industry = '教育'
					break;
				case 'foreign':
					industry = '外资合作'
					break;
				case 'others':
					industry = '其他'
					break;
				default:
					industry = 'unknown'
					break;
			}

			return (
				<tr key={'row'+i}>
					<td>{i+1}</td>
					<td><a href={`#/project/${project.id}`}>{project.name}</a></td>
					<td>{project.companyName}</td>
					<td>{industry}</td>
					<td>{project.value}</td>
					<td>{status}</td>
					<td>
						<Link to={`/project/${project.id}`}><button className="am-btn am-btn-default am-btn-xs" data-am-dropdown-toggle><span className="am-icon-cog"></span> </button></Link>	
					</td>
				</tr>
			)
		})

		const head = (
			<tr>
				<th className="table-id">ID</th>
				<th>项目名</th>
				<th>申报企业</th>
				<th className="am-hide-sm-only">所属行业</th>
				<th className="am-hide-sm-only">申报金额</th>
				<th className="am-hide-sm-only">状态</th>
				<th>操作</th>
			</tr>
		)

		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">项目</strong> / <small>进行中</small></div>
				</div>

				<div className="am-g">
					<div className="am-u-sm-12">
						<List head={head} rows={rows}/>
					</div>
				</div>
			</div>
		)
	}
}