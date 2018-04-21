import { notification, Modal } from 'antd';
import NProgress from 'nprogress';
const confirm = Modal.confirm;
export function openNotification({ type, message, description }) {
    notification[type || 'error']({
        message: message || '提示',
        description,
    });
};


export function openConfirm({ title, content, okFn }) {
    confirm({
        title: title || '确认提示框',
        content: content || '',
        onOk() {
            if (okFn) {
                okFn()
            }
        },
    });
}

export function openModal({ type, title, content, okFn }) {
    Modal[type || 'info']({
        title: title || '',
        content: content || '',
        onOk() {
            if (okFn) {
                okFn()
            }
        },
    });
}

export function NProgressInitPage(){
    NProgress.start()
    setTimeout(()=>{
        NProgress.done()
    },1500)
}
