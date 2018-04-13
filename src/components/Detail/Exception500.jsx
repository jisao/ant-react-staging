import React from 'react';
import Exception from 'ant-design-pro/lib/Exception';

class Exception500 extends React.Component{
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        return(
            <div style={{margin:24,padding:24,backgroundColor:'#fff'}}>
                <Exception type="500"></Exception>
            </div>
        )
    }
}

export default Exception500