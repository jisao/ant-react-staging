import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'react-amap';
import PageHeader from 'ant-design-pro/lib/PageHeader';

export default class GDmap extends React.Component {
    render() {
        return (
            <div id='GDmap'>
                <PageHeader
                    title='高德地图'
                />
                <div style={{ margin: 24,height:600 }}>
                    <Map amapkey='029f02bbe0c9b4b176b69389730b8b51' />
                </div>
            </div>
        )
    }
}
