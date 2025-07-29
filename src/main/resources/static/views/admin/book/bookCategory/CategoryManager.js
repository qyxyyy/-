// 定义 CategoryManager 组件
const bookCategoryApi='/api/admin/bookCategory/'
const CategoryManager = {
    name: 'CategoryManager', components: {
        CategoryTable
    }, template: `
  <el-main>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>当前页面</el-breadcrumb-item>
    </el-breadcrumb>
<div class="form-container">
    <h3>{{ isEditing ? '编辑分类' : '新增分类' }}</h3>
     <el-form  @submit.prevent="handleSubmit" :model="formData" :rules="formRules" :inline="true" class="demo-form-inline" >
<!--    <el-form ref="formRef" :model="formData" :rules="formRules" @submit.prevent="handleSubmit">-->
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="formData.categoryName" placeholder="请输入分类名称" class="search-input"></el-input>
      </el-form-item>
      
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择状态" class="search-input">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="停用" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类描述" prop="description">
        <el-input type="text" v-model="formData.description" placeholder="请输入描述信息" class="search-input"></el-input>
      </el-form-item>
   
        <el-button style="margin-bottom: 30px"  type="primary" native-type="submit">{{ isEditing ? '保存修改' : '添加分类' }}</el-button>
        <el-button style="margin-bottom: 30px" v-if="isEditing" type="default" @click="cancelEdit">取消</el-button>
    </el-form>
  </div>
  <!-- 表格组件 -->
    <CategoryTable 
      :categories="categories"
      @edit="handleEdit"
      @delete="handleDelete"
    />
 
</el-main>
    `, setup() {
        const categories = Vue.ref([])
        const isEditing = ref(false);
        const initialData = {
            categoryName: "AI人工智能", status: 1, description: "图强化学习算法"
        }
        const formData = ref(initialData);
        const formRules = ref({
            categoryName: [{required: true, message: '请输入分类名称', trigger: 'blur'}]
        })

        const handleSubmit = () => {
            if (formData.value.categoryId) {
                // 更新
                axiosInstance.put(bookCategoryApi, formData.value)
                    .then(response => {
                        message.success('类别更新成功');
                        fetchData();
                    })
            } else {
                // 添加
                axiosInstance.post(bookCategoryApi, formData.value)
                    .then(response => {
                        message.success('类别添加成功');
                        fetchData();
                    })
            }
        }

        const cancelEdit = () => {
            isEditing.value = false;
            formData.value = {...initialData};
        }
        const handleEdit = (category) => {
            isEditing.value = true;
            formData.value = {...category}
        }

        // 数据获取
        const fetchData = () => {
            axiosInstance.get(bookCategoryApi)
                .then(response => {
                    // 将获取到的数据赋值给 categories
                    categories.value = response.data;
                })
        }

        // 删除图书的处理函数
        const handleDelete = (id) => {
            ElementPlus.ElMessageBox.confirm('确定要删除该附件吗？', '确认删除',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                // 发送删除请求
                axiosInstance.delete(`${bookCategoryApi}${id}`)
                    .then(response => {
                        message.success('分类删除成功');
                        fetchData();
                    })
            })
        }

        // 在组件挂载时获取数据
        onMounted(() => {
            fetchData()
        })
        // 返回创建的函数和数据，供模板使用
        return {categories, isEditing, formRules, handleDelete, formData, handleSubmit, handleEdit, cancelEdit};
    }
};
