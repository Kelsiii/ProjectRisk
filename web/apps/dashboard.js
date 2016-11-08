import React, { PropTypes } from 'react'
import List from './list'

export default class Console extends React.Component {
  constructor(props) {
    super(props);
  };

	render() {
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">首页</strong></div>
				</div>

				<ul className="am-avg-sm-1 am-avg-md-4 am-margin am-padding am-text-center admin-content-list ">
					<li><a href="#" className="am-text-success"><span className="am-icon-btn am-icon-file-text"></span><br/>当前项目<br/>2300</a></li>
					<li><a href="#" className="am-text-warning"><span className="am-icon-btn am-icon-briefcase"></span><br/>已完成<br/>308</a></li>
					<li><a href="#" className="am-text-danger"><span className="am-icon-btn am-icon-recycle"></span><br/>风险<br/>80082</a></li>
					<li><a href="#" className="am-text-secondary"><span className="am-icon-btn am-icon-user-md"></span><br/>项目成员<br/>3000</a></li>
				</ul>

				<div className="am-g">
					<div className="am-u-sm-12">
						<List />
					</div>
				</div>
			</div>
		)
	}
}
