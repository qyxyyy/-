window.AuthUtils = {
    getUserInfo() {
        try {
            const json = localStorage.getItem('userInfo');
            if (!json) return null;
            return JSON.parse(json);
        } catch (err) {
            console.error('解析用户信息失败', err);
            return null;
        }
    },
    getRole() {
        const role = this.getUserInfo().role;

        return role ? role : '角色不存在';
    },
    getUsername() {
        const info = this.getUserInfo();
        return info && info.name ? info.name : '';
    },
    logout() {
        localStorage.removeItem('userInfo');
        location.href = '/login'; // 或刷新页面等逻辑
    }
};