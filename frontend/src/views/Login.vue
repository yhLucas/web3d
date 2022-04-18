<template>
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
</template>

<script>
import {reactive, ref} from 'vue'
import axios from "axios";
import {ElLoading} from "element-plus";

function isEmail(email) {
  const reg = /^[\w-]{3,12}@[\da-zA-Z]{2,6}\.[da-zA-Z]+$/
  console.log(reg.test(email))
  return reg.test(email)
}

function isPasswordLength(password) {
  return password.length >= 6 && password.length <= 18
}

function isPasswordCharLegal(password) {
  // TODO 检测字符是否都符合
  const reg = /[0-9]/
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
  name: "UserLogin",
  setup() {
    const formRef = ref()
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the email, like "name@fudan.edu.cn"'))
      } else if (!isEmail(value)) {
        callback(new Error('Please input an email address'))
      }
      callback()
      // TODO 验证重复性（后端搭建后实现）
    }
    // 验证密码格式:6-18位，由数字、大写字母、小写字母组成，至少包含其中两种
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (!isPasswordLength(value)) {
        callback(new Error('The password should be 6-18 in length'))
      } else if (isPasswordCharLegal(value)) {
        callback(new Error('The password should consist of uppercase, lowercase letters and numbers'))
      } else {
        // TODO 检测是否至少包含两种
        let count = 0
        if (isPasswordContainNumber(value)) count++
        if (isPasswordContainUpperCase(value)) count++
        if (isPasswordContainLowerCase(value)) count++
        if (count < 2) {
          callback(new Error('The password should not consist of only uppercase, lowercase letters or numbers'))
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
          await axios.post('api/token', {
            params: form
          }).then((res) => {
            loading.close()
            console.log(res)
          }).catch(()=>{
            loading.close()
          })
          return true
        } else {
          // 验证不通过，不提交
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
      validatePassword, validateConfirm,
      form, rules,
      submitForm, resetForm
    }
  }
}
</script>

<style scoped>

</style>