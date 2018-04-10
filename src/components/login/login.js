//天天盈待审核模块
import React from 'react'
import { Table, Button, Input, Modal, Radio, Form, Icon, Checkbox } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { connect } from 'react-redux'

require("./login.less")
const FormItem = Form.Item;


import { getCode, loginIn } from "../../redux/actions/acLogin/acLogin";

const arr = ["000","000-0","000-1","001"]

const dataId = '000'
class Login1 extends React.Component {

    state = {
        show: false,
        canI:false,
        msg: '',
       
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                let getData = {
                    uid: this.props.codeList.uid,
                    code: values.code,
                    userName: values.userName,
                    passwd: values.password,
                }
                // console.log(getData)
                loginIn(getData, (action) => {
                    this.props.dispatch(action)
                    // console.log(this.props)
                    let item = this.props.dispatch(action).data.data
                    if (item.code > 0) {
                        this.setState({
                            show: true,
                            msg: item.message
                        })
                        getCode((action) => {
                            this.props.dispatch(action)
                            this.refresh("verifyCanvas", 90, 32)
                        })
                    } else if (item.code == 0 && item.data.accessKey) {
                        //存储用户的一些信息到session
                        sessionStorage.setItem('item', JSON.stringify(item));
                        // console.log(JSON.parse(sessionStorage.item));
                        this.props.history.push("/main/index")
                    } else {
                        this.setState({
                            show: true,
                            msg: "未知错误"
                        })
                        getCode((action) => {
                            this.props.dispatch(action)
                            this.refresh("verifyCanvas", 90, 32)
                        })
                    }
                })
            }
        });

    }
    


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login_container">
                <div className="logoBox">
                    <div className="logo_head">
                        <img src={require('./logo.png')} alt="logo" height={64}/>
                        <span className="title">Xing Huo</span>
                    </div>
                    <p>星火牛科技有限公司内部管理系统</p>
                </div>
                <div>{
                this.state.canI ?
                    <Form onSubmit={this.handleSubmit} className={"formDiv login-form"}  data-id={dataId}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请正确输入账号' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入登录账号" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请正确输入密码' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入登录密码" />
                                )}
                        </FormItem>
                        <FormItem className="codeBox">
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: '请正确输入验证码' }],
                            })(
                                <div>
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="请输入验证码" className="codeInput" />

                                    <div id="codeBox" style={{ width: 90, height: 32, }}></div>

                                </div>
                                )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </FormItem>
                        <Modal visible={this.state.show}
                            title="登陆出错"
                            onOk={this.handleOk}
                            onCancel={this.handleOk}
                            footer={[
                                <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确定</Button>
                            ]}>
                            <p>{this.state.msg}</p>
                        </Modal>
                    </Form>:""
                }</div>
                <GlobalFooter className="loginFooter" copyright={<div>Copyright <Icon type="copyright" /> 2017 星火牛技术部出品</div>} />
            </div>
        );
    }
    handleOk = () => {
        this.setState({
            show: false
        })
    }

    componentDidMount = ()=> {
        if(arr.indexOf(dataId)!= -1){
            this.setState({
                canI:true
            })
        }
      
        getCode((action) => {
            this.props.dispatch(action)
            this.initCanvas("codeBox", 90, 32)
            this.refresh("verifyCanvas", 90, 32)
        })
      
    }
    initCanvas = (ele, width, height) => {
        var con = document.getElementById(ele);
        var canvas = document.createElement("canvas");
        width = con.offsetWidth > 0 ? con.offsetWidth : "100";
        height = con.offsetHeight > 0 ? con.offsetHeight : "30";
        canvas.id = "verifyCanvas";
        canvas.width = width;
        canvas.height = height;
        canvas.style.cursor = "pointer";
        canvas.innerHTML = "您的浏览器版本不支持canvas";
        con.appendChild(canvas);
        canvas.onclick = () => {
            getCode((action) => {
                this.props.dispatch(action)
                this.refresh("verifyCanvas", 90, 32)
            })
        }
    }
    refresh = (ele, width, height) => {
        var canvas = document.getElementById(ele);
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.randomColor(180, 240);
        ctx.fillRect(0, 0, width, height);
        for (var i = 1; i <= 4; i++) {
            var txt = this.props.codeList.code[i - 1];//把当前验证码分别绘制出来
            ctx.font = this.randomNum(height / 1.5, height) + 'px SimHei'; //随机生成字体大小
            ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色		
            // ctx.shadowOffsetX = this.randomNum(-3, 3);
            // ctx.shadowOffsetY = this.randomNum(-3, 3);
            // ctx.shadowBlur = this.randomNum(-3, 3);
            // ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            var x = width / 5 * i;
            var y = height / 2;
            var deg = this.randomNum(-30, 30);
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        /**绘制干扰线**/
        for (var i = 0; i < 4; i++) {
            ctx.strokeStyle = this.randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
            ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
            ctx.stroke();
        }
        /**绘制干扰点**/
        for (var i = 0; i < width / 4; i++) {
            ctx.fillStyle = this.randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    /**生成一个随机数**/
    randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    randomColor = (min, max) => {
        var r = this.randomNum(min, max);
        var g = this.randomNum(min, max);
        var b = this.randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
}
let Login = Form.create()(Login1);

function filterCheckPendingList(store) {
    // console.log(store);
    return {
        codeList: store.userLoginList
    }
}

export default connect(filterCheckPendingList)(Login)