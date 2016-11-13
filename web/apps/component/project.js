import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Client from '../../service/client'
import session from '../../service/session'

export default class Project extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			project : null,
			risks : [],
			possibility : 'high',
			incidence : 'high',
			showEditor : -1
		}
  };

	componentDidMount() {
    Client.fetchProject(this.props.params.id).then(project => {
			this.setState({
				project
			})
		});
		Client.fetchRisks(this.props.params.id).then(risks => {
			this.setState({
				risks
			})
		})
  }

	handleProjectUpdate() {
		let project = this.state.project;
		if(this.state.description){
			project.description = this.state.description;
		}
		if(this.state.type){
			project.type = this.state.type;
		}
		if(this.state.status){
			project.status = this.state.status;
		}
		if(this.state.date){
			project.date = this.state.date;
		}
		Client.updateProject(project).then(resp => {
			alert('修改成功！');
		});

	}

	handleAdd(){
		let now = new Date();
		let project = this.state.project;
		let risk = {
			id : project.id+Date.now().toString(36),
			created : now.toLocaleDateString().replace(/\//g,"-")+' '+now.toTimeString().substring(0,8),
			updated : now.toLocaleDateString().replace(/\//g,"-")+' '+now.toTimeString().substring(0,8),
			submitter : session.username(),
			threshold : this.state.threshold || '',
			tracer: this.state.tracer || '',
			incidence: this.state.incidence || '',
			possibility: this.state.possibility || '',
			projectId: project.id,
			content: this.state.riskContent,
			riskStatus: '',
			isDone: false
		};
		let num = project.riskNum;
		project.riskNum = num + 1;
		Client.addRisk(risk).then(resp => {
			if(resp.created === true){
				Client.updateProject(project).then(resp => {
					alert('创建成功');
					Client.fetchRisks(this.props.params.id).then(risks => {
						this.setState({
							risks,
							riskContent: '',
							possibility: 'high',
							incidence: 'high',
							tracer: '',
							threshold: ''
						})
					});
				});
			}
		});
	}

	handleRiskStatus(id){
		let self = this;
		let now = new Date();
		let status = {
			id,
			riskStatus: this.state.riskStatus || '',
			tracer: session.username(),
			updated : now.toLocaleDateString().replace(/\//g,"-")+' '+now.toTimeString().substring(0,8)
		}
		Client.updateRisk(status).then(resp => {
			setTimeout(function() {
				Client.fetchRisks(self.state.project.id).then(risks => {
					self.setState({
						risks,
						riskStatus: '',
						showEditor: -1
					})
				})
			}, 1000);
		})
	}

	deleteRisk(id){
		let self = this;
		let now = new Date();
		let project = this.state.project;
		let num = project.riskNum;
		project.riskNum = num - 1;
		let status = {
			id,
			isDone: true,
			tracer: session.username(),
			updated : now.toLocaleDateString().replace(/\//g,"-")+' '+now.toTimeString().substring(0,8)
		}
		Client.updateRisk(status).then(resp => {
			Client.updateProject(project).then(resp => {
				setTimeout(function() {
					Client.fetchRisks(self.state.project.id).then(risks => {
						console.log(risks);
						self.setState({
							risks,
							riskStatus: '',
							showEditor: -1
						})
					})
				}, 1000);
			})
		})
	}

	render() {
		const project = this.state.project || {};
		const risks = this.state.risks || [];
		const statusBtns = ['unopend','underway','paused','canceled','completed'].map(status =>{
			let classes = 'am-btn am-btn-default am-btn-xs ';
			if(status === project.status){
				classes = classes + 'am-active';
			}
			let cnstatus;
			switch (status) {
				case 'unopend':
					cnstatus = '未启动'
					break;
				case 'underway':
					cnstatus = '进行中'
					break;
				case 'paused':
					cnstatus = '暂停'
					break;
				case 'canceled':
					cnstatus = '取消'
					break;
				case 'completed':
					cnstatus = '完成'
					break;
				default:
					cnstatus = 'unknown'
					break;
			}
			
			return (
				<button className={classes} key={status} onClick={()=>{this.setState({status})}}>
					<input type="radio" name="options" id="unopend"/> {cnstatus}
				</button>
			)
		});
		const possibilityBtns = ['high','medium','low'].map(possibility => {
			let classes = 'am-btn am-btn-default am-btn-xs ';
			if(possibility === this.state.possibility){
				classes = classes + 'am-active';
			}
			let possibilityCN;
			switch (possibility){
				case 'high':
					possibilityCN = '高';
					break;
				case 'medium':
					possibilityCN = '中';
					break;
				case 'low':
					possibilityCN = '低';
					break;
				default:
					break;
			}
			return (
				<button key={`possibility-${possibility}`} className={classes} onClick = {() => {this.setState({ possibility})}}>
					<input type="radio" name="options" id="high"/> {possibilityCN}
				</button>
			)
		});
		const incidenceBtns = ['high','medium','low'].map(incidence => {
			let classes = 'am-btn am-btn-default am-btn-xs ';
			if(incidence === this.state.incidence){
				classes = classes + 'am-active';
			}
			let incidenceCN;
			switch (incidence){
				case 'high':
					incidenceCN = '高';
					break;
				case 'medium':
					incidenceCN = '中';
					break;
				case 'low':
					incidenceCN = '低';
					break;
				default:
					break;
			}
			return (
				<button key={`incidence-${incidence}`} className={classes} onClick = {() => {this.setState({ incidence })}}>
					<input type="radio" name="options" id="high"/> {incidenceCN}
				</button>
			)
		});

		const rows = risks.map((risk,i) => {
			if(!risk.isDone){
				let possibilityCN;
				switch (risk.possibility){
					case 'high':
						possibilityCN = '高';
						break;
					case 'medium':
						possibilityCN = '中';
						break;
					case 'low':
						possibilityCN = '低';
						break;
					default:
						break;
				}
				let incidenceCN;
				switch (risk.incidence){
					case 'high':
						incidenceCN = '高';
						break;
					case 'medium':
						incidenceCN = '中';
						break;
					case 'low':
						incidenceCN = '低';
						break;
					default:
						break;
				}
				let status;
				
				if(risk.riskStatus && risk.riskStatus !== '' && (!risk.isDone) && this.state.showEditor !== i){
					status = (
						<div className="am-comment">
							<strong href="#" className="am-comment-avatar" style={{width:'60px', height:'60px'}}>风险状态</strong>
							<div className="am-comment-main">
								<header className="am-comment-hd">
									<div className="am-comment-meta"><a href="#" className="am-comment-author">{risk.tracer}</a> 更新于 <time>{risk.updated}</time></div>
								</header>
								<div className="am-comment-bd">
									<p>{risk.riskStatus}</p>
								</div>
							</div>
						</div>
					)
				}
				return (
					<li key={'risk'+i}>
						<strong><span className="am-icon-asterisk"></span> {risk.content}</strong>
						<div className="admin-task-meta"> Posted on {risk.created} by {risk.submitter}</div>
						<div className="admin-task-bd">
							<p className="user-info-order">
								可能性：<strong>{possibilityCN}</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								影响程度: <strong>{incidenceCN}</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								触发器/阈值：<strong>{risk.threshold}</strong>
							</p>
							{status}
							<textarea placeholder="风险状态描述" rows="4" style={{width: '100%',display: this.state.showEditor === i ? '': 'none'}}
								
								onChange={ e => { this.setState({ riskStatus: e.target.value }); }}></textarea>
							
						</div>
						<div className="am-cf">
							<div className="am-btn-toolbar am-fl">
								<div className="am-btn-group am-btn-group-xs">
									<button type="button" className="am-btn am-btn-default" 
										onClick={()=>{
											if(this.state.showEditor === i){
												this.handleRiskStatus(risk.id);
											}
										}}>
										<span className="am-icon-check"></span></button>
									<button type="button" className="am-btn am-btn-default" onClick={()=>{this.setState({showEditor:i})}}><span className="am-icon-pencil"></span></button>
									<button type="button" className="am-btn am-btn-default" onClick={()=>{this.setState({showEditor:-1})}}><span className="am-icon-times"></span></button>
								</div>
							</div>
							<div className="am-fr">
								<button type="button" className="am-btn am-btn-default am-btn-xs" onClick={()=>{this.deleteRisk(risk.id);}}>删除</button>
							</div>
						</div>
					</li>
				)
			}
		});
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding am-padding-bottom-0">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">项目</strong> / <small>{project.name || 'loading...'}</small></div>
				</div>

				<hr/>

				<div className="am-g">
					<div className="am-u-sm-6">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-1'}">项目详情<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div className="am-panel-bd am-collapse am-in" id="collapse-panel-1">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										项目名称
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.name || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										负责人
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.owner || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										团队
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.team || '无'}
									</div>
								</div>

								<div className="am-g am-margin-top-sm">
									<div className="am-u-sm-4 am-u-md-3 am-text-right admin-form-text">
										项目描述
									</div>
									<div className="am-u-sm-8 am-u-md-9">
										<textarea rows="6" style={{width:"80%"}} placeholder="" 
										 value={this.state.description || project.description || ''}
										 onChange={ e => { this.setState({ description: e.target.value }); }}></textarea>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">所属类别</div>
									<div className="am-u-sm-8 am-u-md-9 am-lg-10">
										<FormGroup controlId='spec'>
											<FormControl componentClass='select' value={this.state.type || project.type || 'product'} style={ {width: '150px'} }
											onChange={e => { this.setState({ type: e.target.value }); }}>
												<option value="product">业务产品</option>
												<option value="infrastructure">基础架构</option>
												<option value="refactor">系统重构</option>
												<option value="business_intelligence">商业智能</option>
												<option value="user_experience">用户体验</option>
											</FormControl>
										</FormGroup>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">项目状态</div>
									<div className="am-u-sm-8 am-u-md-9">
										<div className="am-btn-group" data-am-button>
											{statusBtns}
										</div>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										启动日期
									</div>
									<div className="am-u-sm-8 am-u-md-9">
										<form action="" className="am-form am-form-inline">
											<div className="am-form-group am-form-icon">
												<i className="am-icon-calendar"></i>
												<input type="date" className="am-form-field am-input-sm" placeholder="日期" 
												 value={this.state.date || project.date || ''} 
												 onChange={ e => { this.setState({ date: e.target.value }); }}/>
											</div>
										</form>
									</div>
								</div>

								<div className="am-margin am-btn-group-margin" >
									<button type="button" className="am-btn am-btn-primary am-btn-xs" onClick = {()=>{this.handleProjectUpdate()}}>提交修改</button>
									<button type="button" className="am-btn am-btn-primary am-btn-xs">放弃修改</button>
								</div>
							</div>
						</div>
					</div>

					<div className="am-u-sm-6">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-2'}">添加风险<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div className="am-panel-bd am-collapse am-in" id="collapse-panel-2">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										风险内容
									</div>
									<div className="am-u-sm-8 am-u-md-5">
										<input type="text" className="am-input-sm" value={this.state.riskContent || ''} onChange={ e => { this.setState({ riskContent: e.target.value })}}/>
									</div>
									<div className="am-hide-sm-only am-u-md-4">*必填，不可重复</div>
								</div>
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">可能性</div>
									<div className="am-u-sm-8 am-u-md-9">
										<div className="am-btn-group" data-am-button>
											{possibilityBtns}
										</div>
									</div>
								</div>
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">影响程度</div>
									<div className="am-u-sm-8 am-u-md-9">
										<div className="am-btn-group" data-am-button>
											{incidenceBtns}
										</div>
									</div>
								</div>
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										触发器/阈值
									</div>
									<div className="am-u-sm-8 am-u-md-9">
										<input type="text" className="am-input-sm" value={this.state.threshold || ''} onChange={ e => { this.setState({ threshold: e.target.value })}}/>
									</div>
								</div>
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										跟踪者
									</div>
									<div className="am-u-sm-8 am-u-md-9">
										<input type="text" className="am-input-sm" value={this.state.tracer || ''} onChange={ e => { this.setState({ tracer: e.target.value })}}/>
									</div>
								</div>


								<div className="am-margin" style={{padding: "0 5%"}}>
									<button type="button" className="am-btn am-btn-primary am-btn-xs" onClick={()=>{this.handleAdd()}}>提交保存</button>
								</div>
							</div>
						</div>
					</div>

					<div className="am-u-sm-12">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-4'}">现有风险<span className="am-icon-chevron-down am-fr" ></span></div>
							<div id="collapse-panel-4" className="am-panel-bd am-collapse am-in">
								<ul className="am-list admin-content-task">
									{rows}
								</ul>
							</div>
						</div>
					</div>

				</div>
				
    	</div>
		)
  }
}