<template>
  <div class="addtemplate">
    <p class="addtemplate_header">坎级规则添加</p>
    <div class="from-container from-container-flex">
      <label><span style="color:red">*</span> 坎级规则规则名称:</label>
      <el-input  v-model="headline" placeholder="满100减50" size="mini" style="width:250px" ></el-input>
      <label>坎级规则规则编码:</label>
      <el-input  v-model="couponCode" :disabled="true" size="mini" style="width:250px"></el-input>
    </div>
    <div class="from-container">
      <label style="vertical-align: top;"> 备注:</label>
      <el-input type="textarea" :rows="2"  v-model="deataildescription" style="width: 760px;"></el-input>
    </div>
    <div class="from-container from-container-flex">
      <label><span style="color:red">*</span>坎级类型:</label>
       <el-select v-model="candyTypeValue" placeholder="请选择">
        <el-option
          v-for="item in candyType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div  class="from-container from-container-flex">
      <label><span style="color:red">*</span>优惠方式规则:</label>
      <div class="from-container-flex-justify">
        <div class="from-container-flex-justify-margin">
          <span>满</span>
          <el-input  v-model="moneys" size="mini" style="width:100px;margin:0 10px"></el-input>
          <span>元</span>
        </div>
        <div class="from-container-flex-justify-margin">
          <el-select v-model="playTypeValue" placeholder="请选择">
          <el-option
            v-for="item in playType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
        </div>
        <div class="from-container-flex-justify-margin" v-show="playTypeValue === '1'">
          <el-input  v-model="reduceMoneys" size="mini" style="width:100px;margin-right:10px"></el-input>
          <span>元</span>
        </div>
        <div class="from-container-flex-justify-margin" v-show="playTypeValue === '2'">
          <el-input  v-model="reduceMoneysRate" size="mini" style="width:100px;margin-right:10px"></el-input>
          <span>%</span>
        </div>
        <div class="from-container-flex-justify-margin" v-show="playTypeValue === '1'">
          <span>成本:</span>
          <el-input  v-model="reduceMoneys" disabled size="mini" style="width:150px;margin:0 10px"></el-input>
          <span>元</span>
        </div>
        <div class="from-container-flex-justify-margin" v-show="playTypeValue === '2'">
          <span>最大优惠额度:</span>
          <el-input  v-model="maxReduceMoneysRate"  style="width:150px;margin:0 10px"></el-input>
          <span>元</span>
        </div>
      </div>
    </div>

    <div class="from-footer">
      <el-button type="primary" style="margin-right: 20px;">提交</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'candyruleAdd',
  props: {
  },
  data() {
    return {
      headline: '', // 坎级规则规则名称
      couponCode: '121332434dsafsafsa', // 坎级规则规则编码
      deataildescription: '', // 备注
      candyTypeValue: '', // 坎级类型
      moneys: '', // 满多少元
      playTypeValue: '', // 选择支付类型
      reduceMoneys: '', // 减多少元
      costing: '', // 成本
      reduceMoneysRate: '', // 优惠比例
      maxReduceMoneysRate: '', // 最大优惠
      candyType: [{ // 坎级类型
        value: '1',
        label: '满减'
      }],
      playType: [{ // 优惠券金额计算方式
        value: '1',
        label: '优惠金额 (元)'
      }, {
        value: '2',
        label: '优惠折扣 (%)'
      }]
    }
  },
  watch: {

  },
  methods: {

  }
}
</script>

<style type="text/scss" lang="scss">
.addtemplate {
  flex: 1;
  min-width: 965px;
  overflow-x: auto;
  .addtemplate_header {
    font-size: 20px;
    padding-left: 50px;
    color: #1AC3D3;
  }
  label{
    display: inline-block;
    margin-right: 30px;
    width: 164px;
    text-align: right;
    font-size: 12px;
    font-style: normal;
  }
  .from-container {
    margin-bottom: 30px;
    .look_btn {
      padding:5px 10px;
      background: #ddd;
      font-size: 12px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .from-container-flex {
    display: flex;
    align-items: center;
  }
  .from-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }

  textarea{
    resize: none;
    width: 760px;
    height: 100px;
  }
  .from-container-flex-justify {
    display: flex;
    align-items: center;
      .from-container-flex-justify-margin {
        margin-right:25px;
      }
      .from-container-flex-justify-margin:nth-last-child(1){
        margin-right: 0;
      }
  }
}

</style>
