const VerifyCodeForm = {
    name: 'VerifyCodeForm',
    template: `
      <el-card class="form-card">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
          <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" maxlength="11" show-word-limit placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item>
              <el-button
                  type="primary"
                  :disabled="countdown > 0 || !form.phone"
                  @click="handleSendCode"
              >
                  {{ countdown > 0 ? countdown + 's后重发' : '发送验证码' }}
              </el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
              <el-input v-model="form.code" maxlength="5" show-word-limit placeholder="请输入验证码" />
          </el-form-item>
          <el-form-item>
              <el-button type="success" @click="handleCheckCode">提交验证</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    `,
    setup() {
        const formRef = ref(null);
        const form = reactive({
            phone: '13567899300',
            code: ''
        });

        const rules = {
            phone: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入验证码', trigger: 'blur' },
                { pattern: /^\d{5}$/, message: '请输入5位数字验证码', trigger: 'blur' }
            ]
        }

        const countdown = ref(0)
        let timer = null

        // 发送验证码并启动倒计时
        const handleSendCode = () => {
            axiosInstance.post('/api/verify-code/generate', { phone: form.phone }).then(() => {
                message.success('验证码已发送');
                startCountdown();
            }).catch(() => {
                message.error('验证码发送失败');
            })
        }

        // 倒计时禁止按钮重复点击
        const startCountdown = () => {
            countdown.value = 20
            if (timer) clearInterval(timer)
            timer = setInterval(() => {
                countdown.value--
                if (countdown.value <= 0) {
                    clearInterval(timer)
                    timer = null
                }
            }, 1000)
        }

        // 提交验证码，调用后端校验
        const handleCheckCode = () => {
            formRef.value.validate((valid) => {
                if (!valid) return;
                axiosInstance.post('/api/verify-code/check', { phone: form.phone, code: form.code })
                    .then(() => {
                        message.success('验证成功');
                    }).catch(() => {
                    message.error('验证失败');
                })
            });
        }

        return { handleSendCode, handleCheckCode, formRef, form, rules, countdown }
    }
}