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
			company: session.id(),
			companyName: session.username(),
			contact: '',
			contactor: '',
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
			company: this.state.company,
			companyName: this.state.companyName,
			contact: this.state.contact,
			contactor: this.state.contactor,
			description: this.state.description,
			'created' : now.toLocaleDateString().replace(/\//g,"-")+' '+now.toTimeString().substring(0,8),
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
			}
		};
		Client.addProject(project).then(resp => {
			if(resp.created === true){
				alert('创建成功');
				this.context.router.push('/cstm/unfinished');
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
							<form className="am-form">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										项目名称
									</div>
									<div className="am-u-sm-8 am-u-md-8 am-u-lg-4 am-u-end col-end">
										<input type="text" className="am-input-sm" onChange={ e => { this.setState({ name: e.target.value }); }}/>
									</div>
								</div>
								
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										申报金额
									</div>
									<div className="am-u-sm-8 am-u-md-8 am-u-lg-4 am-u-end col-end">
										<input type="text" className="am-input-sm" onChange={ e => { this.setState({ value: e.target.value }); }}/>
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										申报企业
									</div>
									<div className="am-u-sm-8 am-u-md-10 am-u-lg-6 am-u-end col-end">
										<input type="text" className="am-input-sm" value={this.state.companyName} disabled />
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">所属行业</div>
									<div className="am-u-sm-8 am-u-md-10 am-lg-10">
										<FormGroup controlId='spec'>
										<FormControl componentClass='select' value={this.state.industry} style={ {width: '310px', fontSize: '15px'} }
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

							</form>
						</div>

						<div className="am-tab-panel am-fade" id="tab2">
							<form className="am-form">
								
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										负责人
									</div>
									<div className="am-u-sm-8 am-u-md-4 am-u-end col-end">
										<input type="text" className="am-input-sm" onChange={ e => { this.setState({ contactor: e.target.value }); }}/>
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