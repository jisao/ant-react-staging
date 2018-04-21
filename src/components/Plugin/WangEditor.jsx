import React, { Component } from 'react';
import E from 'wangeditor';
import PageHeader from 'ant-design-pro/lib/PageHeader'
const picUrl = 'http://xxxxxxxxx/api/upload';
let editor = null;
// http://bpic.588ku.com/video_listen/588ku_mpeg/17/12/13/726ce1f24f59c77bd2876defcdca07f7.mp4
export default class EditorDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pasteFilterStyle: false,
            editorContent: ''
        }
    }
    render() {
        return (
            <div>
                <PageHeader
                    title='富文本编辑器'
                />
                <div style={{ backgroundColor: "#fff", margin: 24, padding: 24 }}>
                    <div id="editorBox" ref="editorElem" style={{ textAlign: 'left' }} />
                </div>

                <pre style={{backgroundColor:'#000',minHeight:200,margin:24,padding:24,color:'#fff'}}>
                    {this.state.editorContent}
                </pre>

            </div>
        )
    }

    componentDidMount() {
        this.initEditor()
    }

    //初始化编辑器
    initEditor = () => {
        const _this = this
        const elem = document.querySelector("#editorBox")
        editor = new E(elem)
        editor.customConfig.zIndex = 100//配置z-index
        // 关闭粘贴样式的过滤
        editor.customConfig.pasteFilterStyle = _this.state.pasteFilterStyle
        // editor.customConfig.lang = {
        //     '设置标题': 'title',
        //     '正文': 'p',
        //     '链接文字': 'link text',
        //     '链接': 'link',
        //     '上传图片': 'upload image',
        //     '上传': 'upload',
        //     '创建': 'init'
        //     // 还可自定添加更多
        // }
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            console.log(html);
            this.setState({
                editorContent: html
            })
        }
        // 在10秒没有任何操作的情况下会自动调用onchange⌚️自动保存
        editor.customConfig.onchangeTimeout = 0 // 单位 ms
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadImgServer = picUrl// 上传图片到服务器
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                console.log(xhr);
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                console.log(result);

            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                _this.openNotificationWithIcon('error', "图片上传失败")
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                _this.openNotificationWithIcon('error', "图片上传超时")
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                console.log(result);
                var url = result.data.path
                insertImg(url)
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }

        editor.create()
    }
}
