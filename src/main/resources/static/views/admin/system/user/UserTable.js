/**
 * 定义一个名为UserTable的常量对象，用于创建书籍列表的表格组件
 * 该组件使用Vue.js的模板语法来渲染表格
 */
const UserTable = {
    // 组件名称
    name: 'UserTable',
    // 使用模板字符串定义HTML结构
    template: `
<el-table :data="users"  style="width: 100%" border :header-cell-style="{background:'#fafafa'}">
  <el-table-column type="selection"  width="55" />
      
    <el-table-column prop="username" label="用户名"/>
    <el-table-column prop="email" label="电子邮箱"/>
    <el-table-column prop="mobilePhone" label="手机号码"/>
    <el-table-column prop="lastLoginIp" label="上次登录IP地址"/>
    <el-table-column prop="lastLoginTime" label="上次登录时间"/>
    <el-table-column label="状态" width="80">
        <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.status).type" size="large"> {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="用户头像" style="padding: 0px" width="100">
    
        <template #default="scope">
            <div v-if="scope.row.avatarUrl">
                <el-image :src="scope.row.avatarUrl" alt="用户头像"  
                          style="max-width: 55px; max-height: 55px;"/>
            </div>
            <div v-else>无</div>
        </template>
    </el-table-column>
    <el-table-column prop="remark" label="描述"  width="180"  show-overflow-tooltip/>
    
    <el-table-column label="操作" fixed="right" width="220">
        <template #default="scope">
            <el-button type="primary" plain size="small"    
                       @click="$emit('edit', scope.row)">编辑
            </el-button>
            <el-button type="warning" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('delete', scope.row.userId)">删除
            </el-button>
<!--            支持更多的操作-->
            <el-dropdown trigger="click" @command="handleCommand" style=" margin-left: 4px;">
                <el-button type="primary"  size="small">更多
                <i class="fas fa-caret-down" style="margin-left: 5px;"></i></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="setRole">
                            <i class="fas fa-user-tag"></i>
                            分配角色
                        </el-dropdown-item>
                        <el-dropdown-item command="detail">
                            <i class="fas fa-info-circle"></i>
                            详情
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
    </el-table-column>
</el-table>
    `,
    // 定义组件的属性
    props: {
        // 书籍数组，类型为Array，默认值为空数组
        users: {
            type: Array,
            default: () => [],
        }
    },
    // 使用setup函数定义组件的响应式属性和方法
    setup() {
        /**
         * 根据书籍状态码返回对应的状态文本
         * @param {number} status - 书籍状态码
         * @returns {string} - 状态文本
         */
        const getStatusInfo = (status) => {
            const statusMap = {
                0: {type: 'warning', message: '停用'},
                1: {type: 'success', message: '激活'},
            }
            return statusMap[status] || {type: 'info', message: '未知状态'}
        }

        const handleCommand = () => {
            console.log('操作命令:', command);
            // 根据命令执行相应的操作
            if (command === 'setRole') {
                console.log('编辑操作');
            } else if (command === 'detail') {
                console.log('查看详情');
            }
        }
        return {getStatusInfo, handleCommand};
    }
}
