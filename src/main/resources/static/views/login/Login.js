const Login = {
    // 组件名称
    name: 'Login', // 使用模板字符串定义HTML结构
    template: `
    <div class="login-page">
    <!-- 顶部logo及标题 -->
    <div class="login-header">
      <!-- <img class="login-logo" src="#" alt="logo" /> -->
      <div>
        <div class="login-title-zh">图书借阅管理系统</div>
        <div class="login-title-sub">Book Libary Manager System</div>
      </div>
    </div>
    <!-- 登录主卡片 -->
    <el-card class="login-card" shadow="never">
      <!-- 登录方式切换 -->
      <div class="login-tabs">
        <div
          class="tab"
          :class="{active: loginType === 'password'}"
          @click="loginType = 'password'"
        >账户密码登录</div>
        <div
          class="tab"
          :class="{active: loginType === 'sms'}"
          @click="loginType = 'sms'"
        >短信验证码登录</div>
      </div>
      <div class="tab-underline" :style="loginType === 'password' ? 'left:0' : 'left:50%'"></div>

      <!-- 表单内容 -->
      <el-form
        :model="form"
        :rules="rules"
        ref="loginForm"
        class="login-form"
        @keydown.enter.prevent="handleLogin"
      >
        <el-form-item v-if="loginType==='password'" prop="username">
          <el-input
            v-model="form.username"
            placeholder="账户名/工号"
            prefix-icon="el-icon-user"
            size="large"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="loginType==='password'" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            size="large"
            show-password
          />
        </el-form-item>
        <template v-if="loginType === 'sms'">
          <el-form-item prop="mobile">
            <el-input
              v-model="form.mobile"
              placeholder="手机号"
              prefix-icon="el-icon-phone-outline"
              size="large"
              clearable
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="form.code"
              placeholder="短信验证码"
              prefix-icon="el-icon-message"
              size="large"
              style="width: 180px"
            />
            <el-button class="code-btn" @click="getCode" :disabled="codeCountDown>0" size="large" plain>
              {{ codeCountDown > 0 ? codeCountDown + 's后重试' : '获取验证码' }}
            </el-button>
          </el-form-item>
        </template>

        <div class="option-row">
          <el-checkbox v-model="form.rememberMe" size="large" :style="{marginRight: '16px'}">
            自动登录
          </el-checkbox>
        </div>
        <div class="option-row link-row">
          <el-link type="info" @click="handleForget" class="link">忘记密码?</el-link>
          <el-link type="primary" @click="handleRegister" class="link">注册账号</el-link>
        </div>

        <el-form-item style="margin-top:26px;">
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLogin"
            size="large"
            round
            style="width:100%; background:#19c4b3; border:none;"
          >登&nbsp;&nbsp;录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="forgotPassword">忘记密码？</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 页脚 -->
    <div class="login-footer">
      Copyright © JavaEE应用于开发 2024
    </div>
  </div>
    `, // 定义组件的属性

    setup() {

        const loginType = ref("password");
        const codeCountDown = ref(0);
        let timer = null;

        const form = reactive({
            username: "", password: "", rememberMe: false, mobile: "", code: "",
        });

        const rules = {
            username: [{required: true, message: "请输入账户名/工号", trigger: "blur"}],
            password: [{required: true, message: "请输入密码", trigger: "blur"}],
            mobile: [{required: true, message: "请输入手机号", trigger: "blur"}],
            code: [{required: true, message: "请输入验证码", trigger: "blur"}],
        };

        const loginForm = ref();

        function handleLogin() {
            loginForm.value.validate((valid) => {
                if (valid) {
                    // ElMessage.success("登录成功（样例）");
                    let loginInfo = {
                        username: form.username, password: form.password,
                    }
                    axiosInstance.post('/api/login', loginInfo,    // JSON 体
                        {params: {rememberMe: form.rememberMe}} // 查询参数
                    )
                        .then(response => {
                            localStorage.setItem('userInfo', JSON.stringify(response.data));
                            message.success('用户登录成功', response.data);
                            let href = AuthUtils.getUserInfo().redirectUrl;
                            console.log(href)
                            setTimeout(() => {
                                window.location.href = href;
                            }, 50);
                        })
                        .catch(error => {
                            // 处理错误的处理
                            message.error('登录失败，请检查用户名和密码');
                        });

                }

            });
        }

        function getCode() {
            if (!/^1[3-9]\d{9}$/.test(form.mobile)) {
                message.warning("请输入正确的手机号");
                return;
            }
            codeCountDown.value = 60;
            timer = setInterval(() => {
                codeCountDown.value--;
                if (codeCountDown.value <= 0) clearInterval(timer);
            }, 1000);
            message.success("验证码已发送（样例）");
        }

        function handleForget() {
            this.$router.push({ name: 'ForgetPassword' });
            message.info("跳转到忘记密码页（样例）");
        }

        function handleRegister() {
            message.info("跳转到注册页（样例）");
        }

        function forgotPassword() {
            window.location.href = '/reset-password';
        }

        return {getCode, handleLogin, handleForget, handleRegister, loginType, codeCountDown, form, rules, loginForm, forgotPassword}
    }

};
