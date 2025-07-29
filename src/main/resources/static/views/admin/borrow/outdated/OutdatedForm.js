// 定义一个名为 RoleForm 的对象，用作 Vue 组件
const BookcopyForm = {
    // 组件名称
    name: 'BookcopyForm', // 组件模板
    template: `  
<el-dialog v-model="visible" :title="formData.copyId ? '编辑图书副本' : '添加图书副本'"
           width="720" @close="close">
  <el-form
      :model="formData"
      :rules="rules"
      label-width="100px"
      label-position="right"
      size="default"
  >
      <el-row :gutter="20">
    <!-- ISBN 下拉远程搜索 -->  
    <el-form-item label="ISBN" prop="isbn" required>  
      <el-select  
        v-model="formData.isbn"  
        filterable  
        remote  
        clearable  
        placeholder="请输入ISBN片段查找图书"  
        :remote-method="handleRemoteSearch"  
        :loading="loading"  
        @change="handleIsbnChange"  
        @blur="handleIsbnBlur"  
        style="width:280px"  
      >  
        <el-option  
          v-for="item in isbnOptions"  
          :key="item.isbn"  
           :label="item.isbn + '(' + item.title + ')'"    
          :value="item.isbn"  
        />  
      </el-select>  
    </el-form-item>  
    </el-row>
    
    
        <el-row :gutter="20">
     <el-col :span="12">
   <!-- 选中后显示图书详细 -->  
    <el-form-item v-if="isbnDetail" label="图书信息">  
      <el-descriptions :column="1" >  
        <el-descriptions-item label="书名" >{{ isbnDetail.title }}</el-descriptions-item>  
        <el-descriptions-item label="作者">{{ isbnDetail.author }}</el-descriptions-item>  
        <el-descriptions-item label="出版社">{{ isbnDetail.publisher }}</el-descriptions-item>  
      </el-descriptions>  
    </el-form-item>   
   </el-col>
    </el-row>
    
        <el-row :gutter="20">
   
      <el-form-item label="条形码" prop="barcode">  
        <el-input  
          v-model="formData.barcode"  
          placeholder="请输入或自动生成"  
          style="width:200px"  
        />  
        <el-button type="primary" style="margin-left:8px" @click="handleGenBarcode" :loading="barcodeLoading">  
          自动生成  
        </el-button>  
      </el-form-item>  
   
    </el-row>
    
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="副本状态" prop="status" >
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">在库</el-radio>
            <el-radio :label="1">借出</el-radio>
            <el-radio :label="2">遗失</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

      <el-row :gutter="20">
      <el-col :span="24">
             <el-form-item label="存放位置" prop="location">
          <el-input v-model="formData.location" placeholder="请输入存放位置"/>
        </el-form-item>
      </el-col>
      </el-row>
 <!-- 图书副本简介 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="图书副本简介" prop="remark">
          <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入图书副本简介"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <template #footer>
    <div style="text-align: right; padding: 10px;">
<!--      <el-button @click="resetForm">重置</el-button>-->
      <el-button type="primary" @click="submitForm">{{formData.bookcopyId ? '更新图书副本' : '添加图书副本'}}</el-button>
    </div>
  </template>
</el-dialog>
  `,
    props: {
        // 控制表单弹窗的显示与隐藏
        visible: {
            type: Boolean, default: false
        }, // 从父组件传入的图书副本数据
        bookcopyData: {
            type: Object, default: () => ({})
        }
    }, // 自定义事件
    emits: ['update:visible', 'submit'], // 组件设置函数

    setup(props, {emit}) {
        const loading = ref(false)
        const isbnOptions = ref([])
        const isbnDetail = ref(null)
        const barcodeLoading = ref(false)
        //  表单数据
        const formData = Vue.ref({})
        // 表单数据的初始值
        const initialValue = {
            barcode: 'testBookcopy1',
            location: 'testBookcopy1@za.com.cn',
            remark: '文科1室1书架',
            status: 0,
            isbn:'',
            bookId:'',
        }

        // 表单验证规则
        const rules = ref({
            name: [{required: true, message: '请输入图书副本名', trigger: 'blur'}],
            manager: [{required: true, message: '请输入email地址', trigger: 'blur'},],
        })


        // 自动生成条形码（从后端获取）
        const handleGenBarcode = () => {
            barcodeLoading.value = true
            axiosInstance.get('/api/admin/bookcopy/genBarCode')
                .then(res => {
                    formData.value.barcode = res.data
                    barcodeLoading.value = false
                })
                .catch(err => {
                    message.error('条形码生成失败')
                })
        }

        // 远程搜索（加防抖和长度校验）
        const handleRemoteSearch = _.debounce((query) => {
            if (!query || query.length > 10) {
                isbnOptions.value = []
                return
            }
            loading.value = true
            axiosInstance.post('/api/admin/book/isbn/options', {q: query})
                .then((res) => {
                    isbnOptions.value = res.data
                    loading.value = false
                    console.log(res.data)
                })
                .catch((err) => {
                    isbnOptions.value = []
                    message.error('图书查询失败')
                })
        }, 300)


        // 输入框失焦时，如内容变化也查详情（防止直接输入未选中）
        const handleIsbnBlur = () => {
            if (formData.isbn && !isbnDetail.value) {
                fetchIsbnDetail(form.isbn)
            }
        }

        // 选中下拉或手动输入后展示详情
        const handleIsbnChange = (val) => {
            fetchIsbnDetail(val)
        }

        // 获取isbn详细
        const fetchIsbnDetail = (isbn) => {
            axiosInstance.get('/api/admin/book/isbn/' + isbn)
                .then((res) => {
                    isbnDetail.value = res.data
                    formData.value.bookId = res.data.bookId;
                })
                .catch((err) => {
                    isbnDetail.value = null
                    message.error('图书查询失败')
                })
        }

        // 提交表单
        const submitForm = () => {
            emit('submit', {...formData.value});
        };


        // 关闭弹框
        const close = () => {
            emit('update:visible', false);
        };

        // 监听 bookcopyData 的变化，同步更新表单数据
        // 监听 bookcopyData 的变化，同步更新表单数据
        Vue.watch(() => props.bookcopyData, (newBookcopyData) => {
            formData.value = newBookcopyData ? {...newBookcopyData} : {...initialValue};
        }, {immediate: true});


        // 返回表单数据及方法
        return {
            formData,
            rules,
            submitForm,
            close,
            handleGenBarcode,
            handleRemoteSearch,
            handleIsbnBlur,
            handleIsbnChange,
            loading,
            isbnOptions,
            isbnDetail,
            barcodeLoading,
        };
    }
};
