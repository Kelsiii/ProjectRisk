import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Table from '../component/table'
import session from '../../service/session'
import Client from '../../service/user-client'

export default class Companies extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			companys : []
		}
  };

	componentDidMount() {
		Client.queryCompanies().then( companys => {
			this.setState({
				companys
			})
		});
	}

	render() {
		let companys = this.state.companys;
		const rows = companys.map( (company, i) => { 

			return(
				<tr key={company.id}>
					<td>{i+1}</td>
					<td><a>{company.name}</a></td>
					<td className="am-hide-sm-only">{company.contact || '无'}</td>
					<td className="am-hide-sm-only">{company.email}</td>
					<td className="am-hide-sm-only">{company.tel}</td>
					<td>
						<div className="am-btn-toolbar">
							<div className="am-btn-group am-btn-group-xs">
								<button className="am-btn am-btn-default am-btn-xs am-text-secondary" ><span className="am-icon-pencil-square-o"></span> 编辑</button>
								<button className="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only" ><span className="am-icon-trash-o"></span> 删除</button>
							</div>
						</div>
					</td>
				</tr>
			)
		});
		const head = (
			<tr>
				<th className="table-id">ID</th>
				<th>公司名称</th>
				<th className="am-hide-sm-only">联系人</th>
				<th className="am-hide-sm-only">邮箱</th>
				<th className="am-hide-sm-only">联系电话</th>
				<th>操作</th>
			</tr>
		)
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding am-padding-bottom-0">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">客户</strong> / <small>全部</small></div>
				</div>

				<hr/>

				<div className="am-g">
					<div className="am-u-sm-12 am-u-md-6">
						<div className="am-btn-toolbar">
							<div className="am-btn-group am-btn-group-xs">
								<button type="button" className="am-btn am-btn-default"><a href="/#/mkt/company/add"><span className="am-icon-plus"></span> 新增 </a></button>
								<button type="button" className="am-btn am-btn-default"><span className="am-icon-save"></span> 保存</button>
							</div>
						</div>
					</div>
					
					<div className="am-u-sm-12 am-u-md-6">
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