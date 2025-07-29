const BackendLayout = {
    name: 'BackendLayout',
    components: {
        AppSidebar,
        AppHeader,
        AppFooter
    },
    template: `
    <el-container>
        <!-- 传递状态给侧边栏组件 -->
        <app-sidebar :sidebar-collapsed="sidebarCollapsed"></app-sidebar>
        <el-container>
            <!-- 传递状态和事件处理方法给头部组件 -->
            <app-header :sidebar-collapsed="sidebarCollapsed" @toggle-sidebar="toggleSidebar"></app-header>
             <!-- 使用传入的管理组件 -->
            <component :is="contentComponent"></component>
            <el-footer><app-footer></app-footer></el-footer>
        </el-container>
    </el-container>
  `,
    props: {
        // 接收管理组件作为 prop
        contentComponent: {
            type: Object,
            required: true
        }
    },
    setup() {
        // 定义侧边栏折叠状态
        const sidebarCollapsed = ref(false);
        // 定义切换侧边栏折叠状态的方法
        const toggleSidebar = () => {
            console.log("toggleSidebar");
            sidebarCollapsed.value = !sidebarCollapsed.value;
        };
        return {
            sidebarCollapsed, toggleSidebar
        };
    }
};