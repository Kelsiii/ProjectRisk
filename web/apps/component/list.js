import React, { PropTypes } from 'react'

export default class List extends React.Component {
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
			<table className="am-table am-table-bd am-table-striped admin-content-table">
				<thead>
					{this.state.head}
				</thead>
				<tbody>
					{this.state.rows}
				</tbody>
			</table>
		)
	}
}
