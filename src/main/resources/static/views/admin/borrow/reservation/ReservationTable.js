/**
 * 定义一个名为BookcopyTable的常量对象，用于创建书籍列表的表格组件
 * 该组件使用Vue.js的模板语法来渲染表格
 */
const BookcopyTable = {
    // 组件名称
    name: 'BookcopyTable',
    // 使用模板字符串定义HTML结构
    template: `
<el-table :data="pagination.list"  style="width: 100%" border :header-cell-style="{background:'#fafafa'}">
  <el-table-column type="selection"  width="55" />
      
    <el-table-column prop="barcode" label="条形码"/>
    <el-table-column prop="bookName" label="图书名"/>
    <el-table-column prop="bookIsbn" label="ISBN"/>
    <el-table-column prop="location" label="馆藏位置"/>
     <el-table-column label="状态" >
        <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.status).type" size="large"> {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
    </el-table-column>
     <el-table-column prop="borrower" label="借阅人"/>
    <el-table-column label="入库时间" width="240">  
    <template #default="scope">  
    {{ DateUtils.formatDateTime(scope.row.createdTime) }}  
    </template>  
    </el-table-column>  
    <el-table-column prop="remark" label="备注"/>
   
    <el-table-column label="操作" fixed="right" width="220">
        <template #default="scope">
            <el-button type="primary" plain size="small"    
                       @click="$emit('edit', scope.row)">编辑
            </el-button>
            <el-button type="warning" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('delete', scope.row.copyId)">删除
            </el-button>
             <el-button type="danger" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('disabled', scope.row.copyId)">下架
            </el-button>
            </template>
    </el-table-column>
</el-table>
 <!-- 分页控件 -->  
    <div style="text-align: right;margin: 16px 0;">  
        <el-pagination  
          background  
          :current-page="pagination.currentPage"  
          :page-size="pagination.pageSize"  
          :total="pagination.total"  
          :page-sizes="[5, 10, 20, 50]"  
          layout="total, sizes, prev, pager, next, jumper"  
          @current-change="onPageChange"  
          @size-change="onSizeChange"  
        />  
    </div>  
    `,
    // 定义组件的属性
    props: {
        // 书籍数组，类型为Array，默认值为空数组
        pagination: {
            type: Object
        }
    },


    emits: ['size-change', 'page-change'], // 组件设置函数
    // 使用setup函数定义组件的响应式属性和方法
    setup(props, {emit}) {

        // 分页事件（转发给父组件）
        const onPageChange = (page) => {
            emit('page-change', page);
        }
        const onSizeChange = (size) => {
            emit('size-change', size);
        }

        const getStatusInfo = (status) => {
            const statusMap = {
                1: {type: 'warning', message: '借出'}, 0: {type: 'success', message: '在库'},
                2: {type: 'info', message: '遗失'},

            }
            return statusMap[status] || {type: 'info', message: '未知状态'}
        }
        return {DateUtils,getStatusInfo, onPageChange, onSizeChange};
    }
}
