import React from 'react';
import { SketchPicker } from 'react-color';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import './GetColor.scss';
export default class Component extends React.Component {

    render() {
        return (
            <div id='GetColor'>
                <PageHeader
                    title='拾色器'
                />
                <div style={{margin:24}}>
                    <SketchPicker/>
                </div>
            </div>
        )
    }
}
