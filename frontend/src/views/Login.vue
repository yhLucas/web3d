<template>

  <el-container>
    <el-card class="el-col-8 el-col-offset-8 el-col-xs-24 el-col-xs-offset-0">
      <p class="text-title">Login</p>
      <el-form
          ref="formRef"
          :model="form"
          status-icon
          :rules="rules"
          label-width="120px"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="primary" href="/User/Register">注册账号</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import {reactive, ref} from 'vue'
import axios from "axios";
import {ElLoading, ElMessage} from "element-plus";
import {store} from "@/store";
import router from "@/router";

function isEmail(email) {
  const reg = /[-|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/
  return reg.test(email)
}

export default {
  name: "UserLogin",
  setup() {
    const formRef = ref()
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the email'))
      } else if (!isEmail(value)) {
        callback(new Error('Please input a valid email, reference:"name@fudan.edu.cn"'))
      }
      callback()
    }
    const form = reactive({
      email: '',
      password: '',
    })
    const rules = reactive({
      email: [{validator: validateEmail, trigger: 'blur'}],
    })
    const submitForm = (formEl) => {
      if (!formEl) return
      formEl.validate(async (valid) => {
        if (valid) {
          let data = new FormData()
          data.append('email', form.email)
          data.append('password', form.password)
          let loading = ElLoading.service({text: "Submitting..."})
          // 调用登录接口
          await axios.post('/api/user/token', data).then((res) => {
            // 提交成功转到此处
            let data = res.data
            if (data.code === 200) {
              // 登录成功
              store.commit('login', {username: form.email, token: data.data.token})
              ElMessage.success("Logged In")
              router.replace({name: 'UserCenter'})
            }
            loading.close()
          }).catch(() => {
            ElMessage.error("Please try again")
            loading.close()
          })
          return true
        } else {
          ElMessage.error("Please try again")
          return false
        }
      })
    }
    const resetForm = (formEl) => {
      if (!formEl) return
      formEl.resetFields()
    }
    return {
      formRef,
      form, rules,
      submitForm, resetForm
    }
  }
}
</script>

<style scoped>

</style>