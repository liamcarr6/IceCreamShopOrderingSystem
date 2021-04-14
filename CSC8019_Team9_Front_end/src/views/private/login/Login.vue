<template>
  <div>
    <div class="login-container">
      <h2 class="tx-center fs-xl color-danger">Cavallo LOGIN</h2>
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item
          prop="userName"
          label="ID:"
          :rules="[
            {
              required: true,
              message: 'please input ID'
            }
          ]"
        >
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="password:"
          :rules="[
            {
              required: true,
              message: 'please input password'
            }
          ]"
        >
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="type" :label="1">User</el-radio>
          <el-radio v-model="type" :label="0">administrator</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button class="color-danger" type="text" @click="handleRegister">register</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">login</el-button>
          <el-button @click="handleRefill">refill</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        userName: undefined,
        password: undefined
      },
      type: 1
    };
  },
  methods: {
    ...mapActions(["Login"]),
    handleRefill() {
      let form = this.$refs["form"];
      form.resetFields();
    },
    handleRegister() {
      this.$router.push("/register");
    },
    handleSubmit() {
      let form = this.$refs["form"];
      form.validate((valid) => {
        if(valid) {
          this.Login({...this.form})
              .then(() => {
                this.$router.push({path: "/home"})
              })
              .catch(() => {
                this.$message.error("login failure");
              })
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.login-container {
  position: absolute;
  width: 350px;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
  top: 50%;
}
</style>
