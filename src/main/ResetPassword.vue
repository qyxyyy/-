<template>
  <div class="page-wrapper">
  <el-login-box class="reset-container">
    <h3 class="title">重置密码</h3>

    <el-form ref="resetForm" :model="form" label-width="80px">
      <el-form-item label="邮箱">
        <el-input
            v-model="form.email"
            type="email"
            placeholder="请输入注册邮箱"
            :rules="[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ]"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleReset">发送重置邮件</el-button>
      </el-form-item>

      <el-form-item class="go-back">
        <el-link type="info" @click="goBack">返回登录</el-link>
      </el-form-item>
    </el-form>
  </el-login-box>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const form = ref({
  email: ''
})

// 发送重置邮件
const handleReset = async () => {
  // 实际调用后端API
  try {
    await $axios.post('/api/auth/reset-password', form.value)
    ElMessage.success('重置密码邮件已发送，请查收邮箱')
    router.push({ name: 'Login' })
  } catch (error) {
    ElMessage.error(error.response.data.message || '重置失败，请稍后再试')
  }
}

// 返回登录页
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #333;
}

.go-back {
  text-align: center;
  margin-top: 20px;

}
</style>