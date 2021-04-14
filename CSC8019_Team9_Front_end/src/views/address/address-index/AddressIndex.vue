<template>
  <div>
    <h2>Add Address</h2>
    <el-form ref="form" :model="form">
      <el-form-item
        label="level 1"
        prop="level1"
      >
        <el-input v-model="form.level1"></el-input>
      </el-form-item>
      <el-form-item
        label="level 2"
        prop="level2"
      >
        <el-input v-model="form.level2"></el-input>
      </el-form-item>
      <el-form-item
        label="level 3"
        prop="level3"
      >
        <el-input v-model="form.level3"></el-input>
      </el-form-item>
      <el-form-item
        label="description"
        prop="description"
        :rules="[{required: true, message: 'please input address description'}]"
      >
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Add Address</el-button>
        <el-button @click="handleCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { axios } from "../../../http/request";
  export default {
    name: "AddressIndex",
    components: {},
    data() {
      return {
        form: {
          level1: undefined,
          level2: undefined,
          level3: undefined,
          description: undefined
        }
      };
    },
    methods: {
      handleCancel() {
        this.$refs["form"].resetFields();
      },
      handleSubmit() {
        this.$refs["form"].validate(valid => {
          if(valid) {
            this.addAddressApi({...this.form})
                .then(res => {
                  if(res.flag) {
                    this.$message.success(res.message);
                  } else {
                    this.$message.error(res.message);
                  }
                })
          }
        })
      },
      addAddressApi(data) {
        return axios({
          url: "/address/add",
          method: "post",
          data
        })
      }
    }
  };
</script>
<style lang="less" scoped></style>
