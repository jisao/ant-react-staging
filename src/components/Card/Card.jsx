import React from 'react';
import { Card, Row, Col, Icon, Avatar } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
const { Meta } = Card;
const breadcrumbList = [{
    title: '首页',
    href: '/routes/Analyze',
}, {
    title: '卡片',
}, {
    title: '卡片详情页',
}];

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
export default class CardDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingCard: true
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                loadingCard: false
            })
        }, 1500)
    }

    render() {
        let { loadingCard } = this.state
        return (
            <div id='defaultCard'>
                <PageHeader
                    title='卡片'
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={breadcrumbList}
                />
                <div style={{ margin: 24 }}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Card loading={loadingCard} title={'Card'} bordered={false}>card content</Card>
                        </Col>
                        <Col span={8}>
                            <Card loading={loadingCard} title={'Card'} bordered={false}>card content</Card>
                        </Col>
                        <Col span={8}>
                            <Card loading={loadingCard} title={'Card'} bordered={false}>card content</Card>
                        </Col>
                    </Row>
                </div>

                <div style={{ margin: 24 }}>
                    <Card title="Card Title"  loading={loadingCard} >
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                    </Card>
                    <Row gutter={24} style={{ marginTop: 24 }}>
                        <Col span={8}>
                            <Card
                                loading={loadingCard}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card loading={loadingCard}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card loading={loadingCard}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ marginTop: 24 }}>
                        <Col span={8}>
                            <Card loading={loadingCard}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card loading={loadingCard}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card loading={loadingCard}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}