const RoleQueryForm = {
    name: 'BookQueryForm', template: `  
  <div class="search-area">
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-input v-model="queryParams.roleCode" placeholder="角色编码" class="search-input"/>
        <el-input v-model="queryParams.roleName" placeholder="角色名称" class="search-input"/>
        <el-select  v-model="queryParams.status" placeholder="状态" class="search-input" clearable>
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
        // 返回表单数据及方法
        return { onSearch, onReset};
    }
};  