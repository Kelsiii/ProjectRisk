import React, { PropTypes } from 'react'

export default class Console extends React.Component {
  constructor(props) {
    super(props);
  };

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
								<div className="am-u-sm-4 am-u-md-2 am-text-right">所属类别</div>
								<div className="am-u-sm-8 am-u-md-10">
									<select data-am-selected="{btnSize: 'sm'}">
										<option value="option1">选项一...</option>
										<option value="option2">选项二.....</option>
										<option value="option3">选项三........</option>
									</select>
								</div>
							</div>

							<div className="am-g am-margin-top">
								<div className="am-u-sm-4 am-u-md-2 am-text-right">项目状态</div>
								<div className="am-u-sm-8 am-u-md-10">
									<div className="am-btn-group" data-am-button>
										<label className="am-btn am-btn-default am-btn-xs">
											<input type="radio" name="options" id="option1" /> 未启动
										</label>
										<label className="am-btn am-btn-default am-btn-xs">
											<input type="radio" name="options" id="option2" /> 进行中
										</label>
										<label className="am-btn am-btn-default am-btn-xs">
											<input type="radio" name="options" id="option3" /> 暂停
										</label>
										<label className="am-btn am-btn-default am-btn-xs">
											<input type="radio" name="options" id="option4" /> 中止
										</label>
										<label className="am-btn am-btn-default am-btn-xs">
											<input type="radio" name="options" id="option5" /> 完成
										</label>
									</div>
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
											<input type="date" className="am-form-field am-input-sm" placeholder="日期" />
										</div>
									</form>
								</div>
							</div>

						</div>

						<div className="am-tab-panel am-fade" id="tab2">
							<form className="am-form">
								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										项目名称
									</div>
									<div className="am-u-sm-8 am-u-md-4">
										<input type="text" className="am-input-sm" />
									</div>
									<div className="am-hide-sm-only am-u-md-6">*必填，不可重复</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										负责人
									</div>
									<div className="am-u-sm-8 am-u-md-4 am-u-end col-end">
										<input type="text" className="am-input-sm" />
									</div>
								</div>

								<div className="am-g am-margin-top">
									<div className="am-u-sm-4 am-u-md-2 am-text-right">
										团队
									</div>
									<div className="am-u-sm-8 am-u-md-4">
										<input type="text" className="am-input-sm" />
									</div>
									<div className="am-hide-sm-only am-u-md-6">选填</div>
								</div>

								<div className="am-g am-margin-top-sm">
									<div className="am-u-sm-12 am-u-md-2 am-text-right admin-form-text">
										项目描述
									</div>
									<div className="am-u-sm-12 am-u-md-10">
										<textarea rows="10" placeholder=""></textarea>
									</div>
								</div>

							</form>
						</div>

					</div>
    		</div>
				<div className="am-margin">
					<button type="button" className="am-btn am-btn-primary am-btn-xs">提交保存</button>
					<button type="button" className="am-btn am-btn-primary am-btn-xs">放弃保存</button>
				</div>
			</div>
		)
	}
}
