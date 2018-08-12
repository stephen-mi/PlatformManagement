<template>
  <div class="addtemplate">
    <p class="addtemplateHeade">优惠券推券管理</p>
    <div class="from-container from-container-flex">
      <label><span style="color:red">*</span> 推券活动名称:</label>
      <el-input  v-model="headline"  size="mini" style="width:250px"></el-input>

      <label>活动编码:</label>
      <el-input  v-model="couponCode" :disabled="true" size="mini" style="width:250px"></el-input>
    </div>
    <div class="from-container from-container-flex">
      <label> 推券活动说明:</label>
      <el-input  v-model="description"  size="mini" style="width:250px"></el-input>
    </div>
    <div class="from-container">
      <label style="vertical-align: top;"> 备注:</label>
      <div style="display: inline-block">
        <el-input type="textarea" v-model="deataildescription" class="textareasinput"></el-input>
      </div>
    </div>

    <div class="from-container from-container-flex">
      <label><span style="color:red">*</span>用否为新注册用户:</label>
       <el-select v-model="newuserValue" placeholder="请选择">
        <el-option
          v-for="item in newuser"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="from-container">
      <label><span style="color:red">*</span>指定优惠券:</label>
      <div style="display: inline-block;">
        <el-input  v-model="investorRule"  size="mini" style="width:250px"></el-input>
        <el-button type="info" class="look_btn" size="mini">查看规则</el-button>
        <el-button type="info" class="look_btn" size="mini" @click="addcoupons">增加</el-button>
      </div>
      <div v-for="(item,index) in investorRulearr" :key="index" style="margin-left: 198px;margin-top:10px">
        <el-input  v-model="item.investorRule"  size="mini" style="width:250px"></el-input>
        <el-button type="info" class="look_btn" size="mini">查看规则</el-button>
        <el-button type="info" class="look_btn" size="mini" @click="addcoupons">增加</el-button>
        <el-button type="info" class="look_btn" size="mini" @click="removecoupons(index)">删除</el-button>
      </div>
    </div>
    <div class="from-container from-container-flex">
      <label><span style="color:red">*</span> 每种优惠推送张数:</label>
      <el-input  v-model="numbers"  size="mini" style="width:50px" @change="InitData"></el-input><span style="margin-left:10px">张</span>
    </div>

    <div class="from-container from-container-flex">
      <label><span style="color:red">*</span> 指定活动时间:</label>
      <el-date-picker
        v-model="dataTimes"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>

    <div class="from-container from-container-flex">
      <label>优惠券有效期:</label>
      <el-input  v-model="periodValidity"  size="mini" style="width:250px"></el-input><span style="margin-left:10px">天</span>
    </div>

    <div class="from-footer">
      <el-button type="primary" style="margin-right: 20px;" @click="submit">提交</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>

</template>

<script>
import bandtip from './components/bandTipsInput'
export default {
  name: 'pushvolume',
  components: {
    'band-tip': bandtip
  },
  props: {
  },
  data() {
    return {
      headline: '', // 推券活动名称
      couponCode: 'WSdsadsadsad', // 活动编码
      description: '', // 推券活动说明
      deataildescription: '', // 备主
      newuserValue: '', // 用否为新注册用户
      investorRule: '', // 指定优惠券
      investorRulearr: [],
      numbers: '', // 每种优惠推送张数
      dataTimes: '', // 指定活动时间
      periodValidity: '', // 优惠券有效期
      newuser: [
        {
          value: '0',
          label: '请选择'
        },
        {
          value: '1',
          label: '新用户注册送券'
        }
      ]
    }
  },
  watch: {

  },
  methods: {
    submit() {
      console.log(this)
      // 判断必填项
      if (!this.headline) {
        this.$message('请输入推券活动名称')
        return
      }
      if (!this.newuserValue) {
        this.$message('请选择用否为新注册用户')
        return
      }
      if (!this.investorRule) {
        this.$message('请输入指定优惠券')
        return
      }
      if (!this.numbers) {
        this.$message('请输入每种优惠推送张数')
        return
      }
      if (!this.dataTimes) {
        this.$message('请选择指定活动时间')
        return
      }
      // 接口
    },
    addcoupons() {
      this.investorRulearr.push({
        investorRule: ''
      })
    },
    removecoupons(index) {
      this.investorRulearr.splice(index, 1)
    },
    InitData() {
      const rel = /^\d*$/
      if (!rel.test(this.numbers)) {
        this.numbers = 0
        this.$message('请输入正整数')
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss">
.addtemplate {
  flex: 1;
  overflow-y: auto;
  .addtemplateHeade {
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
    margin-top: 50px;
  }
  .textareasinput{
    textarea{
      resize: none;
      width: 760px;
      height: 100px;
    }
  }
}

</style>
