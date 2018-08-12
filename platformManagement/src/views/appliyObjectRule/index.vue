<template>
    <div class="wrap">
        <div class="title">适用对象规则新增</div>
        <div class="rule-name">
            <i>*</i>
            适用对象规则名称：
            <input class="input-name" type="text" placeholder="xxx活动全场通用券"> 适用对象规则编码：
            <input class="input-code" type="text">
        </div>
        <div class="remakes">
            备注：
            <textarea></textarea>
        </div>
        <div class="coupon-type">
            <i>*</i>
            指定优惠券类型：
            <select v-model="couponType">
                <option value="通用券">通用券</option>
                <option value="品牌券">品牌券</option>
                <option value="商品券">商品券</option>
            </select>
            <span v-if="couponType === '品牌券' || couponType === '商品券'">{{appointType}}</span>
            <input type="text" v-if="couponType === '品牌券' || couponType === '商品券'">
            <div class="btn" v-if="couponType === '商品券'">模板导入</div>
        </div>
        <el-button type="primary" class="submit">提交</el-button>
        <el-button>返回</el-button>
        <el-button>取消</el-button>
    </div>
</template>

<script>

export default {
  name: 'appliyObjectRule',
  data() {
    return {
      couponType: '通用券'
    }
  },
  components: {},
  computed: {
    appointType() {
      if (this.couponType === '品牌券') {
        return '指定品牌:'
      } else if (this.couponType === '商品券') {
        return '指定商品:'
      }
    }
  },
  props: {},
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
    div,
    input,
    select,
    textarea {
        font-size: 13px;
    }
    input,
    select {
        height: 25px;
        margin-left: 17px;
    }
    input {
        width: 240px;
    }
    i {
        font-size: 12px;
        color: #FF0000;
    }
    .title {
        margin: 20px 0 0 83px;
        color: #1AB394;
    }
    .rule-name {
        margin: 35px 0 0 158px;
        .input-name {
            margin-right: 40px;
        }
    }
    .remakes {
        margin: 22px 0 0 243px;
        textarea {
            width: 575px;
            height: 65px;
            margin-left: 24px;
            vertical-align: top;
        }
    }
    .coupon-type {
        margin: 22px 0 0 171px;
        select{
            width: 200px;
            margin-right: 34px;
        }
        input {
            margin-right: 34px;
        }
        .btn {
            display: inline-block;
            width: 120px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 4px;
            background-color: rgb(0, 153, 0);
            color: rgb(255, 255, 255);
        }
    }
    .el-button {
        margin-top: 80px;
    }
    .submit {
        margin-left: 350px;
    }
}
</style>
