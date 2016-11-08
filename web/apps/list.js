import React, { PropTypes } from 'react'

export default class List extends React.Component {
  constructor(props) {
    super(props);
  };

	render() {
		return (
			<table className="am-table am-table-bd am-table-striped admin-content-table">
				<thead>
					<tr>
						<th>ID</th><th>Owner</th><th>项目名</th><th>风险</th><th>状态</th><th>管理</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>John Clark</td>
						<td><a href="#">Business management</a></td>
						<td><span className="am-badge am-badge-success">+20</span></td>
						<td>进行中</td>
						<td>
							<div className="am-dropdown" data-am-dropdown>
								<button className="am-btn am-btn-default am-btn-xs am-dropdown-toggle" data-am-dropdown-toggle><span className="am-icon-cog"></span> <span className="am-icon-caret-down"></span></button>
								<ul className="am-dropdown-content">
									<li><a href="#">1. 编辑</a></li>
									<li><a href="#">2. 下载</a></li>
									<li><a href="#">3. 删除</a></li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>风清扬</td>
						<td><a href="#">公司LOGO设计</a></td>
						<td><span className="am-badge am-badge-danger">+2</span></td>
						<td>进行中</td>
						<td>
							<div className="am-dropdown" data-am-dropdown>
								<button className="am-btn am-btn-default am-btn-xs am-dropdown-toggle" data-am-dropdown-toggle><span className="am-icon-cog"></span> <span className="am-icon-caret-down"></span></button>
								<ul className="am-dropdown-content">
									<li><a href="#">1. 编辑</a></li>
									<li><a href="#">2. 下载</a></li>
									<li><a href="#">3. 删除</a></li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>詹姆斯</td>
						<td><a href="#">开发一款业务数据软件</a></td>
						<td><span className="am-badge am-badge-warning">+10</span></td>
						<td>进行中</td>
						<td>
							<div className="am-dropdown" data-am-dropdown>
								<button className="am-btn am-btn-default am-btn-xs am-dropdown-toggle" data-am-dropdown-toggle><span className="am-icon-cog"></span> <span className="am-icon-caret-down"></span></button>
								<ul className="am-dropdown-content">
									<li><a href="#">1. 编辑</a></li>
									<li><a href="#">2. 下载</a></li>
									<li><a href="#">3. 删除</a></li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>云适配</td>
						<td><a href="#">适配所有网站</a></td>
						<td><span className="am-badge am-badge-secondary">+50</span></td>
						<td>已完成</td>
						<td>
							<div className="am-dropdown" data-am-dropdown>
								<button className="am-btn am-btn-default am-btn-xs am-dropdown-toggle" data-am-dropdown-toggle><span className="am-icon-cog"></span> <span className="am-icon-caret-down"></span></button>
								<ul className="am-dropdown-content">
									<li><a href="#">1. 编辑</a></li>
									<li><a href="#">2. 下载</a></li>
									<li><a href="#">3. 删除</a></li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>5</td><td>呵呵呵</td>
						<td><a href="#">基兰会获得BUFF</a></td>
						<td><span className="am-badge">+22</span></td>
						<td>已完成</td>
						<td>
							<div className="am-dropdown" data-am-dropdown>
								<button className="am-btn am-btn-default am-btn-xs am-dropdown-toggle" data-am-dropdown-toggle><span className="am-icon-cog"></span> <span className="am-icon-caret-down"></span></button>
								<ul className="am-dropdown-content">
									<li><a href="#">1. 编辑</a></li>
									<li><a href="#">2. 下载</a></li>
									<li><a href="#">3. 删除</a></li>
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
