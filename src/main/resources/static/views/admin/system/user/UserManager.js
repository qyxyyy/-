// 定义 BookCategoryManager 组件
const userApi='/api/admin/manage/user'

const UserManager = {
    name: 'UserManager',
    components: {
        UserForm: UserForm, // 局部注册 UserForm 组件
        UserTable: UserTable, // 局部注册 UserTable 组件
        UserQueryForm: UserQueryForm
    },
    template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <UserQueryForm :queryParams="queryParams"  @search="handleSearch"/>

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

    <UserTable
            :users="users"
            @edit="openForm"
            @delete="handleDelete"
    />
    <UserForm
            v-model:visible="showForm"
            :user-data="currentUser"
            @submit="handleSubmit"
    />
</el-main>
    `,
    setup() {
        // 使用 Vue 的 ref 函数创建响应式数据
        const users = Vue.ref([])
        const showForm = Vue.ref(false)
        const currentUser = Vue.ref(null)
        const queryParams = Vue.reactive({})

        // 组合式函数 - 数据获取
        const fetchData = () => {
            axiosInstance.post(`${userApi}/query`, queryParams)
                .then(response => {
                    users.value = response.data;
                })
        }

        // 提交表单时的处理函数
        const handleSubmit = (formData) => {
            if (formData.userId) {
                console.log(formData)
                // 更新用户信息
                axiosInstance.put(userApi, formData)
                    .then(response => {
                        message.success('用户更新成功');
                        showForm.value = false
                        // 刷新表格数据
                        fetchData()
                    })
                    .catch(error => {
                        showForm.value = true
                    });
            } else {
                // 添加新用户
                axiosInstance.post(userApi, formData)
                    .then(response => {
                        message.success('用户添加成功');
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
        const openForm = (user) => {
            // 如果有 user 参数，则复制其属性到 currentUser
            currentUser.value = user ? {...user} : null
            // 显示表单
            showForm.value = true
        }

        // 删除用户的处理函数
        const handleDelete = (id) => {
            ElementPlus.ElMessageBox.confirm('确定要删除该用户吗？','确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`${userApi}/${id}`)
                    .then(response => {
                        message.success('用户删除成功');
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
        return { users, showForm, queryParams, currentUser, handleSearch,openForm,handleDelete,handleSubmit};
    }
};
