import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import ProjectClient from '../../service/project-client'
import RiskClient from '../../service/risk-client'
import session from '../../service/session'

export default class Check extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			project : null
		}
  };

	componentDidMount() {
    ProjectClient.fetchProject(this.props.params.id).then(project => {
			this.setState({
				project
			})
		});
  }


	passCheck() {
		let project = this.state.project;
		let riskValues = RiskClient.riskCalculator(project);
		project.status = 'evaluating';
		project.owner = session.id();
		ProjectClient.updateProject(project).then(resp => {
			this.context.router.push('/mkt/my');
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
			<div className="admin-content-body">
				<div className="am-cf am-padding am-padding-bottom-0">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">项目详情</strong> / <small>{project.name || 'loading...'}</small></div>
					<button type="button" className="am-btn am-btn-secondary am-btn-xs am-fr" style={{display:session.type() === 'mkt'? 'block':'none'}}
									onClick={()=>{this.passCheck()}}>审核通过</button>
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
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										投资金额
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.investmentValue || '无'}
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
										{industry}
									</div>
								</div>
								
								<div className="am-g am-margin-top-sm">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										项目描述
									</div>
									<div className="am-u-sm-8 am-u-md-9">
										{project.description}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										负责人
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.contactor}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										联系方式
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										{project.contact}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-3 am-text-right">
										附件
									</div>
									<div className="am-u-sm-8 am-u-md-9 am-u-end col-end">
										<a>下载附件</a>
									</div>
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
										{project.liquidityRisk.liquidAssets || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										流动性负债
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.liquidityRisk.currentLiabilities || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										核心负债
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.liquidityRisk.coreLiabilities || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										总负债
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.liquidityRisk.totalLiabilities || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										流动性缺口
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.liquidityRisk.liquidGap || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										90天内到期表内外资产
									</div>
									<div className="am-u-sm-8 am-u-md-7 am-u-end col-end">
										{project.liquidityRisk.assets90 || ''}
									</div>
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
										{project.profitability.operatingExpenses || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										营业收入
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.profitability.operatingReceipt || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										净利润
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.profitability.retainedProfits || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										资产平均余额
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.profitability.averageAssets || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-5 am-text-right">
										所有者权益平均余额
									</div>
									<div className="am-u-sm-8 am-u-md-7">
										{project.profitability.averageProfits || ''}
									</div>
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
										{project.capitalAdequacy.netCapital || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-4 am-text-right">
										核心资本净额
									</div>
									<div className="am-u-sm-8 am-u-md-8">
										{project.capitalAdequacy.coreNetCapital || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-4 am-text-right">
										风险加权资产
									</div>
									<div className="am-u-sm-8 am-u-md-8">
										{project.capitalAdequacy.riskWeightedAssets || ''}
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-4 am-text-right">
										市场风险资本
									</div>
									<div className="am-u-sm-8 am-u-md-8">
										{project.capitalAdequacy.marketRiskAssets || ''}
									</div>
								</div>

							</div>
						</div>
					</div>

				</div>
				
    	</div>
		)
  }
}
Check.contextTypes = {
  router: PropTypes.object.isRequired
}