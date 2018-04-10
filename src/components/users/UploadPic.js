import React from 'react'
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import copy from 'copy-to-clipboard'
import   picUrl from '../imagesUrl/url.json' 
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Timeline, Input, Modal, Radio, Upload, Card, message, notification, Tooltip, Spin, Collapse } from 'antd';
const { Meta } = Card;
const Dragger = Upload.Dragger;

require("./uploadPic.less")

class UploadPic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            breadcrumbList: [{
                title: '首页',
                href: '#/main',
            }, {
                    title: '系统设置',
            }, {
                title: '图片管理',
            }],
            previewImage: "",
            previewVisible: false,
            itemList: [],
            imgs: [
                
            ]
        }
    }

    componentDidMount(){
        this.lazyLoading("loading")
    }

    render() {

        let { breadcrumbList, imgs, previewVisible, previewImage } = this.state
        const _this = this
        const gridStyle = {
            width: '33.33%',
            textAlign: 'center',
        };
        const props = {
            name: 'file',
            action: picUrl.url,
            onChange(info) {
                _this.lazyLoading("loading")
                if (info.file.status === 'done') {
                    _this.state.imgs.push(info.file.response.data.path)
                    if (info.file.response.code == 0) {
                        _this.setState({
                            imgs: _this.state.imgs
                        })
                    }
                    console.log(_this.state.imgs);

                } else if (info.file.status === 'error') {
                    _this.openNotificationWithIcon("error", "上传图片失败")
                }
            },
        };
        return (
            <div id="uploadPic">
                <PageHeader className="UsersPageHeader"
                    title="图片管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                />
                <Spin size="large" spinning={this.state.loading} >
                    <div style={{ margin: "24px" }}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击上传图片或者拖拽图片到此处上传</p>
                            <p className="ant-upload-text">点击图片可以预览大图，点击地址直接复制到本地</p>
                        </Dragger>
                        <Row gutter={16}>
                            {
                                imgs.map((item, index) => {
                                    return (
                                        <Col span={6} style={{ marginTop: 16 }} key={index}>
                                            <Card
                                                style={{height: 250}}
                                                hoverable
                                                cover={<img className="pic" title="点击预览大图" onClick={() => { this.handlePreview(item) }} src={item} />}
                                            >
                                                <Meta
                                                    description={<p className="imgUrl" title="点击文字复制链接" onClick={() => { this.copySrc(item) }}>{item}</p>}
                                                />
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelImg}>
                            <img style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Spin>
            </div>
        )
    }


    //点击预览大图,把小图的url地址给大图
    handlePreview = (src) => {
        this.setState({
            previewImage: src,
            previewVisible: true,
        });
    }

    //关闭大图
    handleCancelImg = () => this.setState({ previewVisible: false })

    //提醒框公用函数
    openNotificationWithIcon = (type, text) => {
        notification[type]({
            message: '提示框',
            description: text,
        });
    };

    //复制图片地址
    copySrc(src) {
        copy(src);
        this.openNotificationWithIcon("success", "复制图片地址成功")
    };

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

}

export default connect()(UploadPic)