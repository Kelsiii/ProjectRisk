import ElasticSearch from 'elasticsearch'
import { host } from '../utils'

const client = new ElasticSearch.Client({
  host: `${host()}/service/es`
});

export default {
	riskCalculator(project){
		let liquidityRatio = this.Percentage(project.liquidityRisk.liquidAssets, project.liquidityRisk.currentLiabilities);
		let coreDebtDependency = this.Percentage(project.liquidityRisk.coreLiabilities, project.liquidityRisk.totalLiabilities);
		let liquidityGapRate = this.Percentage(project.liquidityRisk.liquidGap, project.liquidityRisk.assets90);

		let costIncomeRatio = this.Percentage(project.profitability.operatingExpenses, project.profitability.operatingReceipt);
		let returnOnAssets = this.Percentage(project.profitability.retainedProfits, project.profitability.averageAssets);
		let returnOfEquity = this.Percentage(project.profitability.retainedProfits, project.profitability.averageProfits);

		let capitalRatio = this.Percentage(project.capitalAdequacy.netCapital, 
			(Number(project.capitalAdequacy.riskWeightedAssets) + 12.5*project.capitalAdequacy.marketRiskAssets));
		let coreCapitalRatio = this.Percentage(project.capitalAdequacy.coreNetCapital, 
			(Number(project.capitalAdequacy.riskWeightedAssets) + 12.5*project.capitalAdequacy.marketRiskAssets));

		return {
			liquidityRatio,
			coreDebtDependency,
			liquidityGapRate,
			costIncomeRatio,
			returnOnAssets,
			returnOfEquity,
			capitalRatio,
			coreCapitalRatio
		}
		
	},

	Percentage(number1, number2) { 
		return (Math.round(number1 / number2 * 10000) / 100.00);// 小数点后两位百分比
	},

	highRisk(values){
		if(values.liquidityRatio < 25){
			return true;
		} else if(values.coreDebtDependency < 60){
			return true;
		} else if(values.liquidityGapRate < -10){
			return true;
		} else if(values.costIncomeRatio > 35){
			return true;
		} else if(values.returnOnAssets < 0.6){
			return true;
		} else if(values.returnOfEquity < 11){
			return true;
		} else if(values.capitalRatio < 8){
			return true;
		} else if(values.coreCapitalRatio < 4){
			return true;
		} else{
			return false;
		}
	}
}