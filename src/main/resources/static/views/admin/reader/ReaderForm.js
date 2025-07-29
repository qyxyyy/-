// 定义一个名为 RoleForm 的对象，用作 Vue 组件
const ReaderForm = {
    // 组件名称
    name: 'ReaderForm', // 组件模板
    template: `  
       
<el-dialog v-model="visible" :title="formData.readerId ? '编辑读者' : '添加读者'"
           width="720" @close="close">
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
        <el-form-item label="学号/工号" prop="readerNumber">
          <el-input v-model="formData.readerNumber" placeholder="请输学号/工号"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入读者姓名"/>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第二行：ISBN 和出版社 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="性别" prop="gender" >
          <el-radio-group v-model="formData.gender">
            <el-radio :label="M">M-男</el-radio>
            <el-radio :label="F">F-女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      
     <el-col :span="12">
        <el-form-item label="读者类型" prop="type" >
          <el-radio-group v-model="formData.type">
            <el-radio :label="1">学生</el-radio>
            <el-radio :label="2">职工</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>


   <!-- 第一行：书名和作者 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="formData.email" placeholder="请输如电子邮箱"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入联系电话"/>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第3行：ISBN 和出版社 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="专业" prop="gradeMajor">
          <el-input v-model="formData.gradeMajor" placeholder="请输入专业"/>
        </el-form-item>
      </el-col>
     <el-col :span="12">
        <el-form-item label="读者状态" prop="status" >
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">停用</el-radio>
            <el-radio :label="1">激活</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    
 <!-- 读者简介 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入备注"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 头像上传 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="个人相片">
          <div class="form-group full-width">  
          <image-upload :fileUrl="formData.avatarUrl"
                        @upload-success="handleCoverUpload"
                        @delete-success="handleCoverDelete">
          </image-upload>
          </div>
        </el-form-item>
      </el-col>
    </el-row>

    
  </el-form>
  <template #footer>
    <div style="text-align: right; padding: 10px;">
<!--      <el-button @click="resetForm">重置</el-button>-->
      <el-button type="primary" @click="submitForm">{{formData.readerId ? '更新读者' : '添加读者'}}</el-button>
    </div>
  </template>
</el-dialog>
  `, components: {
        ImageUpload
    }, // 组件属性
    props: {
        // 控制表单弹窗的显示与隐藏
        visible: {
            type: Boolean, default: false
        }, // 从父组件传入的读者数据
        readerData: {
            type: Object, default: () => ({})
        }
    }, // 自定义事件
    emits: ['update:visible', 'submit'], // 组件设置函数

    setup(props, {emit}) {

        // 表单数据的初始值
        const initialValue = {
            readername: 'testReader1',
            email: 'testReader1@za.com.cn',
            mobilePhone: '1345678901',
            remark: '这是读者简介,系统管理员',
            status: 1,
        }

        //  表单数据
        const formData = Vue.ref({})

        // 表单验证规则
        const rules = ref({
            readername: [{required: true, message: '请输入读者名', trigger: 'blur'}],
            email: [{required: true, message: '请输入email地址', trigger: 'blur'},],
        })

        // 提交表单
        const submitForm = () => {
            emit('submit', {...formData.value});
        };

        // 图片上传成功回调
        const handleCoverUpload = (uploadFile) => {
            console.log("图片上传完成");
            // 将上传成功的文件 URL 赋值给 formData.coverUrl
            formData.value.avatarUrl = uploadFile.fileUrl;
        };
        // 图片删除成功回调
        const handleCoverDelete = () => {
            // 将文件 URL 赋值给 formData.coverUrl
            formData.value.avatarUrl = '';
        };


        // 关闭弹框
        const close = () => {
            emit('update:visible', false);
        };

        // 监听 readerData 的变化，同步更新表单数据
        // 监听 readerData 的变化，同步更新表单数据
        Vue.watch(() => props.readerData, (newReaderData) => {
            formData.value = newReaderData ? {...newReaderData} : {...initialValue};
        }, {immediate: true});


        // 返回表单数据及方法
        return {
            formData,
            rules,
            submitForm,
            close,
            handleCoverUpload,
            handleCoverDelete,
        };
    }
};
