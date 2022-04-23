<template>
  <el-row>
    <el-col :span="8" :offset="8" class="el-card p-3">
      <p class="text-title">Register Now</p>
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
        <el-form-item label="Confirm" prop="checkPassword">
          <el-input v-model="form.checkPassword" type="password" autocomplete="off"/>
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
import {ElLoading, ElMessage} from "element-plus";
import router from "@/router";

function isEmail(email) {
  const reg = /[-|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/
  console.log(reg.test(email))
  return reg.test(email)
}

function isPasswordLength(password) {
  return password.length >= 6 && password.length <= 18
}

function isPasswordCharLegal(password) {
  const reg = /^[0-9A-Za-z]*$/
  return reg.test(password)
}

function isPasswordContainNumber(password) {
  const reg = /[0-9]/
  return reg.test(password)
}

function isPasswordContainUpperCase(password) {
  const reg = /[A-Z]/
  return reg.test(password)
}

function isPasswordContainLowerCase(password) {
  const reg = /[a-z]/
  return reg.test(password)
}

export default {
  name: "UserRegister",
  setup() {
    const formRef = ref()
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the email'))
      } else if (!isEmail(value)) {
        callback(new Error('Please input a valid email, reference:"name@fudan.edu.cn"'))
      }
      callback()
      // TODO 验证重复性（后端搭建后实现）
    }
    // 验证密码格式:6-18位，由数字、大写字母、小写字母组成，至少包含其中两种
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (!isPasswordLength(value)) {
        callback(new Error('Should be 6-18 in length'))
      } else if (!isPasswordCharLegal(value)) {
        callback(new Error('Should only consist of uppercase, lowercase letters and numbers'))
      } else {
        let count = 0
        if (isPasswordContainNumber(value)) count++
        if (isPasswordContainUpperCase(value)) count++
        if (isPasswordContainLowerCase(value)) count++
        if (count < 2) {
          callback(new Error('Should consist of at least two kind: uppercase letter, lowercase letter, number'))
        }
      }
      callback()
    }
    const validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== form.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const form = reactive({
      email: '',
      password: '',
      checkPassword: '',
    })

    const rules = reactive({
      email: [{validator: validateEmail, trigger: 'blur'}],
      password: [{validator: validatePassword, trigger: 'blur'}],
      checkPassword: [{validator: validateConfirm, trigger: 'blur'}],
    })

    const submitForm = (formEl) => {
      if (!formEl) return
      formEl.validate(async (valid) => {
        if (valid) {
          let loading = ElLoading.service({text: "Submitting..."})
          await axios.post('api/account', {
            params: form
          }).then((res) => {
            console.log(res)
            router.replace({
              name: 'Login',
            })
            loading.close()
          }).catch(() => {
            loading.close()
            router.replace({
              name: 'Login',
            })

          })
          return true
        } else {
          ElMessage.error("表单提交失败")
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