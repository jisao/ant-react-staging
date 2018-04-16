import { notification } from 'antd'

export function openNotification({ type, message, description }) {
    notification[type || 'error']({
        message: message || '提示',
        description,
    });
};
