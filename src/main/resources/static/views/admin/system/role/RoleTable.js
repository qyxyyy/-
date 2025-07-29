/**
 * 定义一个名为RoleTable的常量对象，用于创建书籍列表的表格组件
 * 该组件使用Vue.js的模板语法来渲染表格
 */
const RoleTable = {
    // 组件名称
    name: 'RoleTable', // 使用模板字符串定义HTML结构
    template: `
<el-table :data="roles"  stripe style="width: 100%"> 
  <el-table-column type="selection"  width="55" />
    <el-table-column prop="roleCode" label="角色编码"/>
    <el-table-column prop="roleName" label="角色名称"/>
    <el-table-column label="状态" width="80">
        <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.status).type" size="large"> {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
    </el-table-column>

    <el-table-column prop="description" label="描述"  width="180"  show-overflow-tooltip/>
    
    <el-table-column label="操作" fixed="right" width="220">
        <template #default="scope">
            <el-button type="primary" plain size="small"    
                       @click="$emit('edit', scope.row)">编辑
            </el-button>
            <el-button type="warning" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('delete', scope.row.roleId)">删除
            </el-button>
             <el-button type="danger" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('disabled', scope.row.roleId)">停用
            </el-button>
            </template>
    </el-table-column>
</el-table>
    `, // 定义组件的属性
    props: {
        // 书籍数组，类型为Array，默认值为空数组
        roles: {
            type: Array, default: () => [],
        }
    }, // 使用setup函数定义组件的响应式属性和方法
    setup() {
        const getStatusInfo = (status) => {
            const statusMap = {
                0: {type: 'warning', message: '停用'}, 1: {type: 'success', message: '激活'},
            }
            return statusMap[status] || {type: 'info', message: '未知状态'}
        }
        return {getStatusInfo};
    }
};
