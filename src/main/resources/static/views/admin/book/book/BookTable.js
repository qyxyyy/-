/**
 * 定义一个名为BookTable的常量对象，用于创建书籍列表的表格组件
 * 该组件使用Vue.js的模板语法来渲染表格
 */
const BookTable = {
        // 组件名称
        name: 'BookTable',
        // 使用模板字符串定义HTML结构
        template: `
<el-table :data="pagination.list"  stripe style="width: 100%">
  <el-table-column type="selection"  width="55" />
    <el-table-column prop="title" label="书名"/>
    <el-table-column prop="author" label="作者"/>
    <el-table-column prop="isbn" label="ISBN"/>
    <el-table-column prop="publisher" label="出版社"/>
    <el-table-column prop="publicationYear" label="出版年份" width="90"/>
    <el-table-column prop="language" label="语言" width="60"/>
    <el-table-column prop="location" label="位置" width="100"/>
    <el-table-column label="状态" width="80">
        <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.status).type" size="large"> {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="封面" style="padding: 0px" width="100">
        <template #default="scope">
            <div v-if="scope.row.coverUrl">
                <el-image :src="scope.row.coverUrl" alt="封面预览" fit="fill"
                          style="max-width: 55px; max-height: 55px;"/>
            </div>
            <div v-else>无</div>
        </template>
    </el-table-column>
    <el-table-column prop="description" label="描述"  width="180"  show-overflow-tooltip/>
    <el-table-column label="附件" width="100">
        <template #default="scope">
            <div v-if="scope.row.attachmentUrl">
                <a :href="scope.row.attachmentUrl" target="_blank">预览</a>
                <a :href="scope.row.attachmentUrl" download style="margin-left: 8px">下载</a>
            </div>
            <div v-else>无</div>
        </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="220">
        <template #default="scope">
            <el-button type="primary" plain size="small"    
                       @click="$emit('edit', scope.row)">编辑
            </el-button>
            <el-button type="warning" plain size="small" style=" margin-left: 4px;"
                       @click="$emit('delete', scope.row.bookId)">删除
            </el-button>
<!--            支持更多的操作-->
            <el-dropdown trigger="click" @command="handleCommand" style=" margin-left: 4px;">
                <el-button type="primary"  size="small">更多
                <i class="fas fa-caret-down" style="margin-left: 5px;"></i></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="edit">
                            <i class="fas fa-edit"></i>
                            添加副本
                        </el-dropdown-item>
                        <el-dropdown-item command="delete">
                            <i class="fas fa-trash"></i>
                            上架
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
                    1: {type: 'success', message: '在馆'},
                    2: {type: 'warning', message: '外借'},
                    3: {type: 'primary', message: '未上架'}
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
            return {getStatusInfo, handleCommand, onPageChange, onSizeChange};
        }
    }
;
