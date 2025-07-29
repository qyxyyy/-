const BookQueryForm = {
    name: 'BookQueryForm', template: `  
  <div class="search-area">
    <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-input v-model="query.title" placeholder="图书名" class="search-input"/>
        <el-input v-model="query.author" placeholder="作者" class="search-input"/>
        <el-input v-model="query.isbn" placeholder="ISBN号" class="search-input"/>
        <el-input v-model="query.publisher" placeholder="出版社" class="search-input"/>
        <el-select v-model="query.categoryId" placeholder="类别" class="search-input">
            <el-option v-for="category in categories" :key="category.categoryId"
                       :label="category.categoryName " :value="category.categoryId"></el-option>
        </el-select>

        <el-select  v-model="query.status" placeholder="图书状态" class="search-input">
            <el-option label="未上架" value="0"></el-option>
            <el-option label="在馆" value="1"></el-option>
            <el-option label="借出" value="2"></el-option>
        </el-select>
        <el-button type="primary" style="margin-bottom: 10px" @click="onSearch"><i class="fa-solid fa-magnifying-glass"></i>查询</el-button>
          <el-button @click="onReset" style="margin-bottom: 10px"  type="success"> <i class="fa-solid fa-rotate-right"></i> 重置 </el-button>
    </el-form>
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