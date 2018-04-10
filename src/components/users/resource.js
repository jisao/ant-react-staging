import React from "react";
import { connect } from 'react-redux'
import { Tree, Button, Icon, Modal, Input } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getResourceList, addResource, changeResource, removeResource } from "../../redux/actions/acUsers/acResource";

const TreeNode = Tree.TreeNode;

class resource extends React.Component {

    state = {
        Msg: '',
        titleMsg: "",
        spanMsg: "",
        doing: '',
        modalvisible: false,
        modalvisible1: false,
        modalvisible2: false,
        breadcrumbList: [{
            title: '首页',
            href: '#/main/index',
        }, {
            title: '系统设置',
        }, {
            title: '资源管理',
        }],
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData: [],
        item: {},
        flag: true,
    }
    //下面4个函数都是构建树结构的
    onExpand = (expandedKeys) => {
        // console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onCheck = (checkedKeys) => {
        // console.log(checkedKeys.checked);
        this.setState({ checkedKeys: checkedKeys.checked });
    }
    onSelect = (selectedKeys, info) => {
        console.log(info.node.props)
        let id = info.node.props.id ? info.node.props.id : info.node.props.dataRef.id
        this.setState({
            item: {
                key: info.node.props.eventKey,
                title: info.node.props.title,
                id: id,
                requestUrl: info.node.props.requestUrl
                // ? info.node.props.requestUrl : info.node.props.dataRef.requestUrl 
            }
        })

        this.setState({ selectedKeys });
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={<div style={{ fontWeight: "900", fontSize: "14px" }}><Icon type="bars" />{item.title}</div>} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} title={<div><Icon type="file-text" />{item.title}</div>} />;
        })

    }

    render() {
        return (

            <div>
                <PageHeader
                    title="资源管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content={
                        <div>
                            <Button onClick={this.creatdRe} style={{ marginRight: '5px' }}>创建</Button>
                            <Button onClick={this.addRe} style={{ marginRight: '5px' }}>添加</Button>
                            <Button onClick={this.changeRe} style={{ marginRight: '5px' }}>修改</Button>
                            <Button onClick={this.removeRe}>删除</Button>
                        </div>
                    }
                    action={
                        <div className="action">
                        </div>}
                    extraContent={<div className="extraContent"></div>}
                // onTabChange={this.onTabChange}
                />
                <div className="tableBox ">

                    <Tree
                        // checkable
                        // showIcon={true}
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                        // checkStrictly={true}
                        showLine={true}
                    >
                        {this.renderTreeNodes(this.state.treeData ? this.state.treeData : [])}
                    </Tree>
                    <Modal
                        title="警告"
                        visible={this.state.modalvisible}
                        onOk={this.state.item.id ? this.delReBtn : this.modalCa}
                        onCancel={this.modalCa}
                    >
                        <p>{this.state.Msg}</p>

                    </Modal>
                    <Modal
                        title={this.state.titleMsg}
                        visible={this.state.modalvisible1}
                        onOk={this.modalOK}
                        onCancel={this.modalCa1}
                    >
                        <p><label>资源名称：</label><Input style={{ width: "66%", margin: "4px 0" }} ref='reName' size="large" type="text" placeholder="" /><span style={{ color: "red" }}>{this.state.spanMsg}</span></p>
                        <p><label>资源标识：</label><Input style={{ width: "66%", margin: "4px 0" }} ref='reKey' size="large" type="text" placeholder="" /><span style={{ color: "red" }}>{this.state.spanMsg}</span></p>
                        <p><label>资源链接：</label><Input style={{ width: "66%", margin: "4px 0" }} ref='requestUrl' size="large" type="text" placeholder="" /></p>
                    </Modal>
                    <Modal
                        title="警告"
                        visible={this.state.modalvisible2}
                        onOk={this.modalCa}
                        onCancel={this.modalCa}
                    >
                        <p>{this.state.Msg}</p>

                    </Modal>
                </div>
            </div>
        )
    }
    refresh = () => {
        getResourceList((action) => {
            this.props.dispatch(action)
            // console.log(this.props.resourceList.data.result)
            this.setState({
                treeData: this.props.resourceList.data.result
            })
        })
    }
    componentDidMount() {
        this.refresh()
    }
    //点击添加资源
    addRe = () => {
        if (this.state.item.id) {
            let item = this.state.item
            // console.log(item)
            this.setState({
                modalvisible1: true,
                titleMsg: `在${item.title.props.children[1]}资源下添加子资源：`,
                doing: "添加"
            })

        } else {
            this.setState({
                modalvisible: true,
                Msg: '请正确的选择一个资源点进行操作'
            })
        }
    }
    //点击在根节点添加资源
    creatdRe = () => {
        this.setState({
            modalvisible1: true,
            titleMsg: `添加根节点资源：`,
            doing: "创建"
        })
    }
    //点击修改资源
    changeRe = () => {
        console.log(this)
        if (this.state.item.id) {
            let item = this.state.item

            setTimeout(() => {
                this.setState({
                    modalvisible1: true,
                    titleMsg: `修改${item.title.props.children[1]}资源：`,
                    doing: "修改"
                })
                this.refs.reKey.input.value = item.key
                this.refs.reName.input.value = item.title.props.children[1]
                this.refs.requestUrl.input.value = item.requestUrl ? item.requestUrl : ''
            }, 200);

        } else {
            this.setState({
                modalvisible: true,
                Msg: '请正确的选择一个资源点进行操作'
            })
        }
    }
    //点击删除资源
    removeRe = () => {
        if (this.state.item.id) {
            this.setState({
                modalvisible: true,
                Msg: `您确认删除${this.state.item.title.props.children[1]}资源？`
            })

        } else {
            this.setState({
                modalvisible: true,
                Msg: '请正确的选择一个资源点进行操作'
            })
        }
    }
    //点击取消按钮后
    modalCa = () => {
        this.setState({
            modalvisible: false,
            modalvisible2: false,
        })
    }
    //点击取消按钮后（对应不同的medal）
    modalCa1 = () => {
        this.refs.reKey.input.value = ''
        this.refs.reName.input.value = ''
        this.refs.requestUrl.input.value = ''
        this.setState({
            modalvisible: false,
            modalvisible1: false,
            spanMsg: ''
        })
    }
    ///点击确定
    modalOK = () => {
        //设定flag是为了让每个输入框都有值
        let flag = false
        let item = {
            url: this.refs.reKey.input.value,
            urlName: this.refs.reName.input.value,
            parentId: this.state.item.id ? this.state.item.id : "0"
        }
        for (let key in item) {
            // console.log(item[key])
            if (!item[key]) {
                flag = true

            }
        }
        if (flag) {
            this.setState({
                spanMsg: '必填'
            })
        } else {
            //在添加时的操作
            if (this.state.doing == "添加") {
                item.requestUrl = this.refs.requestUrl.input.value
                addResource(item, (action) => {
                    this.props.dispatch(action)
                    if (this.props.resourceList.code > 0) {
                        this.setState({
                            modalvisible2: true,
                            Msg: this.props.resourceList.message
                        })
                    }

                    this.modalCa1()
                    this.refresh()
                })
                //在修改时的操作
            } else if (this.state.doing == "修改") {
                // console.log(item)
                item.requestUrl = this.refs.requestUrl.input.value
                changeResource(item, (action) => {
                    this.props.dispatch(action)
                    if (this.props.resourceList.code > 0) {
                        this.setState({
                            modalvisible2: true,
                            Msg: this.props.resourceList.message
                        })

                    }
                    this.modalCa1()
                    this.refresh()
                })
                //在创建时的操作
            } else if (this.state.doing == "创建") {
                item.parentId = 0
                item.requestUrl = this.refs.requestUrl.input.value
                addResource(item, (action) => {
                    this.props.dispatch(action)
                    if (this.props.resourceList.code > 0) {
                        this.setState({
                            modalvisible2: true,
                            Msg: this.props.resourceList.message
                        })

                    }
                    this.modalCa1()
                    this.refresh()
                })
            }
        }
    }
    //同一个模型，在创建的时候确定键的操作
    delReBtn = () => {
        // console.log(this.state.item)
        removeResource(this.state.item, (action) => {
            this.props.dispatch(action)
            this.modalCa()
            this.refresh()
        })
    }
}


function filterResourceList(store) {
    return {
        resourceList: store.resourceList
    }
}

export default connect(filterResourceList)(resource)
