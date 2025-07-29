// 定义一个名为 RoleForm 的对象，用作 Vue 组件
const BorrowDialog = {
    // 组件名称
    name: 'BorrowDialog', // 组件模板
    template: `  
  <el-dialog v-model="visible" title="借书"
           width="960" @close="close">
    <div class="container">  
    <!-- 1. 顶部读者编号查询 -->  
    <div class="row-card row-shadow" style="margin-bottom: 18px;">  
      <span class="label">读者编号：</span>  
      <el-input  
        v-model="reader.readerNumber"  
        class="input-main"  
        placeholder="输入/查询"  
        size="small"  
      />  
      <el-button type="primary" @click="fetchReader" class="search-btn" size="small">查找</el-button>  
    </div>  

    <!-- 2. 读者信息绿色栏 -->  
    <div class="reader-info" v-if="reader.name">  
      <span>姓名: <strong>{{ reader.name }}</strong></span>  
      <span> | 学号: {{ reader.readerNumber }}</span>
      <span> | 学号: {{ reader.gradeMajor }}</span>    
      <span> | 学院: {{ reader.deptName }}</span>  
      <span> | 可借({{ reader.borrowCount}}/{{  
        reader.borrowLimit}})</span>  
    </div>  

    <!-- 3. 副本号录入 -->  
    <div class="row-card row-shadow" style="margin-bottom: 12px;align-items:flex-start;">  
      <span class="label">副本号录入：</span>  
      <el-input  
        v-model="copyInput"  
        placeholder="输入副本编号（回车/逗号批量）"  
        size="small"  
        class="input-copies"  
      />  
      <el-button  
        type="success"  
        size="small"  
        style="margin-left: 12px"  
        @click="onAdd"  
      >添加</el-button>  
      <span class="hint">（建议：可一次性录入多个副本号）</span>  
    </div>  

    <!-- 4. 表格 -->  
    <el-table  
      :data="tableData"  
      border  
      class="borrow-table"  
      header-cell-class-name="th-style"  
      style="margin-bottom: 18px"  
    >  
      <el-table-column prop="barcode" label="副本号" align="center" width="100"/>  
      <el-table-column prop="title" label="书名" align="center" width="160"/>  
      <el-table-column prop="isbn" label="ISBN" align="center" width="160"/>  
      <el-table-column prop="author" label="作者" align="center" width="120"/>  
      <el-table-column prop="publisher" label="出版社" align="center" width="120"/>  
      <el-table-column prop="status" label="状态" align="center" width="80">  
        <template #default="{ row }">  
          <el-tag v-if="row.status==='可借'" type="success" size="small">可借</el-tag>  
          <el-tag v-else type="danger" size="small">已借出</el-tag>  
        </template>  
      </el-table-column>  
      <el-table-column label="操作" width="100" align="center">  
        <template #default="{ $index }">  
          <el-button size="small" type="danger" @click="onRemove($index)">移除</el-button>  
        </template>  
      </el-table-column>  
    </el-table>  

    <!-- 5. 底部按钮 -->  
    <div class="footer-btns">  
      <el-button type="info" plain @click="onClear">清空全部</el-button>  
      <el-button type="primary" @click="onBorrow">确认借阅</el-button>  
    </div>  
   </div> 
  </el-dialog>
  `, components: {
    }, // 组件属性
    props: {
        // 控制表单弹窗的显示与隐藏
        visible: {
            type: Boolean, default: false
        }, // 从父组件传入的借阅记录数据

    }, // 自定义事件
    emits: ['update:visible', 'submit'], // 组件设置函数

    setup(props, {emit}) {


        const reader = reactive({});

        const copyInput = ref("");
        const tableData = ref([
            // {
            //     copyNo: "CP000151",
            //     title: "Java核心技术",
            //     isbn: "978-7-115-12345-6",
            //     author: "Cay Horstmann",
            //     publisher: "机械工业",
            //     status: "可借",
            // },
            // {
            //     copyNo: "CP000158",
            //     title: "Java核心技术",
            //     isbn: "978-7-115-12345-6",
            //     author: "Cay Horstmann",
            //     publisher: "机械工业",
            //     status: "已借出",
            // },
        ]);
        const onAdd = () => {
            if (!copyInput.value) return;
            // 发送请求到后端获取副本数据
            axiosInstance.get('/api/admin/bookcopy/copyInfo/'+ copyInput.value)
                .then(response => {
                    tableData.value.push(response.data);
                    // Object.assign(tableData, response.data)

                })
                 .catch(error => {
                    message.error(error);
                });

            copyInput.value = "";
        };
        const onRemove = (idx) => {
            tableData.value.splice(idx, 1);
        };
        const onClear = () => {
            tableData.value = [];
        };
        const onBorrow = () => {
            // do something
            // 提交读者编号和所有的副本id给后端
            axiosInstance.post('/api/admin/borrow/borrowRecord', {
                readerNumber: reader.readerId,
                copyIds: tableData.value.map(item => item.copyId)
            })
            .then(response => {
                    message.success('借阅成功');
                    close();
             })
             .catch(error => {
                    message.error(error);
            });
        };

        const fetchReader = () => {
             axiosInstance.get('/api/admin/reader/readerInfo/'+ reader.readerNumber)
                .then(response => {
                    Object.assign(reader, response.data)
                })
                 .catch(error => {
                    message.error(error);
                });
        };

        // 提交表单
        const submitForm = () => {
            emit('submit', {...formData.value});
        };


        // 关闭弹框
        const close = () => {
            emit('update:visible', false);
        };


        // 返回表单数据及方法
        return {
            reader,
            fetchReader,
            submitForm,
            close,
            copyInput,
            tableData,
            onAdd,
            onRemove,
            onClear,
            onBorrow,

        };
    }
};
