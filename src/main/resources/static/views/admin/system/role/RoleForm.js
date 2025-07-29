// 定义一个名为 RoleForm 的对象，用作 Vue 组件
const RoleForm = {
    // 组件名称
    name: 'RoleForm', // 组件模板
    template: `  
       
<el-dialog v-model="visible" :title="formData.roleId ? '编辑角色' : '添加角色'"
           width="860" @close="close">
  <el-form
     ref="roleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      label-position="right"
      size="default"
  >
    <!-- 第一行：书名和作者 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="角色名" prop="title">
          <el-input v-model="formData.roleName" placeholder="请输角色名"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="角色编码" prop="author">
          <el-input v-model="formData.roleCode" placeholder="请输入角色编码"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
   
     <el-col :span="12">
        <el-form-item label="角色状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">停用</el-radio>
            <el-radio :label="1">激活</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    
 <!-- 角色简介 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="角色简介" prop="description">
          <el-input
              v-model="formData.description"
              type="textarea"
              :rows="3"
              placeholder="请输入角色简介"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <template #footer>
    <div style="text-align: right; padding: 10px;">
<!--      <el-button @click="resetForm">重置</el-button>-->
      <el-button type="primary" @click="submitForm">{{formData.roleId ? '更新角色' : '添加角色'}}</el-button>
    </div>
  </template>
</el-dialog>
  `,
    props: {
        // 控制表单弹窗的显示与隐藏
        visible: {
            type: Boolean, default: false
        }, // 从父组件传入的角色数据
        roleData: {
            type: Object, default: () => ({})
        }
    }, // 自定义事件
    emits: ['update:visible', 'submit'], // 组件设置函数

    setup(props, {emit}) {

        // 表单数据的初始值
        const initialValue = {
            roleName: '测试角色1',
            roleCode: 'TESTER',
            description: '这是角色简介,系统管理员',
            status: 1,
        }

        //  表单数据
        const formData = Vue.ref({})

        // 表单验证规则
        const rules = ref({
            roleName: [{required: true, message: '请输入角色名', trigger: 'blur'}],
            roleCode: [{required: true, message: '请输入角色名', trigger: 'blur'},],
        })

        // 提交表单
        const submitForm = () => {
            emit('submit', {...formData.value});
        };


        // 关闭弹框
        const close = () => {
            emit('update:visible', false);
        };

        // 监听 roleData 的变化，同步更新表单数据
        Vue.watch(() => props.roleData, (newRoleData) => {
            formData.value = newRoleData ? {...newRoleData} : {...initialValue};
        }, {immediate: true});

        // 返回表单数据及方法
        return {
            formData,
            rules,
            submitForm,
            close
        };
    }
};
