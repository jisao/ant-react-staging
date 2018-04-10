import React from 'react';
import { connect } from 'react-redux';
import { ChartCard, yuan, Field, Bar, MiniArea, MiniBar } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment';

require("./main.less")

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 12; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
    });
}
const salesPieData = [
    {
        x: '天天盈',
        y: 454445,
    },
    {
        x: '月月盈',
        y: 332165,
    },
    {
        x: '新手体验',
        y: 311366,
    },
    {
        x: '其他',
        y: 123155,
    },
];

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = () => {

    }

    render() {

        let { salesData } = this.state

        return (
            <div className="homePage" style={{ padding: 20 }}>
                <Row gutter={20}>
                    <Col md={24} xl={12}>
                        <ChartCard
                            title="销售额"
                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                            total={yuan(126560)}
                            footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
                            contentHeight={46}
                            style={{ height: 200 }}
                        >
                            <span>
                                周同比
                                <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                            </span>
                            <span style={{ marginLeft: 16 }}>
                                日环比
                                <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
                            </span>
                        </ChartCard>
                    </Col>

                    <Col md={24} xl={12}>
                        <ChartCard title="搜索用户数量" contentHeight={134} style={{ height: 200 }} >
                            <NumberInfo
                                subTitle={<span>本周访问</span>}
                                total={numeral(12321).format('0,0')}
                                status="up"
                                subTotal={17.1}
                            />
                            <MiniArea
                                line
                                height={45}
                                data={visitData}
                            />
                        </ChartCard>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }} gutter={20}>
                    <Col>
                        <ChartCard title="销售趋势" contentHeight={260} style={{ height: 300 }} >
                            <Bar className="saleBar"
                                height={260}
                                data={visitData}
                            />
                        </ChartCard>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect()(Main)
