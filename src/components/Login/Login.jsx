import React from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './Login.scss';
import { clickLoginBtn, getCode } from '../../redux/actions/acLogin/acLogin'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loginBtnLoading: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                _this.setState({
                    loginBtnLoading: true
                })
                setTimeout(() => {
                    if (values.userName === 'admin' && values.password === 'admin') {

                        /*
                            当然这里没必要使用redux，只是用于演示下redux的操作流程
                        */

                        _this.props.dispatch(clickLoginBtn())
                        _this.setState({
                            loginBtnLoading: false
                        })
                        if (_this.props.loginSys) {
                            /*存入登陆的状态*/
                            sessionStorage.setItem('login', true)
                            _this.props.history.push('/routes')
                        }
                        /*异步处理*/
                        // getCode((action)=>{
                        //     _this.props.dispatch(action)
                        // })
                    } else {

                        message.error('login fails')
                        _this.setState({
                            loginBtnLoading: false
                        })

                    }
                }, 500)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { loginBtnLoading } = this.state
        return (
            <div id="login_container">
                <div id="login_form">
                    <div className="head">
                        <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' height="40" alt="logo" />
                        <span>Ant</span>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="admin" size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="admin" size="large" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button loading={loginBtnLoading} type="primary" htmlType="submit" className="login-form-button" size="large">
                                Log in
                        </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

function filterStore(store) {
    return ({
        loginSys: store.loginSys
    })
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default connect(filterStore)(WrappedNormalLoginForm) 