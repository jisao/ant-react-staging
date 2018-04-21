import React from 'react';
import { Steps, Button, message, Row, Col } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import './Step.scss'
const Step = Steps.Step;
const steps = [{
    title: 'First',
    content: 'First-content',
}, {
    title: 'Second',
    content: 'Second-content',
}, {
    title: 'Last',
    content: 'Last-content',
}];

const breadCrumbList = [{
    title: '首页',
    href: '/routes/Analyze',
}, {
    title: '步骤条',
}, {
    title: '步骤条详情页',
}];

class StepDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state;
        return (
            <div>
                <PageHeader
                    title='步骤条详情页'
                    breadCrumbList={breadCrumbList}
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                />
                <div style={{ backgroundColor: '#fff', padding: 24, margin: 24 }}>
                    <Steps current={current} >
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[this.state.current].content}</div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: 24, margin: 24 }} className='vertical_step'>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Steps current={current} direction='vertical' progressDot>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                        </Col>
                        <Col span={20}>
                            <div className="steps-content">{steps[this.state.current].content}</div>
                        </Col>
                    </Row>

                    <div className="steps-action">
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                        }
                        {
                            this.state.current > 0
                            &&
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default StepDemo
