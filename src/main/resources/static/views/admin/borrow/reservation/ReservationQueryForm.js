const BookcopyQueryForm = {
    name: 'BookQueryForm', template: `  
  <div class="search-area">
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-input v-model="queryParams.barcode" placeholder="副本条形码" class="search-input" clearable/>
        <el-input v-model="queryParams.bookName" placeholder="书名" class="search-input" clearable/>
        <el-input v-model="queryParams.location" placeholder="馆藏位置" class="search-input" clearable/>
        <el-select  v-model="queryParams.status" placeholder="副本状态" class="search-input" clearable>
            <el-option label="在库" value="0"></el-option>
            <el-option label="借出" value="1"></el-option>
            <el-option label="遗失" value="2"></el-option>
        </el-select>
        <el-button type="primary" style="margin-bottom: 10px" @click="onSearch"><i class="fa-solid fa-magnifying-glass"></i>查询</el-button>
          <el-button @click="onReset" style="margin-bottom: 10px"  type="success"> <i class="fa-solid fa-rotate-right"></i> 重置 </el-button>
    </el-form>
 </div>
    `,
    props: {
        queryParams: {
            type: Object
        }
    },
    emits: ['search'],
    setup(props, {emit}) {
        const onSearch = () => {
            emit('search', {...props.queryParams});
        }
        const onReset = () => {
            emit('search', {}) // 重置时也可自动搜索全部
        }
        return {onSearch, onReset};
    }
};  