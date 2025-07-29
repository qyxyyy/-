// 定义一个名为 RoleForm 的对象，用作 Vue 组件
const DeptForm = {
    // 组件名称
    name: 'DeptForm', // 组件模板
    template: `  
<el-dialog v-model="visible" :title="formData.deptId ? '编辑部门' : '添加部门'"
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
        <el-form-item label="部门名" prop="title">
          <el-input v-model="formData.name" placeholder="请输部门名"/>
        </el-form-item>
      </el-col>
       <el-col :span="12">
        <el-form-item label="负责人" prop="isbn">
          <el-input v-model="formData.manager" placeholder="请输入负责人姓名"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
   
     <el-col :span="12">
        <el-form-item label="部门状态" prop="status" >
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">停用</el-radio>
            <el-radio :label="1">激活</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    
 <!-- 部门简介 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="部门简介" prop="remark">
          <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入部门简介"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <template #footer>
    <div style="text-align: right; padding: 10px;">
<!--      <el-button @click="resetForm">重置</el-button>-->
      <el-button type="primary" @click="submitForm">{{formData.deptId ? '更新部门' : '添加部门'}}</el-button>
    </div>
  </template>
</el-dialog>
  `,
    props: {
        // 控制表单弹窗的显示与隐藏
        visible: {
            type: Boolean, default: false
        }, // 从父组件传入的部门数据
        deptData: {
            type: Object, default: () => ({})
        }
    }, // 自定义事件
    emits: ['update:visible', 'submit'], // 组件设置函数

    setup(props, {emit}) {

        // 表单数据的初始值
        const initialValue = {
            name: 'testDept1',
            manager: 'testDept1@za.com.cn',
            remark: '这是部门简介',
            status: 1,
        }

        //  表单数据
        const formData = Vue.ref({})

        // 表单验证规则
        const rules = ref({
            name: [{required: true, message: '请输入部门名', trigger: 'blur'}],
            manager: [{required: true, message: '请输入email地址', trigger: 'blur'},],
        })

        // 提交表单
        const submitForm = () => {
            emit('submit', {...formData.value});
        };


        // 关闭弹框
        const close = () => {
            emit('update:visible', false);
        };

        // 监听 deptData 的变化，同步更新表单数据
        // 监听 deptData 的变化，同步更新表单数据
        Vue.watch(() => props.deptData, (newDeptData) => {
            formData.value = newDeptData ? {...newDeptData} : {...initialValue};
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
