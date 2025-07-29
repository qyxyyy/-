// 定义通知类型并挂到全局
window.NotificationType =  {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};


// 定义消息工具并挂到全局
window.message =  {
    info: (msg, duration = 3000) => ElementPlus.ElMessage({ message: msg, type:NotificationType.INFO, duration:duration, showClose: true}),
    success: (msg, duration = 3000) => ElementPlus.ElMessage({ message: msg, type:NotificationType.SUCCESS, duration:duration, showClose: true}),
    warning: (msg, duration = 3000) => ElementPlus.ElMessage({ message: msg, type:NotificationType.WARNING, duration:duration, showClose: true}),
    error: (msg, duration = 3000) => ElementPlus.ElMessage({ message: msg, type:NotificationType.ERROR, duration:duration, showClose: true})
};