// 定义 BookCategoryManager 组件
const bookcopyApi='/api/admin/bookcopy'

const BookcopyManager = {
    name: 'BookcopyManager',
    components: {
        BookcopyForm: BookcopyForm, // 局部注册 BookcopyForm 组件
        BookcopyTable: BookcopyTable, // 局部注册 BookcopyTable 组件
        BookcopyQueryForm: BookcopyQueryForm
    },
    template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图书副本管理</el-breadcrumb-item>
    </el-breadcrumb>

    <BookcopyQueryForm :queryParams="queryParams"  @search="handleSearch"/>

    <div class="button-area">
    <el-button type="primary" @click="openForm(null)">
        <i class="fa-solid fa-plus"></i> 新增副本
    </el-button>
    <el-button type="danger">
        <i class="fa-solid fa-trash"></i> 批量删除
    </el-button>
    <el-button type="warning">
        <i class="fa-solid fa-file-export"></i> 导出Excel
    </el-button>
    </div>

    <BookcopyTable
              :pagination="pagination"
             @page-change="handlePageChange"  
             @size-change="handleSizeChange"  
            @edit="openForm"
            @delete="handleDelete"
    />
    <BookcopyForm
            v-model:visible="showForm"
            :bookcopy-data="currentBookcopy"
            @submit="handleSubmit"
    />
</el-main>
    `,
    setup() {
        // 使用 Vue 的 ref 函数创建响应式数据
        //  pagination 分页查询结果
        const pagination = Vue.reactive({})
        const showForm = Vue.ref(false)
        const currentBookcopy = Vue.ref(null)
        const queryParams = Vue.reactive({
            pageSize: 10, currentPage:1
        })

        // 组合式函数 - 数据获取
        const fetchData = () => {
            axiosInstance.post(`${bookcopyApi}/query`, queryParams)
                .then(response => {
                    // 将获取到的数据赋值给 pagination
                    Object.assign(pagination, response.data);
                })
        }

        // 提交表单时的处理函数
        const handleSubmit = (formData) => {
            if (formData.copyId) {
                console.log(formData)
                // 更新图书副本信息
                axiosInstance.put(bookcopyApi, formData)
                    .then(response => {
                        message.success('图书副本更新成功');
                        showForm.value = false
                        // 刷新表格数据
                        fetchData()
                    })
                    .catch(error => {
                        showForm.value = true
                    });
            } else {
                // 添加新图书副本
                axiosInstance.post(bookcopyApi, formData)
                    .then(response => {
                        message.success('图书副本添加成功');
                        showForm.value = false
                        // 重置查询参数
                        clearObjectProps(queryParams)
                        fetchData()
                    })
                    .catch(error => {
                        console.log(error.message)
                        showForm.value = true
                    });
            }
        }

        // 打开表单时的处理函数
        const openForm = (bookcopy) => {
            // 如果有 bookcopy 参数，则复制其属性到 currentBookcopy
            currentBookcopy.value = bookcopy ? {...bookcopy} : null
            // 显示表单
            showForm.value = true
        }

        // 删除图书副本的处理函数
        const handleDelete = (id) => {
            ElementPlus.ElMessageBox.confirm('确定要删除该图书副本吗？','确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`${bookcopyApi}/${id}`)
                    .then(response => {
                        message.success('图书副本删除成功');
                        fetchData()
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

        // 每页条数改变事件
        const handleSizeChange = (size) => {
            queryParams.pageSize = size;
            queryParams.currentPage = 1; // 更换每页条数回首页
            fetchData();
        };
        // 在组件挂载时获取数据
        onMounted(() => {
            fetchData()
            }
        )
        // 返回创建的函数和数据，供模板使用
        return { pagination, showForm, queryParams,
            handlePageChange, handleSizeChange,
            currentBookcopy, handleSearch,openForm,handleDelete,handleSubmit};
    }
};
