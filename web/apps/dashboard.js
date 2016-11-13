import React, { PropTypes } from 'react'
import List from './component/list'
import Client from '../service/client'

export default class Console extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			currentProject: 0,
			completedProject: 0,
			risk: 0,
			user: 0
		}
  };

	componentDidMount() {
    Client.stat().then(resp => {
			let riskStatus = resp.aggregations.risk.buckets;
			riskStatus.forEach(status => {
				if(status.key_as_string === 'false'){
					this.setState({ risk:status.doc_count });
				}
			});
			let typeNum = resp.aggregations.stat.buckets;
			typeNum.forEach(type => {
				if(type.key === 'user'){
					this.setState({ user:type.doc_count });
				}
			});
			let projectStatus = resp.aggregations.status.buckets;
			projectStatus.forEach(status => {
				if(status.key === 'underway'){
					this.setState({ currentProject:status.doc_count });
				}
				if(status.key === 'completed'){
					this.setState({ completedProject:status.doc_count });
				}
			});
		})
  }

	render() {
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">首页</strong></div>
				</div>

				<ul className="am-avg-sm-1 am-avg-md-4 am-margin am-padding am-text-center admin-content-list ">
					<li><a href="/#current" className="am-text-success"><span className="am-icon-btn am-icon-file-text"></span><br/>当前项目<br/>{this.state.currentProject}</a></li>
					<li><a href="/#completed" className="am-text-warning"><span className="am-icon-btn am-icon-briefcase"></span><br/>已完成<br/>{this.state.completedProject}</a></li>
					<li><a href="#" className="am-text-danger"><span className="am-icon-btn am-icon-recycle"></span><br/>风险<br/>{this.state.risk}</a></li>
					<li><a href="/#users" className="am-text-secondary"><span className="am-icon-btn am-icon-user-md"></span><br/>项目成员<br/>{this.state.user}</a></li>
				</ul>

				<div className="am-g">
					<div className="am-u-sm-12">
						<List type='homepage'/>
					</div>
				</div>
			</div>
		)
	}
}
