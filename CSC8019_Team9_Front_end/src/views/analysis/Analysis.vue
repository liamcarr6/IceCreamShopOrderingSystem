<template>
  <div class="analysis">
    <h2>Analysis</h2>
    <el-tabs
      v-model="type"
      @tab-click="handleChange"
    >
      <el-tab-pane
        label="Today"
        name="1"
      >
        <base-line-chart
                :options="options"
        />
      </el-tab-pane>
      <el-tab-pane
        label="Week"
        name="2"
      >
        <base-line-chart
                :options="options"
        />
      </el-tab-pane>
      <el-tab-pane
        label="Year"
        name="3"
      >
        <base-line-chart
                :options="options"
        />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import { axios } from "../../http/request";
  import BaseLineChart from "../../components/chart/BaseLineChart";
  export default {
    name: "Analysis",
    components: {BaseLineChart},
    data() {
      return {
        options: {},
        type: "1"
      };
    },
    mounted() {
      this.analysis();
    },
    methods: {
      handleChange() {
        this.analysis();
      },
      analysis() {
        let params = {type: this.type};
        this.getAnalysisApi(params)
            .then(res => {
              if(res.flag) {
               let data =  this.generateData(res.data);
               let options = this.getOptionTemplate();
               options.series[0].data = data;
               this.options = options;
              }
            })
      },
      generateData(data) {
        return data.map(item => {
          return [item.name,item.count];
        })
      },
      getOptionTemplate() {
        return {
          xAxis: {
            type: 'category',
            name: "flavour"
          },
          yAxis: {
            type: 'value',
            name: "count"
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true
          }]
        };
      },
      getAnalysisApi(params) {
        return axios({
          url: "/order/profile",
          method: "get",
          params
        })
      }
    }
  };
</script>
<style lang="less" scoped></style>
