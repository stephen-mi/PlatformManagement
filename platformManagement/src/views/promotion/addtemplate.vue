<template>
  <div class="addtemplate">
    <p class="addtemplateHeader">优惠券模版规则</p>
    <div class="addtemplate_scroll">
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel"><span style="color:red">*</span> 优惠券标题:</label>
        <el-input :readonly="typePage=== 'details'" :class="[typePage === 'details'? 'removeBorder': '']" v-model="headline"  placeholder="满100减50" size="mini" style="width:250px" ></el-input>
        <label class="addtemplatelabel">优惠券编码:</label>
        <el-input  v-model="couponCode" :disabled="true" size="mini" style="width:250px"></el-input>
      </div>
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel"> 优惠券说明:</label>
        <el-input :readonly="typePage=== 'details'" :class="[typePage=== 'details'? 'removeBorder': '']" v-model="description" placeholder="" size="mini" style="width:250px" ></el-input>
      </div>
      <div class="from-container">
        <label class="addtemplatelabel" style="vertical-align: top;"> 优惠券详细说明:</label>
        <el-input :readonly="typePage=== 'details'" :class="[typePage=== 'details'? 'removeBorder': '']" type="textarea" :rows="2"  v-model="deataildescription" style="width: 760px;"></el-input>
      </div>
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel"><span style="color:red">*</span>出资方规则名称:</label>
        <el-input :readonly="typePage=== 'details'" :class="[typePage=== 'details'? 'removeBorder': '']" v-model="investorRule"  size="mini" style="width:250px" @focus="investorAlert"></el-input>
        <el-button type="info" class="look_btn" size="mini">查看规则</el-button>
      </div>
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel"><span style="color:red">*</span>砍级规则名称:</label>
        <el-input :readonly="typePage=== 'details'" :class="[typePage=== 'details'? 'removeBorder': '']"  v-model="CandyRule"  size="mini" style="width:250px" @focus="CandyRuleAlert"></el-input>
        <el-button type="info" class="look_btn" size="mini">查看规则</el-button>
      </div>
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel"><span style="color:red">*</span>优惠券类型规则名称:</label>
        <el-input :readonly="typePage=== 'details'" :class="[typePage=== 'details'? 'removeBorder': '']" v-model="discountsType"  size="mini" style="width:250px" @focus="discountsTypeAlert"></el-input>
        <el-button type="info" class="look_btn" size="mini">查看规则</el-button>
      </div>
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel">优惠券标签:</label>
        <el-input :readonly="typePage=== 'details'" :class="[typePage=== 'details'? 'removeBorder': '']"  v-model="couponLabel"  size="mini" style="width:250px"></el-input>
      </div>
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel"><span style="color:red">*</span>优惠券金额计算方式:</label>
        <el-select v-if = "typePage !== 'details'"   v-model="formulaValue" placeholder="请选择">
          <el-option
            v-for="item in formula"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <p v-if = "typePage=== 'details'"  style="width:250px">{{formulaValue}}</p>
      </div>
      <div class="from-container from-container-flex">
        <label class="addtemplatelabel"><span style="color:red">*</span>支付方式:</label>
        <el-select v-if = "typePage !== 'details'"  v-model="palytypeValue" placeholder="请选择">
          <el-option
            v-for="item in palytype"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <p v-if = "typePage=== 'details'" style="width:250px">{{palytypeValue}}</p>
        <span style="color: red;font-size:12px;margin-left:10px">注：即使选择【不限】，只要购买商品的货款不支付到惠下单的都不可以使用优惠券。</span>
      </div>

      <div class="from-container from-container-flex">
        <upload-cdn></upload-cdn>
      </div>
    </div>
    <div class="from-footer">
      <el-button type="primary" style="margin-right: 20px;" @click="savetemplate">提交</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
    <search-dialogs :suretype="suretype" :path="dialogUrl" :showHidden="showHidden" @closedialog="showHidden = false" @RuleEvent="sureRule"></search-dialogs>
  </div>

</template>

<script>
import uploadCdn from './components/UploadCdn'
import searchDialogs from './components/searchDialogs'
export default {
  name: 'addtemplate',
  components: {
    uploadCdn,
    searchDialogs
  },
  props: {
  },
  data() {
    return {
      typePage: 'add', // 页面类型
      headline: '', // 优惠券标题
      couponCode: '121332434dsafsafsa', // 优惠券编码
      description: '', // 优惠券说明
      deataildescription: '', // deataildescription
      investorRule: '', // 出资方规则
      CandyRule: '', //  砍级规则名称
      discountsType: '', // 优惠券类型规则名称
      couponLabel: '', // 优惠券标签
      formula: [{ // 优惠券金额计算方式
        value: '1',
        label: '按订单金额'
      }, {
        value: '2',
        label: '按商品金额'
      }],
      formulaValue: '',
      palytype: [{ // 优惠券金额计算方式
        value: '1',
        label: '微信在线付款'
      }, {
        value: '2',
        label: '不限'
      }],
      palytypeValue: '',
      urlUpload: '',
      suretype: 1, // 控制规则名称弹窗 1为出资方规则名称 2 坎级规则名称 3 适用范围名称
      dialogUrl: '/report%2Fmeta%2Finvestor', // 弹窗出来的meta.json地址
      showHidden: false // 控制弹窗显示隐藏
    }
  },
  watch: {

  },
  methods: {
    investorAlert() {
      this.suretype = 1
      this.showHidden = true
      this.dialogUrl = '/report%2Fmeta%2Finvestor'
    },
    CandyRuleAlert() {
      this.suretype = 2
      this.showHidden = true
      this.dialogUrl = '/report%2Fmeta%2Finvestor'
    },
    discountsTypeAlert() {
      this.suretype = 3
      this.showHidden = true
      this.dialogUrl = '/report%2Fmeta%2Finvestor'
    },
    sureRule(type, data) {
      debugger
      if (type === 'investorRuleEvent') {
        const showarr = []
        data.map((item, index) => {
          showarr.push(item.customerId)
        })
        this.investorRule = showarr.join(',')
      } else if (type === 'CandyRuleEvent') {
        const showarr = []
        data.map((item, index) => {
          showarr.push(item.customerId)
        })
        this.CandyRule = showarr.join(',')
      } else {
        const showarr = []
        data.map((item, index) => {
          showarr.push(item.customerId)
        })
        this.discountsType = showarr.join(',')
      }
    },
    savetemplate() {
      // 判断必填项
      if (!this.headline) {
        this.$message('请输入优惠券标题')
        return
      }
      if (!this.investorRule) {
        this.$message('请选择出资方规则名称')
        return
      }
      if (!this.CandyRule) {
        this.$message('请选择砍级规则名称')
        return
      }
      if (!this.discountsType) {
        this.$message('请选择优惠券类型规则名称')
        return
      }
      if (!this.formulaValue) {
        this.$message('请选择优惠券金额计算方式')
        return
      }
      if (!this.discountsType) {
        this.$message('请选择支付方式')
        return
      }
      // 请求接口
    }
  },
  created() {
    const detailsId = this.$route.query
    console.log(detailsId)
  }
}
</script>

<style type="text/scss" lang="scss">
.addtemplate {
  flex: 1;
  .addtemplate_scroll {
    flex: 1;
    overflow-y: auto;
  }
  .addtemplateHeader {
    font-size: 20px;
    padding-left: 50px;
    color: #1AC3D3;
  }
  .addtemplatelabel{
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
    padding-bottom: 30px;
  }

  textarea {
    resize: none;
    width: 760px;
    height: 100px;
  }
  .removeBorder {
    &>input {
      border: none;
    }
    &>textarea {
      border: none;
    }
  }
  .upload-demo {
    .el-upload-list {
      li {
        width: 200px;
      }
    }
  }
}

</style>
