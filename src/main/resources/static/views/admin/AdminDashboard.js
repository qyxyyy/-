// 定义 BookCategoryManager 组件
const adminIndexApi='/api/admin/index'

const AdminDashboard = {
    name: 'AdminDashboard',
    template: `
   <el-main>
    <div class="dashboard-page">
      <!-- 欢迎头部 -->
      <div class="dashboard-welcome">
        <el-avatar :size="48" class="avatar-admin">A</el-avatar>
        <div>
          <div class="welcome-title">欢迎你，张管理员！</div>
          <div class="welcome-role">角色：ROLE_SUPER_ADMIN</div>
        </div>
      </div>
      <!-- 统计 & 预警 -->
      <el-row :gutter="20" class="dashboard-row">
        <el-col :span="5">
          <el-card class="stat-card stat-blue" shadow="hover">
            <i class="fa-solid fa-book stat-icon"></i>
            <div class="stat-num">4856</div>
            <div class="stat-desc">图书总量</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="stat-card stat-green" shadow="hover">
            <i class="fa-solid fa-book-open stat-icon"></i>
            <div class="stat-num">3600</div>
            <div class="stat-desc">在库图书</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="stat-card stat-orange" shadow="hover">
            <i class="fa-solid fa-list-alt stat-icon"></i>
            <div class="stat-num">258</div>
            <div class="stat-desc">当前借出</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="stat-card stat-red" shadow="hover">
            <i class="fa-solid fa-triangle-exclamation stat-icon"></i>
            <div class="stat-num">8</div>
            <div class="stat-desc">逾期未还</div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="stat-card stat-purple" shadow="hover">
            <i class="fa-solid fa-user stat-icon"></i>
            <div class="stat-num">1265</div>
            <div class="stat-desc">注册读者</div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 预警/提醒区 -->
      <el-card class="alert-card" v-if="alerts.length">
        <i class="fa-solid fa-triangle-exclamation alert-icon"></i>
        <span class="alert-title">系统预警：</span>
        <span v-for="alert in alerts" :key="alert" class="alert-msg">{{alert}}</span>
      </el-card>

      <!-- 快捷入口区 -->
      <el-row :gutter="18" class="dashboard-row quick-row">
        <el-col :span="6" v-for="item in quickEntries" :key="item.title">
          <el-card class="quick-card" @click="goto(item.path)">
            <i :class="item.icon + ' quick-icon'"></i>
            <span class="quick-title">{{item.title}}</span>
          </el-card>
        </el-col>
      </el-row>

      <!-- 动态简报区 -->
      <el-card class="activity-card">
        <div class="activity-title">最新动态</div>
        <el-timeline>
          <el-timeline-item
            v-for="(log, i) in activities"
            :key="i"
            :timestamp="log.time"
            :type="log.type">
            {{log.content}}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </el-main>
   
    `,
    setup() {
        const alerts = [
            '还有8本图书逾期未还',
            '有1条损坏举报待处理'
        ];
        const quickEntries = [
            { title: '图书管理', icon: 'fa-solid fa-book', path: '/admin/books' },
            { title: '读者管理', icon: 'fa-solid fa-user', path: '/admin/readers' },
            { title: '借阅管理', icon: 'fa-solid fa-book-open', path: '/admin/borrowing' },
            { title: '预约处理', icon: 'fa-solid fa-calendar', path: '/admin/orders' }
        ];
        const activities = [
            { time: '14:30', type: 'success', content: '李学生新借阅《算法艺术与信息学竞赛》' },
            { time: '13:08', type: '', content: '赵老师归还《明朝那些事儿》' },
            { time: '11:21', type: 'warning', content: '自动识别1条超期，已通知读者' },
        ]
        function goto(path) {
            // this.$router.push(path) ...
        }

        // 组合式函数 - 数据获取
        const fetchData = () => {
        }
        // 在组件挂载时获取数据
        onMounted(() => {
                fetchData()
            }
        )
        // 返回创建的函数和数据，供模板使用
        return {activities, alerts, quickEntries, goto};
    }
};
