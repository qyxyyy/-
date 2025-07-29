const AppSidebar = {
    name: 'AppSidebar',
    template: `
    <el-aside :class="{ collapsed: sidebarCollapsed }">
  <div class="sidebar-header">
    <img src="/site/images/bookshelf.png" alt="Library Icon">
  </div>
  <el-menu
      default-active="1"
      :default-openeds="defaultOpeneds"
      class="el-menu-vertical-demo"
      :collapse="sidebarCollapsed"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#ffd04b">
    <template v-for="item in menuItems" :key="item.index">
      <!-- 有 children，正常分组下拉 -->
      <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
            v-for="child in item.children"
            :key="child.index"
            :index="child.index"
            @click="navigateTo(child.url)">
          <i :class="child.icon"></i>
          <span>{{ child.label }}</span>
        </el-menu-item>
      </el-sub-menu>
      <!-- 没有 children，直接是一级菜单项 -->
      <el-menu-item
          v-else
          :index="item.index"
          @click="navigateTo(item.url)">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</el-aside>
  `,
    props: {
        sidebarCollapsed: {
            type: Boolean,
            default: false
        }
    },
    setup(props, {emit}) {
        const {  computed } = Vue; // 从Vue里取出ref和computed
        // 1. 角色读取
        const role = reactive(window.AuthUtils.getRole());

        // 2. 菜单根据角色切换
        const menuItems = computed(() => {
            if (role.roleCode === 'ADMIN' || role.roleCode === 'SUPER_ADMIN')
                return window.adminMenuItems;
            if (role.roleCode === 'READER') return window.readerMenuItems;
            return window.adminMenuItems;
        });

        // 3. 跳转事件处理
        const navigateTo = (path) => {
            if (window.router) {
                window.router.push(path);
            } else {
                window.location.href = path;
            }
        };
        // defaultOpeneds 也要按vue3组合式写法改
        const defaultOpeneds = computed(() => menuItems.value.map(item => item.index));
        return {
            menuItems,
            navigateTo,
            defaultOpeneds
        };
    }
};