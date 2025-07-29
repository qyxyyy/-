// 定义 BookCategoryManager 组件
const roleApi='/api/admin/manage/role'

const RoleManager = {
    name: 'RoleManager',
    components: {
        RoleForm: RoleForm, // 局部注册 RoleForm 组件
        RoleTable: RoleTable, // 局部注册 RoleTable 组件
        RoleQueryForm: RoleQueryForm
    },
    template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <RoleQueryForm  :queryParams="queryParams"  @search="handleSearch"/>

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

    <RoleTable
            :roles="roles"
            @edit="openForm"
            @delete="handleDelete"
    />
    <RoleForm
            v-model:visible="showForm"
            :role-data="currentRole"
            @submit="handleSubmit"
    />
</el-main>
    `,
    setup() {
        // 使用 Vue 的 ref 函数创建响应式数据
        const roles = Vue.ref([])
        const showForm = Vue.ref(false)
        const currentRole = Vue.ref(null)
        const queryParams = Vue.reactive({})

        // 组合式函数 - 数据获取
        const fetchData = () => {
            axiosInstance.post(`${roleApi}/query`, queryParams)
                .then(response => {
                    // 将获取到的数据赋值给 role
                    roles.value = response.data;
                })
        }

        // 提交表单时的处理函数
        const handleSubmit = (formData) => {
            if (formData.roleId) {
                // 更新角色信息
                axiosInstance.put(roleApi, formData)
                    .then(response => {
                        message.success('角色更新成功');
                        showForm.value = false
                        // 刷新表格数据
                        fetchData()
                    })
                    .catch(error => {
                        // 处理错误的处理
                        showForm.value = true
                    });
            } else {
                // 添加新角色
                axiosInstance.post(roleApi, formData)
                    .then(response => {
                        message.success('角色添加成功');
                        showForm.value = false
                        // 重置查询参数,刷新表格
                        clearObjectProps(queryParams)
                        fetchData()
                    })
                    .catch(error => {
                        //这里会捕获到拦截器抛出的 Error 对象
                        console.log(error.message)
                        showForm.value = true
                    });
            }
        }

        // 打开表单时的处理函数
        const openForm = (role) => {
            // 如果有 role 参数，则复制其属性到 currentRole
            currentRole.value = role ? {...role} : null
            // 显示表单
            showForm.value = true
        }

        // 删除角色的处理函数
        const handleDelete = (id) => {

            ElementPlus.ElMessageBox.confirm('确定要删除该角色吗？','确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`${roleApi}/${id}`)
                    .then(response => {
                        message.success('角色删除成功');
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

        // 在组件挂载时获取数据
        onMounted(() => {
            fetchData()
            }
        )
        // 返回创建的函数和数据，供模板使用

        return { roles, showForm, queryParams, currentRole ,handleSearch,openForm,handleDelete,handleSubmit};
    }
};
