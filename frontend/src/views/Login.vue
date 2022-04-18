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


function isEmail(email) {
  const reg = /[-|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/
  console.log(reg.test(email))
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
          await axios.post('api/token', {
            params: form
          }).then((res) => {
            loading.close()
            console.log(res)
          }).catch(() => {
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
      form, rules,
      submitForm, resetForm
    }
  }
}
</script>

<style scoped>

</style>