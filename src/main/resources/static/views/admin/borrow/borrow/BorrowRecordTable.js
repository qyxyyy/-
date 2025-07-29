/**
 * 定义一个名为BorrowRecordTable的常量对象，用于创建书籍列表的表格组件
 * 该组件使用Vue.js的模板语法来渲染表格
 */
const BorrowRecordTable = {
        // 组件名称
        name: 'BorrowRecordTable',
        // 使用模板字符串定义HTML结构
        template: `
<el-table :data="pagination.list"   border  
        style="width: 100%;"  
        header-cell-class-name="header-cell"  
      >  
  <el-table-column type="selection"  />
    <el-table-column prop="readerName" label="读者姓名"/>
    <el-table-column prop="readerNumber" label="读者ID"/>
    <el-table-column prop="bookName" label="图书信息">
    <template  #default="scope">
       {{scope.row.bookName}}({{scope.row.author}}) 
    </template>
    </el-table-column>
<!--    <el-table-column prop="author" label="作者"/>-->
<!--    <el-table-column prop="isbn" label="ISBN"/>-->
    <el-table-column prop="copyBarcode" label="副本码"/>
    <el-table-column prop="createdTime" label="借出时间" >
    <template #default="scope">  
    {{ DateUtils.formatDateTime(scope.row.createdTime) }}  
    </template>  
    </el-table-column>
    <el-table-column prop="dueDate" label="应还日期">
       <template #default="scope">  
    {{ DateUtils.format(scope.row.dueDate, 'yyyy年MM月dd日')}}  
    </template>  
    </el-table-column>
    <el-table-column label="状态"  >
        <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.copyStatus).type" size="large"> {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
    </el-table-column>
  
    <el-table-column label="操作" fixed="right" width="280">
        <template #default="scope">
            <el-button type="primary" plain size="small"    
                       @click="$emit('edit', scope.row)">还书
            </el-button>
            <el-button type="info" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('delete', scope.row.borrowRecordId)">续借
            </el-button>
           
  <el-button type="success" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('delete', scope.row.borrowRecordId)">详情
            </el-button>    
             <el-button type="warning" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('delete', scope.row.borrowRecordId)">逾期罚款
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

            /**
             * 根据书籍状态码返回对应的状态文本
             * @param {number} status - 书籍状态码
             * @returns {string} - 状态文本
             */
            const getStatusInfo = (status) => {
                const statusMap = {
                    0: {type: 'success', message: '在馆'},
                    1: {type: 'warning', message: '借出中'},
                    2: {type: 'primary', message: '预期未还'}
                }
                return statusMap[status] || {type: 'info', message: '未知状态'}
            }

            const handleCommand = () => {
                console.log('操作命令:', command);
                // 根据命令执行相应的操作
                if (command === 'edit') {
                    console.log('编辑操作');
                } else if (command === 'delete') {
                    console.log('删除操作');
                } else if (command === 'detail') {
                    console.log('查看详情');
                }
            }
            return {DateUtils,getStatusInfo, handleCommand, onPageChange, onSizeChange};
        }
    }
;
