import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import Client from '../../service/project-client'
import session from '../../service/session'

export default class Project extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			project : null
		}
  };

	componentDidMount() {
    Client.fetchProject(this.props.params.id).then(project => {
			this.setState({
				project
			})
		});
  }

	handleProjectUpdate() {
		let project = this.state.project;
		if(this.state.description){
			project.description = this.state.description;
		}
		if(this.state.type){
			project.type = this.state.type;
		}
		if(this.state.contact){
			project.contact = this.state.contact;
		}
		if(this.state.contactor){
			project.contactor = this.state.contactor;
		}
		Client.updateProject(project).then(resp => {
			alert('修改成功！');
		});

	}

	handleLiquidityRiskUpdate() {
		let liquidityRisk = {
			liquidAssets: this.state.liquidAssets || 0,
			currentLiabilities: this.state.currentLiabilities || 0,
			coreLiabilities: this.state.coreLiabilities || 0,
			totalLiabilities: this.state.totalLiabilities || 0,
			liquidGap: this.state.liquidGap || 0,
			assets90: this.state.assets90 || 0
		}
		let project = this.state.project;
		project.liquidityRisk = liquidityRisk;
		Client.updateProject(project).then(resp => {
			alert('修改成功！');
		});
	}

	handleProfitabilityUpdate() {
		let profitability = {
			operatingExpenses: this.state.operatingExpenses || 0,
			operatingReceipt: this.state.operatingReceipt || 0,
			retainedProfits: this.state.retainedProfits || 0,
			averageAssets: this.state.averageAssets || 0,
			averageProfits: this.state.averageProfits || 0
		}
		let project = this.state.project;
		project.profitability = profitability;
		Client.updateProject(project).then(resp => {
			alert('修改成功！');
		});
	}

	handleCapitalAdequacyUpdate() {
		let capitalAdequacy = {
			netCapital: this.state.netCapital || 0,
			coreNetCapital: this.state.coreNetCapital || 0,
			riskWeightedAssets: this.state.riskWeightedAssets || 0,
			marketRiskAssets: this.state.marketRiskAssets || 0
		}
		let project = this.state.project;
		project.capitalAdequacy = capitalAdequacy;
		Client.updateProject(project).then(resp => {
			alert('修改成功！');
		});
	}

	render() {
		const project = this.state.project || {
			liquidityRisk: {
				liquidAssets: '',
				currentLiabilities: '',
				coreLiabilities: '',
				totalLiabilities: '',
				liquidGap: '',
				assets90: ''
			},
			profitability: {
				operatingExpenses: '',
				operatingReceipt: '',
				retainedProfits: '',
				averageAssets: '',
				averageProfits: ''
			},
			capitalAdequacy: {
				netCapital: '',
				coreNetCapital: '',
				riskWeightedAssets: '',
				marketRiskAssets: ''
			}};
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
			case 'unqualified':
				status = '风险过高'
				break;
			default:
				status = 'unknown'
				break;
		}
			
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding am-padding-bottom-0">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">项目完善</strong> / <small>{project.name || 'loading...'}</small></div>
				</div>

				<hr/>

				<div className="am-g">
					<div className="am-u-sm-6">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-1'}">基本信息<span className="am-icon-chevron-down am-fr" ></span></div>
							
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
										申报企业
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.companyName || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										申报金额
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.value || '无'}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">项目状态</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{status}
									</div>
								</div>
								
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">所属类别</div>
									<div className="am-u-sm-8 am-u-md-9 am-lg-10">
										<FormGroup controlId='spec'>
											<FormControl componentClass='select' value={this.state.industry || project.industry || 'finance'} style={ {width: '280px', fontSize: '15px'} }
											onChange={e => { this.setState({ industry: e.target.value }); }}>
												<option value="finance">金融业</option>
												<option value="technology">科学研究/技术服务</option>
												<option value="construction">建筑/房地产/租赁和商务服务</option>
												<option value="agriculture">农、林、牧、渔业</option>
												<option value="manufacturing">制造业</option>
												<option value="energy">电力、热力、燃气及水生产和供应</option>
												<option value="IT">信息传输/软件/信息技术服务</option>
												<option value="entertainment">文化/体育/娱乐</option>
												<option value="education">教育</option>
												<option value="foreign">外资合作</option>
												<option value="others">其他</option>
											</FormControl>
										</FormGroup>
									</div>
								</div>
								
								<div className="am-g am-margin-top-sm">
									<div className="am-u-sm-4 am-u-md-3 am-text-right admin-form-text">
										项目描述
									</div>
									<div className="am-u-sm-8 am-u-md-9">
										<textarea rows="20" style={{width:"80%"}} placeholder="" 
										 value={this.state.description || project.description || ''}
										 onChange={ e => { this.setState({ description: e.target.value }); }}></textarea>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										负责人
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										<input type="text" className="am-input-sm" value={this.state.contactor || project.contactor || ''}
										 onChange={ e => { this.setState({ contactor: e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										联系方式
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										<input type="text" className="am-input-sm" value={this.state.contact || project.contact || ''}
										 onChange={ e => { this.setState({ contactor: e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										添加附件
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										<form className="am-form">
											<div className="am-form-group">
												<input type="file" id="user-pic"/>
											</div>
										</form>
									</div>
								</div>

								

								<div className="am-margin am-btn-group-margin" >
									<button type="button" className="am-btn am-btn-primary am-btn-xs" 
									disabled={!(project.status==='unfinished' || project.status==='unchecked')} onClick = {()=>{this.handleProjectUpdate()}}>提交修改</button>
									<button type="button" className="am-btn am-btn-primary am-btn-xs">放弃修改</button>
								</div>
							</div>
						</div>
					</div>
					

					<div className="am-u-sm-6">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-2'}">流动性风险<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div className="am-panel-bd am-collapse am-in" id="collapse-panel-2">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										流动性资产
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.liquidAssets || project.liquidityRisk.liquidAssets || ''}
										onChange={ e => { this.setState({ liquidAssets : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										流动性负债
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.currentLiabilities || project.liquidityRisk.currentLiabilities || ''}
										onChange={ e => { this.setState({ currentLiabilities : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										核心负债
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.coreLiabilities || project.liquidityRisk.coreLiabilities || ''}
										onChange={ e => { this.setState({ coreLiabilities : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										总负债
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.totalLiabilities || project.liquidityRisk.totalLiabilities || ''}
										onChange={ e => { this.setState({ totalLiabilities : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										流动性缺口
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.liquidGap || project.liquidityRisk.liquidGap || ''}
										onChange={ e => { this.setState({ liquidGap : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										90天内到期表内外资产
									</div>
									<div className="am-u-sm-8 am-u-md-7 am-u-end col-end">
										<input type="text" className="am-input-sm" 
										value={this.state.assets90 || project.liquidityRisk.assets90 || ''}
										onChange={ e => { this.setState({ assets90 : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-margin" style={{padding: "0 270px"}}>
									<button type="button" className="am-btn am-btn-primary am-btn-xs" onClick={()=>{this.handleLiquidityRiskUpdate()}}>提交保存</button>
								</div>
							</div>
						</div>
					</div>

					<div className="am-u-sm-6">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-3'}">盈利能力<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div className="am-panel-bd am-collapse am-in" id="collapse-panel-3">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										营业费用
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.operatingExpenses || project.profitability.liquidAssets || ''}
										onChange={ e => { this.setState({ operatingExpenses : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										营业收入
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.operatingReceipt || project.profitability.operatingReceipt || ''}
										onChange={ e => { this.setState({ operatingReceipt : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										净利润
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.retainedProfits || project.profitability.retainedProfits || ''}
										onChange={ e => { this.setState({ retainedProfits : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										资产平均余额
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.averageAssets || project.profitability.averageAssets || ''}
										onChange={ e => { this.setState({ averageAssets : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										所有者权益平均余额
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										<input type="text" className="am-input-sm" 
										value={this.state.averageProfits || project.profitability.averageProfits || ''}
										onChange={ e => { this.setState({ averageProfits : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-margin" style={{padding: "0 270px"}}>
									<button type="button" className="am-btn am-btn-primary am-btn-xs" onClick={()=>{this.handleProfitabilityUpdate()}}>提交保存</button>
								</div>
							</div>
						</div>
					</div>

					<div className="am-u-sm-6">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-4'}">资本充足程度<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div className="am-panel-bd am-collapse am-in" id="collapse-panel-4">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-4 am-text-right">
										资本净额
									</div>
									<div className="am-u-sm-8 am-u-md-8">
										<input type="text" className="am-input-sm" 
										value={this.state.netCapital || project.capitalAdequacy.netCapital || ''}
										onChange={ e => { this.setState({ netCapital : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-4 am-text-right">
										核心资本净额
									</div>
									<div className="am-u-sm-8 am-u-md-8">
										<input type="text" className="am-input-sm" 
										value={this.state.coreNetCapital || project.capitalAdequacy.coreNetCapital || ''}
										onChange={ e => { this.setState({ coreNetCapital : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-4 am-text-right">
										风险加权资产
									</div>
									<div className="am-u-sm-8 am-u-md-8">
										<input type="text" className="am-input-sm" 
										value={this.state.riskWeightedAssets || project.capitalAdequacy.riskWeightedAssets || ''}
										onChange={ e => { this.setState({ riskWeightedAssets : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-4 am-text-right">
										市场风险资本
									</div>
									<div className="am-u-sm-8 am-u-md-8">
										<input type="text" className="am-input-sm" 
										value={this.state.marketRiskAssets || project.capitalAdequacy.marketRiskAssets || ''}
										onChange={ e => { this.setState({ marketRiskAssets : e.target.value }); }}/>
									</div>
								</div>

								<div className="am-margin" style={{padding: "0 225px"}}>
									<button type="button" className="am-btn am-btn-primary am-btn-xs" onClick={()=>{this.handleAdd()}}>提交保存</button>
								</div>
							</div>
						</div>
					</div>

				</div>
				
    	</div>
		)
  }
}