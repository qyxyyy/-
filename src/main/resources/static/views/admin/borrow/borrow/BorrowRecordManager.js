// 定义 BorrowRecorCategoryManager 组件
const borrowRecordApi='/api/admin/borrowRecord'
const BorrowRecordManager = {
    name: 'BorrowRecordManager',
    components: {
        BorrowDialog, // 局部注册 BorrowRecordForm 组件
        BorrowRecordTable, // 局部注册 BorrowRecordTable 组件
        BorrowRecordQueryForm
    },
    template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>当前页面</el-breadcrumb-item>
    </el-breadcrumb>
    <BorrowRecordQueryForm :categories="categories" @search="handleSearch"
      @openBorrowDialog="openBorrowDialog" @open-return-book-dialog="openReturnBookDialog"
    />
    <div class="button-area">
    <el-button type="primary" @click="openForm(null)">
        <i class="fa-solid fa-plus"></i> 导出数据
    </el-button>

    <el-button type="success">
        <i class="fa-solid fa-upload"></i> 预期罚款
    </el-button>
    </div>

    <BorrowRecordTable
            :pagination="pagination"
             @page-change="handlePageChange"  
             @size-change="handleSizeChange"  
            @edit="openForm"
            @delete="handleDelete"
    />
    
    <BorrowDialog v-model:visible="showBorrowDialog"/>
<!--    <BorrowRecordForm-->
<!--            v-model:visible="showForm"-->
<!--            :borrowRecor-data="currentBorrowRecord"-->
<!--            :categories="categories"-->
<!--            @submit="handleSubmit"-->
<!--    />-->

</el-main>
    `,
    setup() {
        // 使用 Vue 的 ref 函数创建响应式数据
        const pagination = Vue.reactive({})
        const categories = Vue.ref([])
        const showBorrowDialog = Vue.ref(false)
        const showReturnBookDialog = Vue.ref(false)
        const currentBorrowRecord = Vue.ref(null)
        const queryParams = Vue.reactive({
            pageSize: 10, currentPage:1
        })

        // 组合式函数 - 数据获取
        const fetchData = () => {
            axiosInstance.post(`${borrowRecordApi}/query`, queryParams)
                .then(response => {
                    console.log("response", response.data)
                    // 将获取到的数据赋值给 pagination
                    Object.assign(pagination, response.data);
                })
        }

        // // 提交表单时的处理函数
        // const handleSubmit = (formData) => {
        //     if (formData.borrowRecorId) {
        //         // 更新借阅记录信息
        //         axiosInstance.put(`${borrowRecordApi}`, formData)
        //             .then(response => {
        //                 message.success('借阅记录更新成功');
        //                 showForm.value = false
        //                 fetchData({})
        //             })
        //             .catch(error => {
        //                 // 处理错误的处理
        //                 showForm.value = true
        //             });
        //     } else {
        //         // 添加新借阅记录
        //         axiosInstance.post(`${borrowRecordApi}`, formData)
        //             .then(response => {
        //                 message.success('借阅记录添加成功');
        //                 showForm.value = false
        //                 fetchData({})
        //             })
        //             .catch(error => {
        //                 //这里会捕获到拦截器抛出的 Error 对象
        //                 console.log(error.message)
        //                 showForm.value = true
        //             });
        //     }
        // }

        // 打开表单时的处理函数
        const openBorrowDialog = () => {
            showBorrowDialog.value = true
            showReturnBookDialog.value = false
        }

        const openReturnBookDialog = () => {
                     showBorrowDialog.value = false
            showReturnBookDialog.value = true
        }

        // 删除借阅记录的处理函数
        const handleDelete = (id) => {

            ElementPlus.ElMessageBox.confirm('确定要删除该附件吗？','确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`/api/admin/borrowRecor/${id}`)
                    .then(response => {
                        message.success('借阅记录删除成功');
                        fetchData({})
                    })
            })
        }

        const handleSearch = (params) => {
            // 直接清空原 queryParams 对象中的所有属性
            clearObjectProps(queryParams)
            // 重新赋值
            Object.assign(queryParams, {...params})
            fetchData();
        }

        // 分页事件
        const handlePageChange = (page) => {
            queryParams.currentPage = page;
            fetchData();
        };
        const handleSizeChange = (size) => {
            queryParams.pageSize = size;
            queryParams.currentPage = 1; // 更换每页条数回首页
            fetchData();
        };


        // 在组件挂载时获取数据
        onMounted(() => {
            fetchData()
            console.log("cc", pagination)
            }
        )
        // 返回创建的函数和数据，供模板使用

        // return {borrowRecors, showForm, currentBorrowRecord, openForm, categories, handleDelete, handleSubmit,handleSearch};
        return {pagination, showReturnBookDialog, showBorrowDialog,
            handlePageChange, handleSizeChange, openBorrowDialog, openReturnBookDialog,
            currentBorrowRecord,handleSearch};
    }
};
