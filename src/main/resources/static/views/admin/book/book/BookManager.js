// 定义 BookManager 组件
const bookApi='/api/admin/book'
const BookManager = {
    name: 'BookManager',
    components: {
        BookForm, // 局部注册 BookForm 组件
        BookTable, // 局部注册 BookTable 组件
        BookQueryForm
    },
    template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>当前页面</el-breadcrumb-item>
    </el-breadcrumb>
    <BookQueryForm :categories="categories" @search="handleSearch"/>
    <div class="button-area">
    <el-button type="primary" @click="openForm(null)">
        <i class="fa-solid fa-plus"></i> 新增
    </el-button>
    <el-button type="danger">
        <i class="fa-solid fa-trash"></i> 删除
    </el-button>
    <el-button type="success">
        <i class="fa-solid fa-upload"></i> 上架
    </el-button>
    </div>

    <BookTable
            :pagination="pagination"
             @page-change="handlePageChange"  
             @size-change="handleSizeChange"  
            @edit="openForm"
            @delete="handleDelete"
    />
    <BookForm
            v-model:visible="showForm"
            :book-data="currentBook"
            :categories="categories"
            @submit="handleSubmit"
    />
</el-main>
    `,
    setup() {
        // 使用 Vue 的 ref 函数创建响应式数据
        const pagination = Vue.reactive({})
        const categories = Vue.ref([])
        const showForm = Vue.ref(false)
        const currentBook = Vue.ref(null)
        const queryParams = Vue.reactive({
            pageSize: 10, currentPage:1
        })

        // 组合式函数 - 数据获取
        const fetchData = () => {
            axiosInstance.post(`${bookApi}/query`, queryParams)
                .then(response => {
                    console.log("response", response.data)
                    // 将获取到的数据赋值给 pagination
                    Object.assign(pagination, response.data);
                })
        }

        // 提交表单时的处理函数
        const handleSubmit = (formData) => {
            if (formData.bookId) {
                // 更新图书信息
                axiosInstance.put('/api/admin/book/', formData)
                    .then(response => {
                        message.success('图书更新成功');
                        showForm.value = false
                        fetchData({})
                    })
                    .catch(error => {
                        // 处理错误的处理
                        showForm.value = true
                    });
            } else {
                // 添加新图书
                axiosInstance.post(`/api/admin/book/`, formData)
                    .then(response => {
                        message.success('图书添加成功');
                        showForm.value = false
                        fetchData({})
                    })
                    .catch(error => {
                        //这里会捕获到拦截器抛出的 Error 对象
                        console.log(error.message)
                        showForm.value = true
                    });
            }
        }

        // 打开表单时的处理函数
        const openForm = (book) => {
            // 如果有 book 参数，则复制其属性到 currentBook
            currentBook.value = book ? {...book} : null
            fetchCategory()
            // 显示表单
            showForm.value = true
        }

        // 删除图书的处理函数
        const handleDelete = (id) => {

            ElementPlus.ElMessageBox.confirm('确定要删除该附件吗？','确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`/api/admin/book/${id}`)
                    .then(response => {
                        message.success('图书删除成功');
                        fetchData({})
                    })
            })
        }

        const fetchCategory = () => {
            axiosInstance.get('/api/admin/bookCategory/listByStatus/1')
                .then(response => {
                    categories.value = response.data;
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
            fetchCategory()
            console.log("cc", pagination)
            }
        )
        // 返回创建的函数和数据，供模板使用

        // return {books, showForm, currentBook, openForm, categories, handleDelete, handleSubmit,handleSearch};
        return {pagination, showForm,
            handlePageChange, handleSizeChange,
            currentBook,handleSearch,categories,openForm,handleDelete,handleSubmit};
    }
};
