const BorrowRecordQueryForm = {
    name: 'BorrowRecordQueryForm', template: `  
  <div class="search-area">
    <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-input v-model="query.readerName" placeholder="读者姓名" class="search-input"/>
        <el-input v-model="query.readerNumber" placeholder="读者ID" class="search-input"/>
        <el-input v-model="query.bookName" placeholder="图书名" class="search-input"/>
        <el-input v-model="query.copyBarcode" placeholder="副本条形码" class="search-input"/>
        <el-button type="primary" style="margin-bottom: 10px" @click="onSearch"><i class="fa-solid fa-magnifying-glass"></i>查询</el-button>
          <el-button @click="onReset" style="margin-bottom: 10px"  type="info"> <i class="fa-solid fa-rotate-right"></i> 重置 </el-button>
    </el-form>
  <div style="display: flex; gap: 10px; margin-left: auto;">  
      <el-button type="success" style="margin-bottom: 10px"
       @click="$emit('openBorrowDialog')"><i class="fa-solid fa-magnifying-glass"></i>借书</el-button>
      <el-button type="warning" style="margin-bottom: 10px" @click="$emit('openReturnBookDialog')"><i class="fa-solid fa-magnifying-glass"></i>批量还书</el-button>
    </div>
 </div>
    `, props: {
        categories: {
            type: Array, default: () => []
        }
    }, emits: ['search'], setup(props, {emit}) {
        const query = Vue.ref({})
        const onSearch = () => {
            emit('search', {...query.value});
        }

        const onReset = () => {
            query.value = {};
            emit('search', {}) // 重置时也可自动搜索全部
        }

        // 返回表单数据及方法
        return {query, onSearch, onReset};
    }
};  