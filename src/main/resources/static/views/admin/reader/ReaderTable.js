/**
 * 定义一个名为ReaderTable的常量对象，用于创建书籍列表的表格组件
 * 该组件使用Vue.js的模板语法来渲染表格
 */
const ReaderTable = {
    // 组件名称
    name: 'ReaderTable',
    // 使用模板字符串定义HTML结构
    template: `
<el-table :data="readers"  style="width: 100%" border :header-cell-style="{background:'#fafafa'}">
  <el-table-column type="selection"  width="55" />
      
    <el-table-column prop="readerNumber" label="读者号"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="gradeMajor" label="年级专业"/>
    <el-table-column prop="gender" label="性别"/>
    <el-table-column prop="type" label="类型"/>
    <el-table-column prop="borrowLimit" label="借书额度"/>
    <el-table-column prop="email" label="邮箱地址"/>
    <el-table-column prop="phone" label="联系电话"/>
    <el-table-column prop="departmentId" label="所属部门"/>
    <el-table-column label="状态" width="80">
        <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.status).type" size="large"> {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="读者相片" style="padding: 0px" width="100">
    
        <template #default="scope">
            <div v-if="scope.row.avatarUrl">
                <el-image :src="scope.row.avatarUrl" alt="读者头像"  
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
                       @click="$emit('delete', scope.row.readerId)">删除
            </el-button>
<!--            支持更多的操作-->
<!--            <el-dropdown trigger="click" @command="handleCommand" style=" margin-left: 4px;">-->
<!--                <el-button type="primary"  size="small">更多-->
<!--                <i class="fas fa-caret-down" style="margin-left: 5px;"></i></el-button>-->
<!--                <template #dropdown>-->
<!--                    <el-dropdown-menu>-->
<!--                        <el-dropdown-item command="setRole">-->
<!--                            <i class="fas fa-reader-tag"></i>-->
<!--                            分配角色-->
<!--                        </el-dropdown-item>-->
<!--                        <el-dropdown-item command="detail">-->
<!--                            <i class="fas fa-info-circle"></i>-->
<!--                            详情-->
<!--                        </el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                </template>-->
<!--            </el-dropdown>-->
        </template>
    </el-table-column>
</el-table>
    `,
    // 定义组件的属性
    props: {
        // 书籍数组，类型为Array，默认值为空数组
        readers: {
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

        return {getStatusInfo};
    }
}
