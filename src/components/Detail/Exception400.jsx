import React from 'react';
import Exception from 'ant-design-pro/lib/Exception';

class Exception400 extends React.Component{
    componentDidMount(){
        console.log(this.props.location);
    }

    render(){
        return(
            <div style={{margin:24,padding:24,backgroundColor:'#fff'}}>
                <Exception type="400"></Exception>
            </div>
        )
    }
}

export default Exception400