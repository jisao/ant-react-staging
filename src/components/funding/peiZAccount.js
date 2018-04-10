import React from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge, Tag, notification } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { ChartCard, yuan, Pie, } from 'ant-design-pro/lib/Charts';
// import { Chart, Tooltip, Axis, Legend, Pie, Coord } from 'viser-react';
import { getPeiZAccountList,getcheckPeiZ,changePeiZ,checkLogList } from "../../redux/actions/acFunding/acPeiZAccount";


// require("./fundingAccount.less")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
// const rowSelection = {
//     type: 'radio',
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
// };

//定义系统设置的资源码
const systemSetup = [
    { name: '配资账户-查看配资情况按钮', bool: false },
]

class PeiZAccount extends React.Component {
    state = {
        systemSetupData:[],
        // 用户权限的数组
        data: [],
        searchId: '',
        personAccount: '',
        uid: '',
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '用户管理',
            }, {
                title: '配资账户',
            }],
        columns: [
            {
                title: "账号",
                dataIndex: 'mobile',
            },
            {
                title: "UID",
                dataIndex: 'id',
            }, 
            {
                title: "姓名",
                dataIndex: 'realName',
            }, 
            {
                title: "昵称",
                dataIndex: "alias",
            }, 
            {
                title: "总平台成本",
                dataIndex: "allPltFeeByUser",
            }, 
            {
                title: "管理费汇总",
                dataIndex: "allManagerFee",
            }, 
            {
                title: "待收",
                dataIndex: "daiShou",
            }, 
            {
                title: "已收",
                dataIndex: "yiShou",
            }, 
            {
                title: "应收",
                dataIndex: "yingShou",
            }, 
            {
                title: "预收",
                dataIndex: "yuShou",
            }, 
            {
                title: "操作",
                key:'action',
                render:(record)=>
                <div>
                     <a onClick={()=>{this.checkLog(record.mobile)}}>登录日志</a>
                        &nbsp;&nbsp;  {systemSetup[0].bool ?<span>|</span>:''}&nbsp;&nbsp;
                    {systemSetup[0].bool ?<a onClick={()=>{this.checkPeiZ(record)}}>查看配资情况</a>:''}
                </div>,
            }, 
            ],
        itemList: [],
        tab2itemList:[],
        changePeiZId:256,
        loading: false,
        
        pMsg:'',
        changeOk:true,
        tab2columns:[
            // {
            //     title:'id',
            //     dataIndex: "id",
            // },
            {
                title:'类型',
                dataIndex: "type",
                render:(text)=>
                <div>{
                    text ==  "MONTH" ? <span>月</span>: text ==  "NEW" ? <span>新手体验</span>: text ==  "DAY" ? <span>天</span>:<span>{text}</span>
                }</div>
            },
            // {
            //     title:'uuid',
            //     dataIndex: "uuid",
            // },
            {
                title:'倍数',
                dataIndex: "multiple",
                
            },
            {
                title:'管理费率',
                dataIndex: "feeRate",
                render:(text,record)=>
                <Input  onBlur={(value)=>{this.changeInput(value,'feeRate',record)}} style={{width:70,border:'none'}} defaultValue={text}/>
            },
            {
                title:'主板持仓',
                dataIndex: "mbPercent",
                render:(text,record)=>
                <Input onBlur={(value)=>{this.changeInput(value,'mbPercent',record)}} style={{width:70,border:'none'}} defaultValue={text}/>
            },
      
            {
                title:'创业板持仓',
                dataIndex: "gePercent",
                render:(text,record)=>
                <Input onBlur={(value)=>{this.changeInput(value,'gePercent',record)}} style={{width:70,border:'none'}} defaultValue={text}/>
            },
            {
                title:'单票持仓',
                dataIndex: "signalPercent",
                render:(text,record)=>
                <Input onBlur={(value)=>{this.changeInput(value,'signalPercent',record)}} style={{width:70,border:'none'}} defaultValue={text}/>
            },      {
                title:'警戒线',
                dataIndex: "dangerRate",
                render:(text,record)=>
                <Input onBlur={(value)=>{this.changeInput(value,'dangerRate',record)}} style={{width:70,border:'none'}} defaultValue={text}/>
            },
            {
                title:'止损线',
                dataIndex: "stopRate",
                render:(text,record)=>
                <Input onBlur={(value)=>{this.changeInput(value,'stopRate',record)}} style={{width:70,border:'none'}} defaultValue={text}/>
            },
            // {
            //     title:'gmtCreate',
            //     dataIndex: "gmtCreate",
            // },
            // {
            //     title:'gmtModified',
            //     dataIndex: "gmtModified",
            // },
        ],
        titleMsg:'',        
        modalvisible:false,


        checkLogId:256,
        titleMsg1: '',
        modalvisible1: false,
        tabsActiveKey:'1',


        columns1:[
            {
                title: "登录时间",
                dataIndex: 'gmtCreate',
                render: (text) =>
                <div>{this.formatDate(text)}</div>
            },
            {
                title: "IP地址",
                dataIndex: 'ip',
            },
            {
                title: "登录成功",
                dataIndex: 'state',
                render:(text)=>
                <div>{text == 'SUCCESS'?<div>成功</div>:text == 'FAIL'?<div>失败</div>:<div>{text}</div>}</div>
            },
        ],

        itemList1: [],
        loading1: false,
        pagination1: {
            current: 1,
            pageSize: 10,
            total: 0
        },


        itemList2: [],
        loading2: false,
        pagination2: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        
    }
    //换页
    handleTableChange = (pagination) => {
        console.log(pagination)
        this.setState({ loading: true });
        getPeiZAccountList(pagination.current, pagination.pageSize, this.state.searchId, this.state.personAccount, this.state.uid, (action) => {
            this.props.dispatch(action)
            if (this.props.peiZAccountList.code == 0) {
                console.log(this.props.peiZAccountList)
                this.setState({
                    loading: false,
                    itemList: this.props.peiZAccountList.data.result,
                    pagination: {
                        current: this.props.peiZAccountList.data.pageNo,
                        total: this.props.peiZAccountList.data.total,
                        pageSize: this.props.peiZAccountList.data.pageSize,
                    }

                })
            } else {
                this.setState({ loading: false });
            }
        })

    };


    
    //打开登录日志
    checkLog = (record)=>{
        console.log(record)
        this.setState({
            modalvisible1:true,
            titleMsg1:`账号${record}登录日志`,
            checkLogId:record
        })
        checkLogList(record,'APP',1,10,(action)=>{
            this.props.dispatch(action)
            console.log(this.props.peiZAccountList.data)
            this.setState({
                itemList1:this.props.peiZAccountList.data.result,
                pagination1: {
                    current:this.props.peiZAccountList.data.pageNo,
                    total: this.props.peiZAccountList.data.total,
                    pageSize: this.props.peiZAccountList.data.pageSize,

                }
            })
        })
        checkLogList(record,'FINANCE',1,10,(action)=>{
            this.props.dispatch(action)
            console.log(this.props.peiZAccountList.data)
            this.setState({
                itemList2:this.props.peiZAccountList.data.result,
                pagination2: {
                    current:this.props.peiZAccountList.data.pageNo,
                    total: this.props.peiZAccountList.data.total,
                    pageSize: this.props.peiZAccountList.data.pageSize,

                }
            })
        })
    }

    render() {
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="配资账户"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    // tabList={this.state.tabList}
                    content={
                        <div>
                            <Input ref='mobile' style={{ width: "20%", marginRight: 20 }} type='text' placeholder='请输入配资账号' />
                            <Input ref='uid' style={{ width: "20%", marginRight: 20 }} type='text' placeholder='请输入用户ID' />
                            <Input ref='account' style={{ width: "20%", marginRight: 20 }} type='text' placeholder='请输入交易账号' />
                            <Button style={{ marginTop: 1, marginRight: 20 }} type='primary' onClick={this.goSearch}>查询</Button>
                            <Button onClick={this.goRefresh}>重置</Button>
                        </div>
                    }
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                    onTabChange={this.onTabChange}
                />
                <div className="tableBox tableBox1">
                            <Table columns={this.state.columns} pagination={this.state.pagination} dataSource={this.state.itemList} rowKey={record => record.id}
                                loading={this.state.loading}
                                bordered
                                onChange={this.handleTableChange}
                                expandedRowRender={record => 
                                    <div>
                                        <div>{this.expandedRowRender(record.personRsts)}</div>
                                    </div>

                                }
                            />
                            <Modal
                                width='70%'
                                 title={this.state.titleMsg}
                                 visible={this.state.modalvisible}
                                 onOk={this.modalOK}
                                 onCancel={this.modalCa}
                            >
                                <Table columns={this.state.tab2columns}  dataSource={this.state.tab2itemList} rowKey={record => record.id}
                                        loading={this.state.tab2loading}
                                        bordered
                                        pagination={false}
                                    />
                                <p style={{color:'red',textAlign:'right',fontSize:16,margin:'6px 0'}}>{this.state.pMsg}</p>
                            </Modal>
                            

                            <Modal
                                width='55%'
                                 title={this.state.titleMsg1}
                                 visible={this.state.modalvisible1}
                                 onOk={this.modalOK1}
                                 onCancel={this.modalCa1}
                            >
                                <Tabs defaultActiveKey="1" type="card" activeKey={this.state.tabsActiveKey} onChange={this.tabsOnChange}>
                                    <TabPane tab='移动端' key="1">
                                        <Table columns={this.state.columns1}  dataSource={this.state.itemList1} rowKey={record => record.id}
                                            loading={this.state.loading1}
                                            bordered
                                            onChange={this.handleTableChange1}
                                            pagination={this.state.pagination1}
                                        />
                                    </TabPane>
                                    <TabPane tab='网页端' key="2">
                                        <Table columns={this.state.columns1}  dataSource={this.state.itemList2} rowKey={record => record.id}
                                            loading={this.state.loading2}
                                            bordered
                                            onChange={this.handleTableChange2}
                                            pagination={this.state.pagination2}
                                        />
                                    </TabPane>
                                </Tabs>
                            </Modal>


                </div >
            </div>
        )

    }

      //换页登录日志
        handleTableChange1 = (pagination) => {
            // console.log(pagination)
            this.setState({ loading1: true });
            setTimeout(() => {
                checkLogList(this.state.checkLogId,'APP',pagination.current, pagination.pageSize, (action) => {
                    this.props.dispatch(action);
                    console.log(this.props.peiZAccountList)
                    this.setState({
                        itemList1: this.props.peiZAccountList.data.result,
                        pagination1: {
                            current:this.props.peiZAccountList.data.pageNo,
                            total: this.props.peiZAccountList.data.total,
                            pageSize: this.props.peiZAccountList.data.pageSize,

                        }
                    });
                })
                this.setState({ loading1: false });
            }, 200);

        };
        handleTableChange2 = (pagination) => {
            // console.log(pagination)
            this.setState({ loading2: true });
            setTimeout(() => {
                checkLogList(this.state.checkLogId,'FINANCE',pagination.current, pagination.pageSize, (action) => {
                    this.props.dispatch(action);
                    console.log(this.props.peiZAccountList)
                    this.setState({
                        itemList2: this.props.peiZAccountList.data.result,
                        pagination2: {
                            current:this.props.peiZAccountList.data.pageNo,
                            total: this.props.peiZAccountList.data.total,
                            pageSize: this.props.peiZAccountList.data.pageSize,

                        }
                    });
                })
                this.setState({ loading2: false });
            }, 200);

        };


    modalCa1 = () => {
        this.setState({
            modalvisible1: false,
        })
    }
    modalOK1 = () => {
        this.setState({
            modalvisible1: false,
        })
    }

    changeInput = (e,text,record)=>{
        // console.log(record)
        console.log(text)
        // console.log(e.target.value)
        let value =  e.target.value
        let reg = /^0(\.[0-9]{0,})$/
        if(text == 'feeRate'||text =='mbPercent'||text =='gePercent'||text =='signalPercent'){
            if(reg.test(value)&&value != 0){
                this.setState({
                    changeOk:true,
                    pMsg:' '
                })
            }else{
                this.setState({
                    changeOk:false,
                    pMsg:'修改有误！'
                })
                return
            }
        }

        record[text] = JSON.parse(value)
        // console.log(record)
        let item = this.state.tab2itemList
        for(let obj of item){
            if(obj.id ==record.id){
                obj = record
            }
        }
        // console.log(item)
        this.setState({
            tab2itemList:item
        })

    }

    modalOK = () =>{
        // console.log(this.state.tab2itemList)
        if(this.state.changeOk){
            changePeiZ(this.state.tab2itemList,this.state.changePeiZId,(action)=>{
                this.props.dispatch(action)
                if(this.props.peiZAccountList.code == 0){
                    this.setState({
                        modalvisible:false,
                        tab2itemList: this.props.peiZAccountList.data.result,
                    })
                    this.refresh()
                }else{
                    console.log(this.props.peiZAccountList)
                }
            })
        }
    }
    modalCa = () =>{
        this.setState({modalvisible:false,tab2itemList:[],changeOk:true,pMsg:''})
    }

    //切换tabs
    tabsOnChange = (key) => {
        if (key == "1") {
            this.setState({
                tabsActiveKey: "1"
            });
        } else {
            this.setState({
                tabsActiveKey: "2"
            });
        }
    }
    //点击查看配资情况
    checkPeiZ = (record) =>{
        this.setState({modalvisible: true,titleMsg:`账号${record.mobile}配资情况`,changePeiZId:record.id})
        getcheckPeiZ(record.id,(action)=>{
            this.props.dispatch(action)
            if(this.props.peiZAccountList.code == 0){
                this.setState({
                    tab2itemList: this.props.peiZAccountList.data.result,
                })
            }
        })

    }
    refresh = () => {
        let searchId = '';
        let personAccount = '';
        let uid = '';
        this.setState({ loading: true });
        getPeiZAccountList(1, this.state.pagination.pageSize, searchId, personAccount, uid, (action) => {
            this.props.dispatch(action)
            if (this.props.peiZAccountList.code == 0) {
                console.log(this.props.peiZAccountList)
                this.setState({
                    loading: false,
                    itemList: this.props.peiZAccountList.data.result,
                    pagination: {
                        total: this.props.peiZAccountList.data.total,
                        pageSize: this.props.peiZAccountList.data.pageSize,
                    }

                })
            } else {
                notification.open({
                    message: '警告',
                    description: this.props.peiZAccountList.message,
                });
                this.setState({ loading: false });
            }
        })
    }

    // 初始化获取权限
    componentWillMount() {
        this.setState({
            systemSetupData: sessionStorage.item ? JSON.parse(sessionStorage.item).data.userPermiss : []
        })
    }

    componentDidMount() {
        let arr = this.state.systemSetupData
        for (let i = 0; i < systemSetup.length; i++) {
            if (arr.indexOf(systemSetup[i].name) != -1) {
                systemSetup[i].bool = true
            } else {
                systemSetup[i].bool = false
            }
        }
        this.refresh()
    }

   
    //下面两个都是生成子的TABLE
    expandedRowRender = (personRsts) => {
        const columnss = [
            {
                title: "账号",
                dataIndex: 'account',
                render: (text, record) =>
                    <div>
                        <span style={{ marginRight: 8 }}>{record.account}</span>
                        {/* <Tag color="cyan">证券账户：{record.stockAccount}</Tag> */}
                        <Tag color="geekblue">{record.period == "DAY" ? <span>天</span> : record.period == "MONTH" ? <span>月</span> : record.period == "NEW" ? <span>新手体验</span> : <span>{record.period}</span>}</Tag>
                        <Tag color="purple">{record.multiple}倍</Tag>
                    </div>
            },
            {
                title: "证券账户",
                dataIndex: 'stockAccount',
            },
            {
                title: "总金额",
                dataIndex: 'allAmount',
            },
            {
                title: "初始投入",
                dataIndex: "initial",
            },
            {
                title: "可用余额",
                dataIndex: "balance",
            },
            {
                title: "买入冻结",
                dataIndex: "buyBlock",
            },
            {
                title: "警戒线",
                dataIndex: "danger",
            },
            {
                title: "止损线",
                dataIndex: "stop",
            },
            {
                title: "创业板持仓",
                dataIndex: "gePercent",
            },
          
            {
                title: "单票持仓",
                dataIndex: "signalPercent",
            },
            {
                title: "平仓状态",
                dataIndex: "stopState",
                render: (text) =>
                    <div>{text == 'NORMAL' ? <div>正常</div> : text == 'WILL_STOP' ? <div>准备平仓</div> : text == 'STOP_BEGIN' ? <div>开始平仓</div> : text == 'STOPING' ? <div>平仓中</div> : text == 'STOP' ? <div>完成平仓</div> : text == 'AUDIT' ? <div>结清审核</div> : <div>{text}</div>}</div>
            },
            // {
            //     title: "activeTime",
            //     dataIndex: "activeTime",
            // },
            {
                title: "手续费率",
                dataIndex: "feePercent",
            },

            {
                title: "管理费状态",
                dataIndex: "feeState",
                render: (text) =>
                    // <div>{text == 'NORMAL'?<div>正常</div>:text == 'ABNORMAL'?<div>异常</div>:<div>{text}</div>}</div>
                    text == "NORMAL" ? <Badge status="success" text={'正常'} /> : text == 'ABNORMAL' ? <Badge status="error" text={'异常'} /> : <div>{text}</div>
            },
            {
                title: "状态",
                dataIndex: "state",
                render: (text) =>
                    <div>{
                        text == "WAIT" ? <div>新增</div> :
                            (text == "RUNNING" ? <div>交易中</div> :
                                text == "STOP_BEGIN" ? <div>开始平仓</div> :
                                    text == "STOPING" ? <div>平仓中</div> :
                                        text == "STOP" ? <div>平仓完成</div> :
                                            text == "BLOCK" ? <div>冻结状态</div> : <div>{text}</div>)
                    }
                    </div>
            },
            {
                title: "自动平仓",
                dataIndex: 'autoOut',
                render: (text) =>
                    <div>{
                        text == "YES" ? <div>是</div> : <div>否</div>
                    }
                    </div>
            },
            {
                title: "平台成本",
                dataIndex: "allPltFee",
            },
        ]

        return (
            <Table
                rowKey={record => record.account}
                columns={columnss}
                dataSource={personRsts}
                pagination={false}
            />
        )
    }
    goSearch = () => {
        let searchId = this.refs.mobile.input.value
        let personAccount = this.refs.account.input.value
        let uid = this.refs.uid.input.value
        this.setState({ loading: true, searchId, personAccount, uid });
        getPeiZAccountList(1, this.state.pagination.pageSize, searchId, personAccount, uid, (action) => {
            this.props.dispatch(action)
            console.log(this.props.peiZAccountList)
            if (this.props.peiZAccountList.code == 0) {
                this.setState({
                    loading: false,
                    itemList: this.props.peiZAccountList.data.result,
                    pagination: {
                        total: this.props.peiZAccountList.data.total,
                        pageSize: this.props.peiZAccountList.data.pageSize,
                    }

                })
            } else {
                notification.open({
                    message: '警告',
                    description: this.props.peiZAccountList.message,
                });
                this.setState({ loading: false });
            }
        })
    }

    goRefresh = () => {
        this.refs.mobile.input.value = ''
        this.refs.account.input.value = ''
        this.refs.uid.input.value = ''
        this.setState({
            searchId: '',
            personAccount: '',
            uid: '',
        })
        this.refresh()
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

}

function filtersecurityManage(store) {
    console.log(store);
    return {
        peiZAccountList: store.peiZAccountList
    }
}

export default connect(filtersecurityManage)(PeiZAccount)
