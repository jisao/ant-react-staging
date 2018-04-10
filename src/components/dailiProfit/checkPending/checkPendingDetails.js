//待审核模块
import React from 'react'
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Timeline, Input, Modal, Radio, Upload, notification, Tooltip, Spin, Collapse } from 'antd';
const Panel = Collapse.Panel;//折叠面板
const Step = Steps.Step;//步骤
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import   picUrl from '../../imagesUrl/url.json' 
const { Description } = DescriptionList;
//引入action 方法
import { getCheckPendingDetails, clickNextStep, getFundingOrderDetails } from '../../../redux/actions/acDailiProfit/acCheckPendingDetails'

//返回当前详情页面的type
const filterOrderType = () => {
    if (sessionStorage.getItem("curCheckState")) {
        switch (sessionStorage.getItem("curCheckState")) {
            case "checkPending": return "待审核";
            case "unapprove": return "审核未通过";
            case "checkFail": return "审核失败";
            case "checkSuccess": return "审核通过";
            default: return "";
        }
    }
}

require("./checkPendingDetails.less")

class CheckPendingDetails extends React.Component {
    state = {
        order: {},//当前页待审的对象
        nextBtnDisable: true,//所有的审核按钮默认不可点击,详情页展开之后方可以点击
        unfoldKey: null,//当前默认展开的Key
        loading: false,
        loadingModal: false,//弹窗按钮动态效果
        visible: false,//控制弹窗是否可见
        details: {},
        currentId: null,
        breadcrumbList: [{
            title: '首页',
            href: '#/main/index',
        }, {
            title: `配资审核`,
            href: `#/main/checkPending`,
        }, {
            title: `${filterOrderType()}详情页`,
        }],
        previewVisible: false,//预览框弹出可见与否,默认为不可见
        previewImage: '',//设置预览图片的URL
        itemList: [],//当前订单审核详情
        curStepMsg: "",//点击弹窗当前页的提醒信息
        modalTitle: "",//设置弹窗的标题
        //====================审核流程发送的数据============================
        url: "/flow/audit",//设置请求地址,默认为审核通过
        curStep: "",//当前审核的步骤
        curInstanceId: null,//当前审核单子的id
        uploadImgs: [],
        radioValue: "审核通过",
        fileList: [],

        //===================审核详情======================
        detailsResult: [],//当前请求的审核详情数组
    };
    refresh = () => {
        this.lazyLoading("loading")
        let obj = {
            instanceId: JSON.parse(sessionStorage.getItem("curCheckPending")).instanceId,
        }
        //获取当前页配资详情
        //=====================测试id26 真实id=JSON.parse(sessionStorage.getItem("curCheckPending")).id  请求的地址为/allocation/query
        getFundingOrderDetails(JSON.parse(sessionStorage.getItem("curCheckPending")).id, "/allocation/query", (action) => {
            this.props.dispatch(action)
            if (this.props.fundingOrderDetails.code != 0) {
                Modal.error({
                    title: '提示框',
                    content: `${this.props.fundingOrderDetails.message}`,
                });
            }
            if (this.props.fundingOrderDetails.code == 0) {
                this.setState({
                    detailsResult: this.props.fundingOrderDetails.data.result
                })
                console.log('审核订单详情数据', this.props.fundingOrderDetails.data.result);
            }

        })

        //获取所有的步骤流程
        getCheckPendingDetails(obj, (action) => {
            this.props.dispatch(action)
            console.log("返回的所有订单详情包括code", this.props.cpDetails);
            if (this.props.cpDetails.code != 0) {
                Modal.error({
                    title: '提示框',
                    content: `${this.props.cpDetails.message}`,
                });
            }
            if (this.props.cpDetails.code == 0) {
                this.setState({
                    itemList: this.props.cpDetails.data.instances,//当前审核流程详情
                    unfoldKey: this.props.cpDetails.data.instanceId,//设置当前默认展开的key
                    details: JSON.parse(sessionStorage.getItem("curCheckPending")),//当前订单详情
                    loading: false,//全局懒加载,默认为不加载
                    loadingModal: false,//弹窗按钮动态效果
                    visible: false,//控制弹窗是否可见
                    uploadImgs: [],//上传图片的数组
                    curStepMsg: "",//当前步骤的注意信息
                    curStep: "",//保存当前审核的流程
                    curInstanceId: "",//保存当前审核的id
                    fileList: [],//上传图片文件列表
                })
            }
            console.log("待审核流程数据", this.props.cpDetails.data);
        })
    }
    componentWillMount() {
        if (sessionStorage.getItem("curCheckPending")) {
            this.setState({
                unfoldKey: JSON.parse(sessionStorage.getItem("curCheckPending")).instanceId
            })
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem("curCheckPending")) {

            this.refresh()
        }
    }
    componentWillUnmount() {
        sessionStorage.removeItem("curCheckPending")
    }
    render() {

        let { nextBtnDisable, detailsResult, itemList, breadcrumbList, details, currentId, visible, loadingModal, previewVisible, previewImage, fileList, curStepMsg, unfoldKey, visibleRemark, modalTitle } = this.state

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className="checkPengdingDetails_container">
                <Spin size="large" spinning={this.state.loading}>
                    <PageHeader
                        breadcrumbList={breadcrumbList}
                        content={
                            <Collapse onChange={() => { this.setState({ nextBtnDisable: false }) }}>
                                <Panel header={
                                    <h3 style={{ marginBottom: 0, fontWeight: "bold" }}>配资审核详情页</h3>
                                }>
                                    <Collapse accordion>
                                        {
                                            detailsResult.map((item, index) => {
                                                return (
                                                    <Panel
                                                        key={index}
                                                        header={
                                                            <h3 style={{ marginBottom: 0, fontWeight: "bold" }} className={item.highlight ? 'outerHighlight' : ''}>{item.sectionTitle}</h3>
                                                        }
                                                    >
                                                        {
                                                            this.showOrderItemDetails(item)
                                                        }

                                                    </Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </Panel>
                            </Collapse>
                        } />
                    <div style={{ padding: 20, margin: 20, backgroundColor: "#fff" }}>

                        <Collapse accordion defaultActiveKey={String(unfoldKey)}>
                            {
                                itemList.map((value, i) => {
                                    return (
                                        <Panel header={
                                            <h3 style={{ marginBottom: 0, fontWeight: "bold" }}>{value.title} <small>{value.stateMessage}</small></h3>
                                        } key={String(value.instanceId)}>
                                            <Row>
                                                <Col sm={24} md={10}>
                                                    <Steps direction="vertical">
                                                        {
                                                            value.steps.map((item, index) => {
                                                                return (
                                                                    <Step key={index} style={{ minHeight:120 }} title={item.title} icon={item.auditState == "FAIL" ? <Icon type="warning" style={{ color: "orange", fontSize: 32 }} /> : ""} status={this.filterStepState(item.auditState)}
                                                                        description={
                                                                            <div>
                                                                                <p style={{wordBreak: "break-all"}}>{item.hint}</p>
                                                                                {item.canAudit ? item.auditState == "AUDIT" ? "" : <Button type="primary" disabled={nextBtnDisable} onClick={() => { this.showModal(item.hint, item.step, value.instanceId, "配资审核") }}>确认</Button> : ""}
                                                                            </div>
                                                                        }
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </Steps>
                                                </Col>
                                                <Col sm={24} md={14}>
                                                    <Timeline>
                                                        {
                                                            value.steps.map((item, index) => {
                                                                return (
                                                                    <Timeline.Item style={{ minHeight:120 }} color={this.filterTimeColor(item.auditState)} key={index}>
                                                                        {
                                                                            item.auditState == "AUDIT" || item.auditState == "REJECT" ? <Row>
                                                                                <Col sm={24} md={16}>
                                                                                    <div className="remarkBox" style={{ clear: "both", wordBreak: "break-all" }}>
                                                                                        <div className="handleIcon">
                                                                                            {
                                                                                                item.canAudit ? <span onClick={() => { this.showModal(item.hint, item.step, value.instanceId, "备注修改") }} >
                                                                                                    <Icon type="edit" style={{ margin: "0 4px 0 5px" }} />
                                                                                                </span> : ""
                                                                                            }
                                                                                            <span style={{wordBreak: "break-all"}}><strong>备注</strong>：{item.content}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <p style={{ clear: "both", margin: "1em 0 0 0" }}>
                                                                                        <span style={{ display: "inline-block", width: "35%" }}>审核人员：{item.adminer}</span>
                                                                                        <span>审核时间：{this.formatDate(item.auditTime)}</span>
                                                                                    </p>
                                                                                </Col>
                                                                                <Col offset={1} sm={24} md={7}>
                                                                                    <Upload
                                                                                        action={picUrl.url}
                                                                                        listType="picture-card"
                                                                                        fileList={item.img}
                                                                                        onPreview={this.handlePreview}
                                                                                    >
                                                                                    </Upload>
                                                                                </Col>
                                                                            </Row> : ""
                                                                        }
                                                                    </Timeline.Item>
                                                                )
                                                            })
                                                        }
                                                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelImg} style={{ zIndex: 999 }}>
                                                            <img alt="审核相关图片" style={{ width: '100%' }} src={previewImage} />
                                                        </Modal>
                                                    </Timeline>
                                                </Col>
                                            </Row>
                                        </Panel>
                                    )
                                })
                            }
                        </Collapse>
                    </div>
                    {/* 审核弹窗 */}
                    <Modal
                        visible={visible}
                        title={modalTitle}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" size="large" loading={loadingModal} onClick={this.handleOk}>确定</Button>,
                            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                        ]}

                        style={{ zIndex: 990 }}
                    >
                        <p style={{ paddingBottom: "10px" }}>审核内容：{curStepMsg}</p>
                        <Upload className="modalUpload"
                            action={picUrl.url}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={this.handleChange}
                            onRemove={this.handleRemove}
                            onPreview={this.handlePreview}
                        >
                            {uploadButton}
                        </Upload>
                        <p>审核备注</p>
                        <TextArea className="investigate" ref="investigate" placeholder="请输入你要备注的信息" autosize={{ minRows: 4, maxRows: 4 }} />
                        {
                            modalTitle == "配资审核" ? <RadioGroup name="radiogroup" onChange={this.selectRadio} style={{ lineHeight: "30px" }} value={this.state.radioValue}>
                                <Radio ref="pass" value={"审核通过"}>审核通过</Radio>
                                <Radio ref="nopass" value={"审核不通过"}>审核不通过</Radio>
                            </RadioGroup> : ""
                        }
                    </Modal>
                </Spin>
            </div>
        );

    }

    //==============================================审核详情================================================
    showOrderItemDetails = (orderItem) => {


        return <Collapse accordion onChange={() => { this.setState({ nextBtnDisable: false }) }}>
            {
                orderItem.datas.map((item, index) => {
                    return (
                        <Panel
                            key={index}
                            header={
                                <h3 style={{ marginBottom: 0, fontWeight: "bold" }} className={item.highlight ? 'outerHighlight' : ''}>第{index + 1}条记录</h3>
                            }
                        >
                            {
                                this.showOrderItemDetailsInfo(orderItem.outType, item)
                            }

                        </Panel>
                    )
                })
            }
        </Collapse>

    }
    //订单详情最内层返回的数据
    showOrderItemDetailsInfo = (outType, item) => {
        let data = null;
        switch (outType) {
            case "PEIZI":
                data = <div>
                    <div style={{ borderBottom: '1px solid #d9d9d9', marginBottom: '16px', paddingBottom: "16px" }}>
                        <h2>支付订单号：{item.pay.orderId}</h2>
                        <DescriptionList size="small" col="3">
                            <Description term="订单ID">{item.pay.id}</Description>
                            <Description term="外部订单号">{item.pay.outNo}</Description>
                            <Description term="支付设备">{item.pay.device}</Description>
                            <Description term="支付路径">{this.filterPayWay(item.pay.payWay)}</Description>
                            <Description term="支付状态">{this.filterPayState(item.pay.payState)}</Description>
                            <Description term="总额">{item.pay.amount}</Description>
                            <Description term="支付金额">{item.pay.payAmount}</Description>
                            <Description term="订单支付时间">{this.formatDate(item.pay.payTime)}</Description>
                            <Description term="订单创建时间">{this.formatDate(item.pay.gmtCreate)}</Description>
                            <Description term="订单修改时间">{this.formatDate(item.pay.gmtModified)}</Description>
                        </DescriptionList>
                    </div>
                    <h2>配资订单号：{item.pay.orderId}</h2>
                    <DescriptionList size="small" col="3">
                        <Description term="订单ID">{item.allocation.id}</Description>
                        <Description term="交易ID">{item.allocation.accountId}</Description>
                        <Description term="手机账号">{item.allocation.mobile}</Description>
                        <Description term="手续费">{item.allocation.fee == 0 ? "0" : item.allocation.fee}</Description>
                        <Description term="手续费占比">{item.allocation.feeRate}</Description>
                        <Description term="预存管理费">{item.allocation.prestore}</Description>
                        <Description term="倍数">{item.allocation.multiple}</Description>
                        <Description term="总额">{item.allocation.amount}</Description>
                        <Description term="订单创建时间">{this.formatDate(item.allocation.gmtCreate)}</Description>
                        <Description term="订单修改时间">{this.formatDate(item.allocation.gmtModified)}</Description>
                        <Description term="创业板持仓">{item.allocation.gePercent}</Description>
                        <Description term="主板持仓">{item.allocation.mbPercent}</Description>
                        <Description term="持仓天数">{item.allocation.holdTime}</Description>
                        <Description term="配资类型">{this.filterCheckStype(item.allocation.period)}</Description>
                        <Description term="审核状态">{this.filterOrderState(item.allocation.state)}</Description>
                        <Description term="警戒线">{item.allocation.dangerRate}</Description>
                        <Description term="平仓线">{item.allocation.stopRate}</Description>
                    </DescriptionList>
                </div>
                break;
            case "ADD_BZJ":
                data = <div>
                    <div style={{ borderBottom: '1px solid #d9d9d9', marginBottom: '16px', paddingBottom: "16px" }}>

                        <h2>支付订单号：{item.pay.orderId}</h2>
                        <DescriptionList size="small" col="3">
                            <Description term="订单ID">{item.pay.id}</Description>
                            <Description term="外部订单号">{item.pay.outNo}</Description>
                            <Description term="支付设备">{item.pay.device}</Description>
                            <Description term="支付路径">{this.filterPayWay(item.pay.payWay)}</Description>
                            <Description term="支付状态">{this.filterPayState(item.pay.payState)}</Description>
                            <Description term="总额">{item.pay.amount}</Description>
                            <Description term="支付金额">{item.pay.payAmount}</Description>
                            <Description term="订单支付时间">{this.formatDate(item.pay.payTime)}</Description>
                            <Description term="订单创建时间">{this.formatDate(item.pay.gmtCreate)}</Description>
                            <Description term="订单修改时间">{this.formatDate(item.pay.gmtModified)}</Description>
                        </DescriptionList>
                    </div>
                    <h2>申请订单号：{item.apply.orderId}</h2>
                    <DescriptionList size="small" col="3">
                        <Description term="订单ID">{item.apply.id}</Description>
                        <Description term="交易ID">{item.apply.accountId}</Description>
                        <Description term="申请金额">{item.apply.amount}</Description>
                        <Description term="订单创建时间">{this.formatDate(item.apply.gmtCreate)}</Description>
                        <Description term="订单修改时间">{this.formatDate(item.apply.gmtModified)}</Description>
                        <Description term="审核状态">{this.filterOrderState(item.apply.state)}</Description>
                    </DescriptionList>
                </div>
                    ; break;
            case "STOP_TRADE":
                data = <div>
                    <DescriptionList size="small" col="3">
                        <Description term="订单ID">{item.apply.id}</Description>
                        <Description term="交易ID">{item.apply.accountId}</Description>
                        <Description term="股票账号">{item.apply.stockAccount}</Description>
                        <Description term="申请金额">{item.apply.amount}</Description>
                        <Description term="订单创建时间">{this.formatDate(item.apply.gmtCreate)}</Description>
                        <Description term="订单修改时间">{this.formatDate(item.apply.gmtModified)}</Description>
                        <Description term="审核状态">{this.filterOrderState(item.apply.state)}</Description>
                    </DescriptionList>
                </div>; break;
            case "WITHDRAW":
                data = <div>
                    <DescriptionList size="small" col="3">
                        <Description term="订单ID">{item.apply.id}</Description>
                        <Description term="交易ID">{item.apply.accountId}</Description>
                        <Description term="申请金额">{item.apply.amount}</Description>
                        <Description term="订单创建时间">{this.formatDate(item.apply.gmtCreate)}</Description>
                        <Description term="订单修改时间">{this.formatDate(item.apply.gmtModified)}</Description>
                        <Description term="审核状态">{this.filterOrderState(item.apply.state)}</Description>
                    </DescriptionList>
                </div>
                    ; break;
            default: data = "";
        }
        return data
    }

    //==============================================审核流程弹框======================================================
    //弹出审核框
    showModal = (curStepMsg, curStep, curInstanceId, modalTitle) => {
        this.setState({
            visible: true,
            curStepMsg,//当前弹窗的消息注意事项
            curStep,//保存当前审核的流程
            curInstanceId,//保存当前审核的id
            modalTitle,//设置当前弹框的title
        });
        if (modalTitle == "备注修改") {
            this.setState({
                url: "/flow/append",
                radioValue: ""
            })
        }
        if (modalTitle == "配资审核") {
            this.setState({
                url: "/flow/audit",
                radioValue: "审核通过"
            })
        }

    }
    //点击确认按钮,清空当前多有弹框数据
    handleOk = () => {

        if (!document.querySelector(".investigate").value) {
            this.openNotificationWithIcon("warning", "请输入备注信息")
            return;
        }

        this.setState({ loadingModal: true });
        setTimeout(() => {
            let obj = {
                step: this.state.curStep,
                instanceId: this.state.curInstanceId,
                content: document.querySelector(".investigate").value,
                imgs: this.state.uploadImgs,
                url: this.state.url
            }
            clickNextStep(obj, (action) => {
                this.refresh()
                document.querySelector(".investigate").value = ""
            })
        }, 1000);
    }
    //点击取消按钮,清空当前多有数据
    handleCancel = (info) => {

        document.querySelector(".investigate").value = "";//清空备注
        this.setState({
            // itemList: this.state.itemList,
            visible: false,
            curStep: "",//清空当前审核的流程
            curInstanceId: "",//清空当前审核的id
            fileList: [],//清空上传列表
            uploadImgs: [],//清空图片数组
        })
    }

    //点击单选框,设定请求接口
    selectRadio = (e) => {
        for (let i = 0; i < this.state.itemList.length; i++) {
            for (let j = 0; j < this.state.itemList[i].steps.length; j++) {
                if (this.state.itemList[i].steps[j].id == this.state.itemList[i].currentId) {
                    this.state.itemList[i].steps[j].state = e.target.value;
                }
            }
        }
        switch (e.target.value) {
            case "审核通过": this.setState({ url: "/flow/audit", radioValue: e.target.value }); return;
            case "审核不通过": this.setState({ url: "/flow/reject", radioValue: e.target.value }); return;
        }
    }

    //提醒框公用函数
    openNotificationWithIcon = (type, text) => {
        notification[type]({
            message: '提示框',
            description: text,
        });
    };
    //获取当前时间
    getNowTime = () => {
        let date = new Date()
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    //关闭大图
    handleCancelImg = () => this.setState({ previewVisible: false })

    //点击预览大图,把小图的url地址给大图
    handlePreview = (file) => {

        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    //上传图片
    handleChange = (info) => {

        if (info.file.status === 'done') {
            this.state.uploadImgs.push(info.file.response.data.path)
            console.log(info.file.response.data.path);
            if (info.file.response.code == 0) {
                this.setState({
                    itemList: this.state.itemList
                })
            }
        } else if (info.file.status === 'error') {
            this.openNotificationWithIcon("error", "上传图片失败")
        }
        this.setState({ fileList: info.fileList })
    }
    //点击移除图片按钮
    handleRemove = (info) => {
        for (let i = 0; i < this.state.uploadImgs.length; i++) {
            if (this.state.uploadImgs[i] == info.response.data.path) {
                this.state.uploadImgs.splice(i, 1)
                break;
            }
        }
        this.setState({
            uploadImgs: this.state.uploadImgs
        })
    }

    //点击编辑按钮
    clickAudit = (id) => {
        for (let i = 0; i < this.state.itemList.length; i++) {
            for (let j = 0; j < this.state.itemList[i].steps.length; j++) {
                if (this.state.itemList[i].steps[j].id == id) {
                    this.state.itemList[i].steps[j].canAudit = true;
                    this.setState({
                        itemList: this.state.itemList
                    })
                    break;
                }
            }
        }
    }

    // 点击保存按钮
    clickSave = (id) => {
        this.lazyLoading("loading")
        for (let i = 0; i < this.state.itemList.length; i++) {
            for (let j = 0; j < this.state.itemList[i].steps.length; j++) {
                if (this.state.itemList[i].steps[j].id == id) {
                    this.state.itemList[i].steps[j].canAudit = false;
                    this.setState({
                        itemList: this.state.itemList
                    })
                    break;
                }
            }
        }
    }

    //懒加载动画公用效果
    lazyLoading(type) {
        this.setState({
            [type]: true,
        })

        setTimeout(() => {
            this.setState({
                [type]: false,
            })
        }, 1500);
    }

    //转换时间戳
    formatDate = (time) => {
        let now = new Date(time)
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        if (month < 10) {
            month = "0" + month
        }
        if (date < 10) {
            date = "0" + date
        }
        if (hour < 10) {
            hour = "0" + hour
        }
        if (minute < 10) {
            minute = "0" + minute
        }
        if (second < 10) {
            second = "0" + second
        }
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    //返回订单状态
    filterOrderState = (state) => {
        switch (state) {
            case "WAIT": return "新建";
            case "AUDITING": return "审核中";
            case "TRADE": return "配资交易中";
            case "JIEQING": return "结清";
            default: return "";
        }
    }
    //返回支付方式
    filterPayWay = (payWay) => {
        switch (payWay) {
            case "JIUPAI": return "九派支付";
            case "RECEIPT": return "三方转账";
            default: return "";
        }
    }
    //返回步骤栏的样式
    filterStepState = (text) => {
        switch (text) {
            case "AUDIT": return "finish";
            case "REJECT": return "error";
            case "FAIL": return "";
            default: return "";
        }
    }
    //返回支付状态
    filterPayState = (payState) => {
        switch (payState) {
            case "WAIT": return "等待支付";
            case "PAY": return "支付完成";
            case "RECEIPT": return "转账待确认";
            case "AMOUNT_ERROR": return "金额错误";
            default: return "";
        }
    }
    //返回配资的类型
    filterCheckStype = (type) => {
        switch (type) {
            case "DAY": return "天";
            case "MONTH": return "月";
            case "NEW": return "新";
            default: return "";
        }
    }

    //返回时间轴的颜色
    filterTimeColor = (text) => {
        switch (text) {
            case "NEW": return "#E9E9E9";
            case "AUDIT": return "green";
            case "REJECT": return "red";
            default: return "";
        }
    }

}

function filterCpDetails(store) {
    return {
        cpDetails: store.cpDetails,
        nextStepRes: store.nextStepRes,
        fundingOrderDetails: store.fundingOrderDetails
    }
}

export default connect(filterCpDetails)(CheckPendingDetails)