// axios-instance.js —— axios 全局封装

// ====== 配置相关常量 ======
const BASE_URL = '/';         // 后端接口基础路径，可集中管理
const REQUEST_TIMEOUT = 5000; // 全局超时时间（毫秒）

// ====== 创建 axios 实例 ======
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
});

// ====== 请求拦截器 ======
axiosInstance.interceptors.request.use(
    config => {
        // 尝试获取本地 token，存在才添加到请求头，实现自动认证
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (err) {
            // 本地存储异常（理论极小概率），可做上报
            console.error('本地 token 读取失败:', err);
        }
        return config;
    },
    error => {
        // 拦截请求配置或发送阶段错误
        console.error('请求发送出错:', error);
        return Promise.reject(error);
    }
);

// ====== 响应拦截器 ======
axiosInstance.interceptors.response.use(
    response => {
        /**
         * 统一后端响应结构：{ code, message, data }
         * 正常业务（code === 200）直接返回 data，对调用方透明；
         * 失败时主动 reject，走统一 catch 逻辑。
         */
        const data = response && response.data;
        if (!data || typeof data.code === 'undefined') {
            // 响应结构异常
            showMessage('error', '服务器返回格式错误');
            return Promise.reject(new Error('服务器返回格式错误'));
        }
        if (data.code !== 200) {
            // 后端自定义业务异常
            const errMsg = `[${data.code}] ${data.message || '操作失败'}`;
            showMessage('error', errMsg);
            return Promise.reject(new Error(errMsg));
        }
        // 全部正常，直接返回业务有效载荷
        return data;
    },
    error => {
        // 统一处理网络和HTTP异常
        handleNetworkError(error);
        return Promise.reject(error);
    }
);

// ====== 网络和服务端错误统一处理 ======
/**
 * 网络出错时处理不同 HTTP 状态码和网络异常
 */
function handleNetworkError(error) {
    if (!error.response) {
        // 说明断网/超时/服务器无响应等
        showMessage('error', '网络连接异常，请检查网络设置');
        return;
    }

    const status = error.response.status;
    switch (status) {
        case 401:
            // 未认证或登录过期
            localStorage.clear();
            // 依赖全局 router，需确保已定义（否则 fallback 到页面跳转）
            if (window.router) {
                window.router.replace('/login?redirect=' + encodeURIComponent(window.router.currentRoute.value?.fullPath || '/'));
            } else {
                window.location.href = '/login';
            }
            break;
        case 403:
            showMessage('warning', '权限不足，请联系管理员');
            break;
        case 404:
            showMessage('error', '请求接口不存在 (404)');
            break;
        case 500:
            showMessage('error', '服务器内部错误 (500)');
            break;
        default:
            // 其余 HTTP 异常
            showMessage('error', `请求错误 [${status}]`);
    }
}

// ====== 全局优雅消息提示工具 ======
/**
 * 全局消息通知（类型 info/success/warning/error）
 * 依赖全局 ElementPlus 挂载（CDN环境下一般为 window.ElementPlus）
 * 挂载到 window，便于全局调用
 */
window.showMessage = function(type, message, duration = 5000) {
    if (window.ElementPlus && window.ElementPlus.ElMessage) {
        window.ElementPlus.ElMessage({
            type,
            message,
            duration,
            showClose: true
        });
    } else {
        // 兜底：没有 ElementPlus 时用 alert，保证提示不丢
        alert(`[${type}] ${message}`);
    }
};

// 对外暴露 axios 实例
window.axiosInstance = axiosInstance;

// 如需默认导出，在工程化环境可： export default axiosInstance;