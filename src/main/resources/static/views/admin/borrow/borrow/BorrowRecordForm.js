// 定义一个名为 RoleForm 的对象，用作 Vue 组件
const BorrowRecordForm = {
    // 组件名称
    name: 'BorrowRecordForm', // 组件模板
    template: `  
       
<el-dialog v-model="visible" :title="formData.borrowRecordId ? '编辑借阅记录' : '添加借阅记录'"
           width="960" @close="close">
  <el-form
      :model="formData"
      :rules="rules"
      label-width="100px"
      label-position="right"
      size="default"
  >
    <!-- 第一行：书名和作者 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="书名" prop="title">
          <el-input v-model="formData.title" placeholder="请输入书名"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="作者" prop="author">
          <el-input v-model="formData.author" placeholder="请输入作者"/>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第二行：ISBN 和出版社 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="formData.isbn" placeholder="请输入ISBN"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="formData.publisher" placeholder="请输入出版社"/>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第三行：出版年份和语言 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="出版年份" prop="publicationYear">
          <el-input-number
              v-model="formData.publicationYear"
              :min="1900"
              :max="new Date().getFullYear()"
              placeholder="请输入出版年份"
              style="width: 100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="语言" prop="language">
          <el-select v-model="formData.language" placeholder="请选择语言">
            <el-option label="中文" value="中文"/>
            <el-option label="英文" value="英文"/>
            <el-option label="法文" value="法文"/>
            <el-option label="日文" value="日文"/>
            <el-option label="德文" value="德文"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第四行：类别和馆藏位置 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="类别" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择类别">
            <el-option
                v-for="category in categories"
                :key="category.categoryId"
                :label="category.categoryName"
                :value="category.categoryId"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="馆藏位置" prop="location">
          <el-select v-model="formData.location" placeholder="请选择馆藏位置">
            <el-option label="理科1室" value="理科1室"/>
            <el-option label="理科2室" value="理科2室"/>
            <el-option label="文科1室" value="文科1室"/>
            <el-option label="文科2室" value="文科2室"/>
            <el-option label="珍藏室" value="珍藏室"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第五行：副本数和可借数 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="副本数" prop="totalCopies">
          <el-input-number
              v-model="formData.totalCopies"
              :min="1"
              placeholder="请输入副本数"
              style="width: 100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="可借数" prop="availableCopies">
          <el-input-number
              v-model="formData.availableCopies"
              :min="0"
              :max="formData.totalCopies"
              placeholder="请输入可借数"
              style="width: 100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 借阅记录状态 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="借阅记录状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">在馆</el-radio>
            <el-radio :label="2">外借</el-radio>
            <el-radio :label="3">未上架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 借阅记录简介 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="借阅记录简介" prop="description">
          <el-input
              v-model="formData.description"
              type="textarea"
              :rows="3"
              placeholder="请输入借阅记录简介"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 封面上传 -->
     

  </el-form>
  <template #footer>
    <div style="text-align: right; padding: 10px;">
<!--      <el-button @click="resetForm">重置</el-button>-->
      <el-button type="primary" @click="submitForm">{{formData.borrowRecordId ? '更新借阅记录' : '添加借阅记录'}}</el-button>
    </div>
  </template>
</el-dialog>
  `, components: {
        // FileUpload, ImageUpload
    }, // 组件属性
    props: {
        // 控制表单弹窗的显示与隐藏
        visible: {
            type: Boolean, default: false
        }, // 从父组件传入的借阅记录数据
        borrowRecordData: {
            type: Object, default: () => ({})
        }, categories: {
            type: Array, default: () => []
        }
    }, // 自定义事件
    emits: ['update:visible', 'submit'], // 组件设置函数

    setup(props, {emit}) {

        // 表单数据的初始值
        const initialValue = {
            title: '新增借阅记录1',
            isbn: '33332423423',
            author: '333',
            publisher: '中国文学出版社',
            publicationYear: 2023,
            language: '中文',
            categoryId: 1,
            totalCopies: 1,
            availableCopies: 1,
            location: '理科1室',
            status: 1,
        }

        //  表单数据
        const formData = Vue.ref({})

        // 表单验证规则
        const rules = ref({
            title: [{required: true, message: '请输入借阅记录标题', trigger: 'blur'}],
            isbn: [{required: true, message: '请输入 ISBN 号', trigger: 'blur'},],
            author: [{required: true, message: '请输入作者', trigger: 'blur'}],
        })


        // 提交表单
        const submitForm = () => {
            emit('submit', {...formData.value});
        };

        // 图片上传成功回调
        const handleCoverUpload = (uploadFile) => {
            console.log("图片上传完成");
            // 将上传成功的文件 URL 赋值给 formData.coverUrl
            formData.value.coverUrl = uploadFile.fileUrl;
        };
        // 图片删除成功回调
        const handleCoverDelete = () => {
            // 将文件 URL 赋值给 formData.coverUrl
            formData.value.coverUrl = '';
        };

        // 文件上传成功回调
        const handleAttachFileUpload = (uploadFile) => {
            formData.value.attachmentUrl = uploadFile.fileUrl;
        };

        // 文件删除成功回调
        const handleAttachFileDelete = () => {

            // 将文件 URL 赋值给 formData.coverUrl
            formData.value.attachmentUrl = '';
        };

        // 关闭弹框
        const close = () => {
            emit('update:visible', false);
        };

        // 监听 borrowRecordData 的变化，同步更新表单数据
        // 监听 borrowRecordData 的变化，同步更新表单数据
        Vue.watch(() => props.borrowRecordData, (newBorrowRecordData) => {
            formData.value = newBorrowRecordData ? {...newBorrowRecordData} : {...initialValue};
        }, {immediate: true});


        // 返回表单数据及方法
        return {
            formData,
            rules,
            submitForm,
            close,
            handleCoverUpload,
            handleCoverDelete,
            handleAttachFileUpload,
            handleAttachFileDelete,
        };
    }
};
