<template>
  <div class="register-container">
    <!-- 注册内容 -->
    
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a target="_blank" @click="$router.push('/login')">登陆</a>
        </span>
      </h3>
      <el-form 
        scroll-to-error="true"
        ref="ruleFormRef" 
        :model="info" 
        label-width="480px" 
        style="margin-top: 40px;" 
        label-position="right"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="info.phone" style="width:300px;" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="info.code" style="width:300px;" />
          <button style="width: 100px; height: 30px" @click="getcode" :disabled="iscodebut">发送验证码</button>
        </el-form-item>
        <el-form-item label="登入密码" prop="password1">
          <el-input v-model="info.password1" style="width:300px;" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="info.password2" style="width:300px;" />
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="info.type">
            <el-checkbox label="同意协议并注册《尚品汇用户协议》" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" size="	large" style="width: 180px;height: 40px" >完成注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";
import { useStore } from 'vuex'
import { useRouter } from "vue-router";
import { ElMessage,} from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
export default defineComponent({
  name: "registerVue",
  setup() {
    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    const info = reactive({
      phone: '',
      code: '',
      password1: '',
      password2: '',
      type: []
    })
    const validatePass2 = (rule:any, value:any, callback:any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== info.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const rules = reactive<FormRules>({
      phone: [
        { required: true, message: '手机号不得为空', trigger: 'blur' },
        { min: 11, max: 11, message: '输入正确手机号', trigger: 'blur' },
      ],
      code: [
        { required: true, message: '验证码不得为空', trigger: 'blur' },
      ],
      password1: [
        { required: true, message: '密码不得为空', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度为6到20位', trigger: 'blur' },
      ],
      password2: [
        { required: true, message: '密码不得为空', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度为6到20位', trigger: 'blur' },
        { required: true, validator: validatePass2, trigger: 'blur' }
      ],
      type: [
        {
          type: 'array',
          required: true,
          message: '请勾选',
          trigger: 'change',
        },
      ],
    })
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          register()
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    const store = useStore()
    const router = useRouter()
    const iscodebut = computed(() => {
      return info.phone == ''
    })
    const getcode = () => {
      store.dispatch('getcode',info.phone).then(res => {
        if(res.code === 200) {
          info.code = res.data
        }
    })
    }
    const register = () => {
      store.dispatch('reqregister',{phone: info.phone,code: info.code,password: info.password2}).then(res => {
        if(res.code == 200) {
          ElMessage({
            message: '注册成功',
            type: 'success',
          })
          router.push('/login')
        } else {
          ElMessage.error('注册失败')
        }
      })
    }
   
    return {
      getcode,
      iscodebut,
      info,
      rules,
      ruleFormRef,
      formSize,
      submitForm 
    };
},
});
</script>

<style scoped lang="less">
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    /* div:nth-of-type(1) {
      margin-top: 40px;
    } */

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
