<template>
  <div class="register m-2 p-2">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item
        label="user tel"
        prop="userTel"
      >
        <el-input
          v-model="form.userTel"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="user name"
        prop="userName"
        :rules="[{required: true, message: 'please input user name'},{validator: validateUserName}]"
      >
        <el-input v-model="form.userName">

        </el-input>
      </el-form-item>
      <el-form-item
        label="password"
        prop="password"
        :rules="[{required: true, message: 'please input password'}]"
      >
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { axios } from "../../../http/request";

  export default {
    name: "Register",
    components: {},
    data() {
      return {
        form: {
          userTel: undefined,
          userName: undefined,
          password: undefined
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs["form"].validate(valid => {
          if(valid) {
            this.registerApi({...this.form})
                .then(res => {
                  if(res.flag) {
                    this.$message.success(res.message);
                    this.$router.push("/private/login");
                  }else {
                    this.$message.error(res.message);
                  }
                })
          }
        })
      },
      validateUserName(rule,value,callback) {
        if(!value) {
          callback();
        }
        this.judgeUserApi({userName: value})
            .then(res => {
              if(res.flag) {
                callback();
              }else {
                callback("user name exist");
              }
            })
      },
      judgeUserApi(params) {
        return axios({
          url: "/user/judge",
          method: "get",
          params
        })
      },
      registerApi(data) {
        return axios({
          url: "/private/register",
          method: "post",
          data
        })
      }
    }
  };
</script>
<style lang="less" scoped></style>
