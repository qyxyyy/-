/**
 * 定义一个名为BookTable的常量对象，用于创建书籍列表的表格组件
 * 该组件使用Vue.js的模板语法来渲染表格
 */
const CategoryTable = {
    // 组件名称
    name: 'CategoryTable',
    // 使用模板字符串定义HTML结构
    template: `

 <el-table :data="categories" stripe>
      <el-table-column prop="categoryName" label="分类名称"></el-table-column>
      <el-table-column label="状态">
            <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.status).type" > {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
      
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template #default="scope">
          {{ scope.row.description || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ formatDate(scope.row.createdTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" plain size="small"  @click="$emit('edit', scope.row)" style="margin-right: 8px">编辑</el-button>
          <el-button type="warning" plain size="small" @click="$emit('delete', scope.row.categoryId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    `,
    // 定义组件的属性
    props: {
        // 书籍数组，类型为Array，默认值为空数组
        categories: {
            type: Array,
            default: () => [],
        }
    },
    // 使用setup函数定义组件的响应式属性和方法
    setup() {

        const formatDate = (date) => {
            return new Date(date).toLocaleDateString();
        };


        const getStatusInfo = (status) => {
            const statusMap = {
                1: { type: 'success', message: '启动' },
                0: { type: 'danger', message: '停用' },
            }
            return statusMap[status] || { type: 'info', message: '未知状态' }
        }
        // 返回定义的方法，使其能在模板中使用
        return { formatDate,getStatusInfo };
    }
};
