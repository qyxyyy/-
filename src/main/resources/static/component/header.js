// header.js

const AppHeader = {
    name: 'AppHeader',
    template: `
       <el-header>
                <el-button @click="$emit('toggleSidebar')" style="    background-color: #344a5f;">
               <i :class="sidebarCollapsed ? 'fa-solid fa-bars' : 'fa-solid fa-bars'"></i>  
                </el-button>
                <h1>图书借阅管理系统</h1>
                <div class="header-right" style="margin-left: auto;">
                    <span class="role">{{role.roleName}}</span>
                    <span class="separator">|</span>
                    <div>
                        <img class="avatar" src="/site/images/avatar/avatart7.png" alt="Avatar">
                        <span class="username">{{username}}</span>
                    </div>
                    <span><i class="fa-solid fa-arrow-right-from-bracket" @click="handleLogout"></i> </span>
                </div>
            </el-header>
    `,
    // 接收父组件传递的状态
    props: {
        sidebarCollapsed: {
            type: Boolean,
            default: false
        }
    },
    emits: ['toggleSidebar'], // 组件设置函数
    setup(props, {emit}) {
        const role = ref(window.AuthUtils.getRole());
        console.log(role.value);
        const username = ref(window.AuthUtils.getUsername());
        const handleLogout = () => {
            console.log("注销");
            axiosInstance.post('/api/logout')
                .then(response => {
                    AuthUtils.logout();
                })
        };

        return {handleLogout, username, role};
    }
}
