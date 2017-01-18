import React, { PropTypes } from 'react'
import List from '../component/list'

export default class Current extends React.Component {
  constructor(props) {
    super(props);
  };

	render() {
		return (
			<div className="admin-content-body">
				<div className="am-cf am-padding">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">项目</strong> / <small>进行中</small></div>
				</div>

				<div className="am-g">
					<div className="am-u-sm-12">
						<List type='current'/>
					</div>
				</div>
			</div>
		)
	}
}