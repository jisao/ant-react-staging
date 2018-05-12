import React from 'react';
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import { Row, Col, Icon, Tooltip, Tabs } from 'antd';
import { Bar } from 'ant-design-pro/lib/Charts';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Radar } from 'ant-design-pro/lib/Charts';
import CountUp from 'react-countup';
import numeral from 'numeral';
import moment from 'moment';

import './Analyze.scss'

const TabPane = Tabs.TabPane;
const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});


class Analyze extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div id='analyze'>
        <Row gutter={24} style={{ marginLeft: 12, marginRight: 12 }}>
          <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 6 }} style={{ marginTop: 24 }}>
            <ChartCard
              title="销售额"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(1888888).format("0,0")}
              footer={
                <Field label="日均销售额" value={numeral(12423).format("0,0")} />
              }
              contentHeight={46}
            >
              <span>
                周同比
          <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                  12%
          </Trend>
              </span>
              <span style={{ marginLeft: 16 }}>
                日环比
          <Trend
                  flag="down"
                  style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                >
                  11%
          </Trend>
              </span>
            </ChartCard>
          </Col>
          <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 6 }} style={{ marginTop: 24 }}>
            <ChartCard
              title="搜索用户量"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(8846).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea
                line
                height={45}
                data={visitData}
              />
            </ChartCard>
          </Col>
          <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 6 }} style={{ marginTop: 24 }}>
            <ChartCard
              title="访问量"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(1123894).format('0,0')}
              footer={
                <Field label="日访问量"
                  value={
                    <CountUp
                      start={0}
                      end={8903}
                      duration={2.75}
                      useEasing
                      useGrouping
                      separator=","
                    />}
                />}
              contentHeight={46}
            >
              <MiniBar
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>
          <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 6 }} style={{ marginTop: 24 }}>
            <ChartCard
              title="线上购物转化率"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total="78%"
              footer={
                <div>
                  <span>
                    周同比
              <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                  </span>
                  <span style={{ marginLeft: 16 }}>
                    日环比
              <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24} style={{ margin: "24px 12px 0" }}>
          <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 12 }} style={{ marginBottom: 24 }}>
            <Pie
              hasLegend
              title="销售额"
              subTitle="销售额"
              total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
              data={salesPieData}
              valueFormat={val => yuan(val)}
              height={292}
              style={{ backgroundColor: '#fff', padding: '28px 0' }}
            />
          </Col>
          <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 12 }} style={{ marginBottom: 24 }}>
            <ChartCard title="数据比例">
              <Radar
                hasLegend
                height={286}
                data={radarData}
              />
            </ChartCard>
          </Col>
        </Row>
        <div style={{ margin:'0 24px 24px', backgroundColor: "#fff" }}>
          <Tabs defaultActiveKey="2">
            <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1" style={{ padding: 24 }}>
              <Bar
                height={500}
                title="iOS销售额趋势"
                data={salesData}
              />
            </TabPane>
            <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2" style={{ padding: 24 }}>
              <Bar
                height={500}
                title="Android销售额趋势"
                data={salesData}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Analyze