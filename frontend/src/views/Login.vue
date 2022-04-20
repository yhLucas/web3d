<template>
  <el-row>
    <el-col :span="8" :offset="8" class="el-card p-3">
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
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import {reactive, ref} from 'vue'
import axios from "axios";
import {ElLoading} from "element-plus";
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
          let loading = ElLoading.service({text: "Submitting..."})
          // 调用登录接口
          await axios.post('api/token', {
            params: form
          }).then((res) => {
            // 提交成功转到此处
            loading.close()
            console.log(res)
            console.log("in then")
          }).catch(() => {
            // 本地测试模拟登录成功
            store.commit('login', {
              username: "test account",
              token: 123
            })
            router.replace({
              name: 'UserCenter',
            })
            loading.close()
          })
          return true
        } else {
          // 表单验证失败，不提交
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