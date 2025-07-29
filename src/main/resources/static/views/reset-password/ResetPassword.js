const ResetPassword = {
    template: `
        <div class="login-container" style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
            <div style="width: 350px; padding: 20px; background-color: white; border-radius: 4px; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);">
                <el-form ref="resetForm" :model="form" :rules="rules" class="login-form">
                    <h3 class="title" style="text-align: center; margin-bottom: 25px;">重置密码</h3>
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon><User /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="form.email" placeholder="请输入邮箱">
                            <template #prefix>
                                <el-icon><Message /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" style="width:100%;" @click="handleReset">
                            重置密码
                        </el-button>
                    </el-form-item>
                    <el-form-item style="text-align: center; margin-bottom: 0;">
                        <el-button type="text" @click="backToLogin">返回登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    `,

    setup() {
        const resetForm = ref(null);
        const loading = ref(false);
        const form = reactive({
            username: '',
            email: ''
        });

        const rules = {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ]
        };

        function handleReset() {
            resetForm.value.validate((valid) => {
                if (valid) {
                    loading.value = true;
                    axiosInstance.post('/api/reset-password', form)
                        .then(response => {
                            const { code, message: msg } = response.data;
                            if (code === 200) {
                                ElMessage.success('重置密码成功，新密码已发送至您的邮箱');
                                setTimeout(() => {
                                    window.location.href = '/login';
                                }, 1500);
                            } else {
                                ElMessage.error(msg || '重置密码失败，请稍后重试');
                            }
                        })
                        .catch(() => {
                            ElMessage.error('重置密码失败，请稍后重试');
                        })
                        .finally(() => {
                            loading.value = false;
                        });
                }
            });
        }

        function backToLogin() {
            window.location.href = '/login';
        }

        return {
            resetForm,
            form,
            rules,
            loading,
            handleReset,
            backToLogin
        };
    }
}; 