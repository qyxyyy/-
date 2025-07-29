// 定义 BookCategoryManager 组件
const readerIndexApi='/api/reader/index'

const ReaderDashboard = {
    name: 'ReaderDashboard',
    template: `
  <el-main>
 <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 主卡片 -->
    <el-card class="main-card">
      <div class="header-row">
        <el-avatar size="large" class="avatar-gradient">A</el-avatar>
        <div style="flex:1">
          <div class="title">欢迎你，读者A!</div>
          <div class="subtitle">一起开启美好阅读之旅～</div>
        </div>
      </div>

      <!-- 预期提醒区块 -->
      <el-card class="reminder-card" shadow="never" v-if="reminders.length">
        <div class="reminder-title">
          <i class="fas fa-triangle-exclamation"></i>
          预期提醒
        </div>
        <ul class="reminder-list">
          <li v-for="(item, i) in reminders" :key="i">
            <span class="reminder-book">{{item.book}}</span>
            <span class="reminder-type" :class="item.typeClass">{{item.typeText}}</span>
            <span class="reminder-date">{{item.date}}</span>
            <span class="reminder-days" :class="{'reminder-soon': item.days <= 3, 'reminder-over': item.overdue}">{{item.tip}}</span>
          </li>
        </ul>
      </el-card>

      <!-- 信息三卡 -->
      <el-row :gutter="22" class="info-row">
        <el-col :span="8">
          <el-card class="info-card green-card" shadow="hover">
            <div class="info-title">
              <i class="fas fa-user"></i> 基本信息
            </div>
            <div class="info-detail">
              <div><b>姓名：</b>张三</div>
              <div><b>学号：</b>2021112233</div>
              <div><b>手机号：</b>13888888888</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="info-card blue-card" shadow="hover">
            <div class="info-title">
              <i class="fas fa-book-open"></i> 最近借阅
            </div>
            <div class="borrow-list">
              <div>2025-04-15 《Python从入门到实践》 <span class="borrow-status return">归还</span></div>
              <div>2025-04-10 《Java编程思想》 <span class="borrow-status borrow">借出</span></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="info-card help-card" shadow="hover">
            <div class="info-title">
              <i class="fas fa-circle-question"></i> 帮助
            </div>
            <div class="help-text">如有问题请联系图书馆管理员或查看常见问题。</div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 下方统计卡 -->
      <el-row :gutter="22" class="stat-row">
        <el-col :span="8">
          <el-card class="stat-card blue-stat" shadow="never">
            <i class="fas fa-clock"></i>
            <span class="stat-num">2</span> <span class="stat-unit">条</span>
            <div class="stat-title">进行中预约</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card green-stat" shadow="never">
            <i class="fas fa-book"></i>
            <span class="stat-num">3</span> <span class="stat-unit">本</span>
            <div class="stat-title">当前借阅</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card orange-stat" shadow="never">
            <i class="fas fa-chart-column"></i>
            <span class="stat-num">35</span> <span class="stat-unit">本</span>
            <div class="stat-title">历史累计借阅</div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</el-main>
    `,
    setup() {
        // 假设后端加载
        const reminders = [
            {
                book: '《Python从入门到实践》',
                typeText: '即将到期', typeClass: 'reminder-due',
                date: '2025-04-18', days: 2, tip: '还有2天到期', overdue: false
            },
            {
                book: '《Java编程思想》',
                typeText: '已超期', typeClass: 'reminder-over',
                date: '2025-04-11', days: -3, tip: '已超期3天', overdue: true
            },
        ]

        // 组合式函数 - 数据获取
        const fetchData = () => {
            // axiosInstance.post(` )
            //     .then(response => {
            //         depts.value = response.data;
            //     })
        }


        // 在组件挂载时获取数据
        onMounted(() => {
                fetchData()
            }
        )
        // 返回创建的函数和数据，供模板使用
        return {reminders};
    }
};
