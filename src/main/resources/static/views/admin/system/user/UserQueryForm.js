const UserQueryForm = {
    name: 'BookQueryForm', template: `  
  <div class="search-area">
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-input v-model="queryParams.username" placeholder="用户名" class="search-input"/>
        <el-input v-model="queryParams.email" placeholder="email地址" class="search-input"/>
        <el-input v-model="queryParams.mobilePhone" placeholder="移动电话" class="search-input"/>
        <el-select  v-model="queryParams.status" placeholder="用户状态" class="search-input" clearable>
            <el-option label="停用" value="0"></el-option>
            <el-option label="激活" value="1"></el-option>
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