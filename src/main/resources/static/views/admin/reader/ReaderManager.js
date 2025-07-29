// 定义 BookCategoryManager 组件
const readerApi='/api/admin/reader'

const ReaderManager = {
    name: 'ReaderManager',
    components: {
        ReaderForm: ReaderForm, // 局部注册 ReaderForm 组件
        ReaderTable: ReaderTable, // 局部注册 ReaderTable 组件
        ReaderQueryForm: ReaderQueryForm
    },
    template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>读者管理</el-breadcrumb-item>
    </el-breadcrumb>

    <ReaderQueryForm :queryParams="queryParams"  @search="handleSearch"/>

    <div class="button-area">
    <el-button type="primary" @click="openForm(null)">
        <i class="fa-solid fa-plus"></i> 新增
    </el-button>
    <el-button type="danger">
        <i class="fa-solid fa-trash"></i> 批量删除
    </el-button>
    <el-button type="warning">
        <i class="fa-solid fa-trash"></i> 批量停用
    </el-button>
    </div>

    <ReaderTable
            :readers="readers"
            @edit="openForm"
            @delete="handleDelete"
    />
    <ReaderForm
            v-model:visible="showForm"
            :reader-data="currentReader"
            @submit="handleSubmit"
    />
</el-main>
    `,
    setup() {
        // 使用 Vue 的 ref 函数创建响应式数据
        const readers = Vue.ref([])
        const showForm = Vue.ref(false)
        const currentReader = Vue.ref(null)
        const queryParams = Vue.reactive({})

        // 组合式函数 - 数据获取
        const fetchData = () => {
            axiosInstance.post(`${readerApi}/query`, queryParams)
                .then(response => {
                    readers.value = response.data;
                })
        }

        // 提交表单时的处理函数
        const handleSubmit = (formData) => {
            if (formData.readerId) {
                console.log(formData)
                // 更新读者信息
                axiosInstance.put(readerApi, formData)
                    .then(response => {
                        message.success('读者更新成功');
                        showForm.value = false
                        // 刷新表格数据
                        fetchData()
                    })
                    .catch(error => {
                        showForm.value = true
                    });
            } else {
                // 添加新读者
                axiosInstance.post(readerApi, formData)
                    .then(response => {
                        message.success('读者添加成功');
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
        const openForm = (reader) => {
            // 如果有 reader 参数，则复制其属性到 currentReader
            currentReader.value = reader ? {...reader} : null
            // 显示表单
            showForm.value = true
        }

        // 删除读者的处理函数
        const handleDelete = (id) => {
            ElementPlus.ElMessageBox.confirm('确定要删除该读者吗？','确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`${readerApi}/${id}`)
                    .then(response => {
                        message.success('读者删除成功');
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

        // 在组件挂载时获取数据
        onMounted(() => {
            fetchData()
            }
        )
        // 返回创建的函数和数据，供模板使用
        return { readers, showForm, queryParams, currentReader, handleSearch,openForm,handleDelete,handleSubmit};
    }
};
