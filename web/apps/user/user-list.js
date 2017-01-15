import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Table from '../component/table'
import session from '../../service/session'

export default class Current extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			type: 'all'
		}
  };

	render() {
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
								<button type="button" className="am-btn am-btn-default" disabled={session.id() !== 'admin'}><span className="am-icon-plus"></span> 新增</button>
								<button type="button" className="am-btn am-btn-default" disabled={session.id() !== 'admin'}><span className="am-icon-save"></span> 保存</button>
							</div>
						</div>
					</div>
					<div className="am-u-sm-12 am-u-md-3">
						<div className="am-form-group">
							<FormControl componentClass='select' value={this.state.type} onChange={e => { this.setState({ type: e.target.value }); }}>
								<option value="all">所有类别</option>
								<option value="PM">PM</option>
								<option value="Engineer">Engineer</option>
								<option value="Manager">Manager</option>
								<option value="QE">QE</option>
								<option value="Architect">Architect</option>
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
						<Table usertype={this.state.type}/>
					</div>
				</div>
				
    	</div>
		)
	}
}