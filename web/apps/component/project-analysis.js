import React, { PropTypes } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import ProjectClient from '../../service/project-client'
import RiskClient from '../../service/risk-client'
import session from '../../service/session'
import Echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'


export default class Analysis extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			project : null,
			differenceValue : {
				liquidityRatio:0,
				coreDebtDependency:0,
				liquidityGapRate:0,
				costIncomeRatio:0,
				returnOnAssets:0,
				returnOfEquity:0,
				capitalRatio:0,
				coreCapitalRatio:0
			}
		}
  };

	componentDidMount() {
    ProjectClient.fetchProject(this.props.params.id).then(project => {
			let differenceValue = RiskClient.riskAnalysis(project.riskValues);
			this.setState({
				project,
				differenceValue,
				investmentValue: project.value
			})
		});
		
  }


	investmentConfirm() {
		let project = this.state.project;
		project.status = 'invested';
		project.investmentValue = this.state.investmentValue;
		ProjectClient.updateProject(project).then(resp => {
			this.context.router.push('/dcs/invested');
		});
	}
	investmentPause() {
		let project = this.state.project;
		project.status = 'paused';
		ProjectClient.updateProject(project).then(resp => {
			this.context.router.push('/dcs/all');
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
			},
			riskValues: {
				liquidityGapRate: '',
				returnOfEquity: '',
				costIncomeRatio: '',
				returnOnAssets: '',
				coreDebtDependency: '',
				coreCapitalRatio: '',
				liquidityRatio: '',
				capitalRatio: ''
			}
		};
		let differenceValue = this.state.differenceValue;
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

		const riskValueLabel = (value,compare,range) =>{
			if(compare === '>='){
				if(value >= range){
					return (<span style={{ color: 'green' }}>{value+'%'}</span>)
				} else {
					return (<span style={{ color: 'red' }}>{value+'%'}</span>)
				}
			}
			if(compare === '<='){
				if(value <= range){
					return (<span style={{ color: 'green' }}>{value+'%'}</span>)
				} else {
					return (<span style={{ color: 'red' }}>{value+'%'}</span>)
				}
			}
		}

		const chartOption = {
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				x: 'center',
				data:['风险水平','风险抵补']
			},
			radar: [
				{
					indicator: [
						{text: '流动性比例'},
						{text: '核心负债依存度'},
						{text: '流动性缺口率'}
					],
					radius: 80,
					center: ['20%','50%'],
				},
				{
					indicator: [
						{text: '成本收入比'},
						{text: '资产利润率'},
						{text: '资本利润率'},
						{text: '资本充足率'},
						{text: '核心资本充足率'}
					],
					center: ['70%','50%'],
					radius: 80
				}
			],
			series: [
				{
					type: 'radar',
					tooltip: {
						trigger: 'item'
					},
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data: [
						{
							name: '风险水平',
							value: [
								differenceValue.liquidityRatio, 
								differenceValue.coreDebtDependency, 
								differenceValue.liquidityGapRate
							]
						}
					]
				},
				{
					type: 'radar',
					tooltip: {
						trigger: 'item'
					},
					radarIndex: 1,
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data: [
						{
							name:'风险抵补',
							value:[
								differenceValue.costIncomeRatio,
								differenceValue.returnOnAssets,
								differenceValue.returnOfEquity,
								differenceValue.capitalRatio,
								differenceValue.coreCapitalRatio
							]
						}
					]
				}
			]
		};

		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding am-padding-bottom-0">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">项目详情</strong> / <small>{project.name || 'loading...'}</small></div>
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
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-2'}">风险信息<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div id="collapse-panel-2" className="am-in">
								<table className="am-table am-table-bd am-table-bdrs am-table-striped am-table-hover">
									<tbody>
										<tr>
											<th className="am-text-center">风险指标</th>
											<th>风险值</th>
											<th>指标范围</th>
										</tr>
										<tr>
											<td className="am-text-center">流动性比例</td>
											<td>{riskValueLabel(project.riskValues.liquidityRatio,'>=',25)}</td>
											<td>≥25%</td>
										</tr>
										<tr>
											<td className="am-text-center">核心负债依存度</td>
											<td>{riskValueLabel(project.riskValues.coreDebtDependency,'>=',60)}</td>
											<td>≥60%</td>
										</tr>
										<tr>
											<td className="am-text-center">流动性缺口率</td>
											<td>{riskValueLabel(project.riskValues.liquidityGapRate,'>=',-10)}</td>
											<td>≥-10%</td>
										</tr>
										<tr>
											<td className="am-text-center">成本收入比</td>
											<td>{riskValueLabel(project.riskValues.costIncomeRatio,'<=',35)}</td>
											<td>≤35%</td>
										</tr>
										<tr>
											<td className="am-text-center">资产利润率</td>
											<td>{riskValueLabel(project.riskValues.returnOnAssets,'>=',0.6)}</td>
											<td>≥0.6%</td>
										</tr>
										<tr>
											<td className="am-text-center">资本利润率</td>
											<td>{riskValueLabel(project.riskValues.returnOfEquity,'>=',11)}</td>
											<td>≥11%</td>
										</tr>
										<tr>
											<td className="am-text-center">资本充足率</td>
											<td>{riskValueLabel(project.riskValues.capitalRatio,'>=',4)}</td>
											<td>≥4%</td>
										</tr>
										<tr>
											<td className="am-text-center">核心资本充足率</td>
											<td>{riskValueLabel(project.riskValues.coreCapitalRatio,'>=',8)}</td>
											<td>≥8%</td>
										</tr>
									</tbody>
								</table>
            	</div>
						</div>
					</div>

					<div className="am-u-sm-12">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-3'}">风险差值<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div className="am-panel-bd am-collapse am-in" id="collapse-panel-3">
								<ReactEcharts
									option={chartOption} 
									height={300} />
							</div>
						</div>
					</div>

					<div className="am-u-sm-12">
						<div className="am-panel am-panel-default">
							<div className="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-4'}">流动性风险<span className="am-icon-chevron-down am-fr" ></span></div>
							
							<div className="am-panel-bd am-collapse am-in" id="collapse-panel-4">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										投资金额
									</div>
									<div className="am-u-sm-8 am-u-md-4 am-u-end col-end">
										<input type="text" className="am-input-sm" value={this.state.investmentValue || ''} onChange={ e => { this.setState({ investmentValue: e.target.value }); }}/>
									</div>
								</div>
								<div className="am-margin am-btn-group-margin" style={{marginLeft:'80px', marginTop:'30px'}}>
									<button type="button" className="am-btn am-btn-primary am-btn-xs" onClick = {()=>this.investmentConfirm()}>确认投资</button>
									<button type="button" className="am-btn am-btn-default am-btn-xs" style={{marginLeft:'30px'}} onClick = {()=>this.investmentPause()}>暂缓投资</button>
								</div>
							</div>
						</div>
					</div>

				</div>
				
    	</div>
		)
  }
}
Analysis.contextTypes = {
  router: PropTypes.object.isRequired
}