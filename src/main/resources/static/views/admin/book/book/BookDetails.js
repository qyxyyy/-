// 定义一个名为 RoleForm 的对象，用作 Vue 组件
const BookDetails = {
    // 组件名称
    name: 'BookDetails', // 组件模板
    template: `  
 <el-main>
  <!-- 顶部返回与标题 -->  
  <div class="detail-header">  
    <el-button link type="primary" @click="onBack">  
    <i class="fa fa-arrow-left"></i>   返回  
    </el-button>  
    <span class="detail-title">图书详情</span>  
  </div>  

  <!-- 图书信息区 -->  
  <el-card class="book-info-card" shadow="never" body-style="display:flex;padding:24px 32px 8px 32px;">  
    <!-- 封面 -->  
    <div class="cover-box">  
      <img :src="bookDetails.coverUrl || defaultCover"  width="80px" class="book-cover" alt="封面" v-if="bookDetails.coverUrl " />  
      <div v-else class="cover-placeholder">封面</div>  
    </div>  
    <!-- 文字信息 -->  
    <div style="flex:1;min-width:0;padding-left:32px;">  
      <div class="book-main-title">{{ bookDetails.title }}</div>  
      <div class="book-info-row">  
        <span>作者：{{ bookDetails.author }}</span>  
        <span class="ml40">ISBN：{{ bookDetails.isbn }}</span>  
      </div>  
      <div class="book-info-row">  
        <span>出版社：{{ bookDetails.publisher }}</span>  
        <span class="ml40">出版时间：{{ bookDetails.publicationYear }}</span>  
      </div>  
      <div class="book-info-row">  
        <span>分类：{{ bookDetails.categoryId }}</span>  
      </div>  
      <!-- 编辑按钮 -->  
      <div style="position: absolute;top:32px;right:48px;">  
        <el-button type="primary" plain size="default" @click="onEditBook">编辑图书</el-button>  
      </div>  
      <!-- 简介 -->  
      <div class="book-desc">  
        <span class="desc-label">内容简介：</span>  
        <span class="desc-text">{{ bookDetails.description }}</span>  
      </div>  
    </div>  
  </el-card>  

  <!-- 副本信息 -->  
  <el-card class="copy-list-card" shadow="never" body-style="padding:22px 24px 8px 24px;">  
    <div class="copies-title">所有副本信息</div>  
    <el-table :data="bookDetails.bookCopies" stripe border fit class="copies-table" style="margin:8px 0 0 0;">  
      <el-table-column prop="barcode" label="副本编号" align="center" min-width="110"/>  
      <el-table-column prop="location" label="架位位置" align="center" min-width="120"/>  
        <el-table-column  prop="status" label="状态" align="center" min-width="70">
        <template #default="scope">
         <el-tag :type="getStatusInfo(scope.row.status).type" size="large"> {{ getStatusInfo(scope.row.status).message }}</el-tag>
        </template>
    </el-table-column>
     
      <el-table-column prop="remark" label="备注" align="center" min-width="100">  
        <template #default="{ row }">  
          <span v-if="row.remark" :style="copyRemarkStyle(row)">{{ row.remark }}</span>  
          <span v-else style="color:#bbb;">-</span>  
        </template>  
      </el-table-column>  
      <el-table-column label="操作" align="center" min-width="100" fixed="right">  
        <template #default="{ row }">  
          <el-button type="primary" link size="small" @click="viewHistory(row)">借阅历史</el-button>  
          <el-dropdown v-if="row.status !== 0">  
            <el-button type="primary" link size="small" icon="more" style="padding:0 4px 0 4px;vertical-align:middle;"></el-button>  
            <template #dropdown>  
              <el-dropdown-menu>  
                <el-dropdown-item @click="moreAction(row)">更多操作</el-dropdown-item>  
              </el-dropdown-menu>  
            </template>  
          </el-dropdown>  
        </template>  
      </el-table-column>  
    </el-table>  
    <!-- 分页 -->  
<!--    <div class="copy-list-pagination">  -->
<!--      <el-pagination  -->
<!--        background  -->
<!--        layout="total, prev, pager, next"  -->
<!--        :total="copyTotal"  -->
<!--        :current-page="copyPage"  -->
<!--        :page-size="copyPageSize"  -->
<!--        @current-change="copyPage= $event"  -->
<!--        small  -->
<!--        hide-on-single-page  -->
<!--      />  -->
<!--    </div>  -->
  </el-card>  
 </el-main>      
   `,  // 自定义事件
    emits: ['update:visible', 'submit'], // 组件设置函数

    setup({emit}) {
        const bookDetails = Vue.reactive({})
        const bookId = Vue.ref(0)

// 状态标签映射
        const getStatusInfo = (status) => {
            const statusMap = {
                1: {type: 'warning', message: '借出'}, 0: {type: 'success', message: '在库'},
                2: {type: 'info', message: '遗失'},

            }
            return statusMap[status] || {type: 'info', message: '未知状态'}
        }

// 备注样式 (如有超期/赔偿加颜色)
        const copyRemarkStyle = (row) => {
            if (row.status === 1 && row.remark) return 'color:#f56c6c;font-weight:bold;'
            if (row.status === 2) return 'color:#909399'
            return 'color:#bbb'
        }

// 行为
        const onBack = () => window.history.back()

        const viewHistory = (row) => alert(`查看${row.copyId}的借阅历史`)
        const moreAction = (row) => alert('更多操作')

        const fetchData = () => {
            axiosInstance.get('/api/admin/book/details/' + bookId.value)
                .then(response => {
                    console.log("response", response.data)
                    // 将获取到的数据赋值给 pagination
                    Object.assign(bookDetails, response.data);
                })
        }

        // 在组件挂载时获取数据
        onMounted(() => {
                // 传统JS or Vue挂载前
                const urlParams = new URLSearchParams(window.location.search);
                bookId.value = urlParams.get('id');
                console.log('你传来的ID:', bookId.value);
                fetchData()
            }
        )
        // 返回表单数据及方法
        return {
            bookDetails,
            copyRemarkStyle,
            onBack,
            viewHistory,
            moreAction,
            getStatusInfo
        };
    }
};
