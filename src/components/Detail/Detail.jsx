import React from 'react';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Button, Menu, Dropdown, Icon, Row, Col } from 'antd';
import { Route } from 'react-router-dom'
import Exception400 from './Exception400.jsx'
import Exception500 from './Exception500.jsx'

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const description = (
    <DescriptionList size="small" col="2">
        <Description term="创建人">曲丽丽</Description>
        <Description term="订购产品">XX 服务</Description>
        <Description term="创建时间">2017-07-07</Description>
        <Description term="关联单据"><a href="">12421</a></Description>
    </DescriptionList>
);

const menu = (
    <Menu>
        <Menu.Item key="1">选项一</Menu.Item>
        <Menu.Item key="2">选项二</Menu.Item>
        <Menu.Item key="3">选项三</Menu.Item>
    </Menu>
);

const action = (
    <div>
        <ButtonGroup>
            <Button>操作</Button>
            <Button>操作</Button>
            <Dropdown overlay={menu} placement="bottomRight">
                <Button><Icon type="ellipsis" /></Button>
            </Dropdown>
        </ButtonGroup>
        <Button type="primary">主操作</Button>
    </div>
);

const extra = (
    <Row>
        <Col sm={24} md={12}>
            <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>状态</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>待审批</div>
        </Col>
        <Col sm={24} md={12}>
            <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>订单金额</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>¥ 568.08</div>
        </Col>
    </Row>
);

const breadcrumbList = [{
    title: '首页',
    href: '/routes',
}, {
    title: '详情页',
}, {
    title: '高级详情页',
}];

const tabList = [{
    key: 'detail',
    tab: '详情',
}, {
    key: 'rule',
    tab: '规则',
}];

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.history.push({
            pathname: '/routes/Detail/400',
            state: {
                key:'detail'
            }
        })
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="单号：234231029431"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    action={action}
                    content={description}
                    extraContent={extra}
                    breadcrumbList={breadcrumbList}
                    tabList={tabList}
                    tabActiveKey="detail"
                    onTabChange={this.onTabChange}
                />

                <Route path='/routes/Detail/400' component={Exception400}></Route>
                <Route path='/routes/Detail/500' component={Exception500}></Route>
            </div>
        )
    }


    onTabChange = (key) => {

        //这里可以通过路由传值
        switch (key) {
            case 'detail':
                this.props.history.push({
                    pathname: '/routes/Detail/400',
                    state: {
                        key
                    }
                })
                break;
            case 'rule':
                this.props.history.push({
                    pathname: '/routes/Detail/500',
                    state: {
                        key
                    }
                })
                break;
            default:
                break;
        }
    }
}

export default Detail