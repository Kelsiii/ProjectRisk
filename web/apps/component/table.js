import React, { PropTypes } from 'react'

export default class Table extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			rows : props.rows,
			head : props.head
		}
  };

	componentWillReceiveProps(nextProps) {
    this.setState({
			rows: nextProps.rows,
			head: nextProps.head
		})
  }

	render() {
		
		return (
			<form className="am-form">
				<table className="am-table am-table-striped am-table-hover table-main">
					<thead>
						{this.state.head}
					</thead>
					<tbody>
						{this.state.rows}
					</tbody>
				</table>
				<div className="am-cf">
					共 {this.state.rows.length} 条记录
					
				</div>
			</form>
		)
	}
}