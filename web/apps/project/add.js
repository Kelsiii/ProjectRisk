import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import session from '../../service/session'
import Client from '../../service/project-client'

export default class Adder extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			name : '',
			industry : 'finance',
			value: 0,
			status: 'unfinished',
			date: '',
			owner: session.username(),
			contact: '',
			description: ''
		}
  };

	handleAdd(){
		let now = new Date();
		let project = {
			id : Date.now().toString(36),
			name : this.state.name,
			industry : this.state.industry,
			value: this.state.value,
			status: this.state.status,
			date: this.state.date,
			owner: this.state.owner,
			contact: this.state.contact,
			description: this.state.description,
			'created' : now.toLocaleDateString().replace(/\//g,"-")+' '+now.toTimeString().substring(0,8)
		};
		Client.addProject(project).then(resp => {
			if(resp.created === true){
				alert('创建成功');
				this.context.router.push('/all');
			}
			
		});

	}

	render() {
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding">
					<div className="am-fl am-cf">
						<strong className="am-text-primary am-text-lg">项目</strong> / <small>新建</small>
					</div>
				</div>
				<hr/>
				<div className="am-tabs am-margin" data-am-tabs>
					<ul className="am-tabs-nav am-nav am-nav-tabs">
						<li className="am-active"><a href="#tab1">基本信息</a></li>
						<li><a href="#tab2">详细描述</a></li>
					</ul>

					<div className="am-tabs-bd">
						<div className="am-tab-panel am-fade am-in am-active" id="tab1">
							<div className="am-g am-margin-top">
								<div className="am-u-sm-4 am-u-md-2 am-text-right">
									项目名称
								</div>
								<div className="am-u-sm-8 am-u-md-5 am-u-lg-3">
									<input type="text" className="am-input-lg" onChange={ e => { this.setState({ name: e.target.value }); }}/>
								</div>
							</div>
							
							<div className="am-g am-margin-top">
								<div className="am-u-sm-4 am-u-md-2 am-text-right">
									申报金额
								</div>
								<div className="am-u-sm-8 am-u-md-5 am-u-lg-3">
									<input type="text" className="am-input-lg" onChange={ e => { this.setState({ value: e.target.value }); }}/>
								</div>
							</div>

							<div className="am-g am-margin-top">
								<div className="am-u-sm-4 am-u-md-2 am-text-right">所属行业</div>
								<div className="am-u-sm-8 am-u-md-10 am-lg-10">
									<FormGroup controlId='spec'>
									<FormControl componentClass='select' value={this.state.industry} style={ {width: '150px'} }
									onChange={e => { this.setState({ industry: e.target.value }); }}>
										<option value="finance">金融证券</option>
										<option value="technology">高新技术</option>
										<option value="energy">新能源</option>
										<option value="IT">信息产业</option>
										<option value="entertainment">文体娱乐</option>
										<option value="education">教育</option>
										<option value="foreign">外资合作</option>
									</FormControl>
								</FormGroup>
									
								</div>
							</div>

							<div className="am-g am-margin-top">
								<div className="am-u-sm-4 am-u-md-2 am-text-right">
									启动日期
								</div>
								<div className="am-u-sm-8 am-u-md-10">
									<form action="" className="am-form am-form-inline">
										<div className="am-form-group am-form-icon">
											<i className="am-icon-calendar"></i>
											<input type="date" className="am-form-field am-input-sm" placeholder="日期" onChange={ e => { this.setState({ date: e.target.value }); }}/>
										</div>
									</form>
								</div>
							</div>

						</div>

						<div className="am-tab-panel am-fade" id="tab2">
							<form className="am-form">
								
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										负责人
									</div>
									<div className="am-u-sm-8 am-u-md-4 am-u-end col-end">
										<input type="text" className="am-input-sm" value={this.state.owner} onChange={ e => { this.setState({ owner: e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										联系方式
									</div>
									<div className="am-u-sm-8 am-u-md-4 am-u-end col-end">
										<input type="text" className="am-input-sm" onChange={ e => { this.setState({ contact: e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top-sm">
									<div className="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
										项目描述
									</div>
									<div className="am-u-sm-12 am-u-md-10">
										<textarea rows="10" placeholder="" onChange={ e => { this.setState({ description: e.target.value }); }}></textarea>
									</div>
								</div>

							</form>
						</div>

					</div>
			</div>
				<div className="am-margin am-btn-group-margin">
					<button type="button" className="am-btn am-btn-primary am-btn-xs" disabled={this.state.name === ''} onClick = {()=>this.handleAdd()}>提交保存</button>
					<button type="button" className="am-btn am-btn-primary am-btn-xs">放弃保存</button>
				</div>
			</div>
		)
	}
}
Adder.contextTypes = {
  router: PropTypes.object.isRequired
}