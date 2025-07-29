// 定义 BookCategoryManager 组件
const deptApi='/api/admin/manage/dept'

const DeptManager = {
    name: 'DeptManager',
    components: {
        DeptForm: DeptForm, // 局部注册 DeptForm 组件
        DeptTable: DeptTable, // 局部注册 DeptTable 组件
        DeptQueryForm: DeptQueryForm
    },
    template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>

    <DeptQueryForm :queryParams="queryParams"  @search="handleSearch"/>

    <div class="button-area">
    <el-button type="primary" @click="openForm(null)">
        <i class="fa-solid fa-plus"></i> 新增
    </el-button>
    <el-button type="danger">
        <i class="fa-solid fa-trash"></i> 删除
    </el-button>
 
    </div>

    <DeptTable
            :depts="depts"
            @edit="openForm"
            @delete="handleDelete"
    />
    <DeptForm
            v-model:visible="showForm"
            :dept-data="currentDept"
            @submit="handleSubmit"
    />
</el-main>
    `,
    setup() {
        // 使用 Vue 的 ref 函数创建响应式数据
        const depts = Vue.ref([])
        const showForm = Vue.ref(false)
        const currentDept = Vue.ref(null)
        const queryParams = Vue.reactive({})

        // 组合式函数 - 数据获取
        const fetchData = () => {
            axiosInstance.post(`${deptApi}/query`, queryParams)
                .then(response => {
                    depts.value = response.data;
                })
        }

        // 提交表单时的处理函数
        const handleSubmit = (formData) => {
            if (formData.deptId) {
                console.log(formData)
                // 更新部门信息
                axiosInstance.put(deptApi, formData)
                    .then(response => {
                        message.success('部门更新成功');
                        showForm.value = false
                        // 刷新表格数据
                        fetchData()
                    })
                    .catch(error => {
                        showForm.value = true
                    });
            } else {
                // 添加新部门
                axiosInstance.post(deptApi, formData)
                    .then(response => {
                        message.success('部门添加成功');
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
        const openForm = (dept) => {
            // 如果有 dept 参数，则复制其属性到 currentDept
            currentDept.value = dept ? {...dept} : null
            // 显示表单
            showForm.value = true
        }

        // 删除部门的处理函数
        const handleDelete = (id) => {
            ElementPlus.ElMessageBox.confirm('确定要删除该部门吗？','确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`${deptApi}/${id}`)
                    .then(response => {
                        message.success('部门删除成功');
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
        return { depts, showForm, queryParams, currentDept, handleSearch,openForm,handleDelete,handleSubmit};
    }
};
