<template>
    <div class="wrap">
        <div class="income content">
            <div class="income-total total">总进账：3546345元</div>
            <div class="income-today second">今日进账：3546345元</div>
            <div class="income-advance three">今日预收款：3546345元</div>
            <div class="income-net second">今日实收款：3546345元</div>
            <div class="check-detail">查看明细>></div>
        </div>
        <div class="pay content">
            <div class="pay-total total">总出账：3546345元</div>
            <div class="pay-today second">今日出账：3546345元</div>
            <div class="user-refund three">今日用户退款：3546345元</div>
            <div class="store-withdraw second">今日门店提现：3546345元(提现手续费：50000元)</div>
            <div class="check-detail">查看明细>></div>
        </div>
        <div class="discount content">
            <div class="discount-total total">优惠券抵用总金额：747388392元</div>
            <div class="discount-today second">今日抵用：7478392元</div>
        </div>
        <div class="company-income content">
            <div class="total">公司补充总入账：100000元</div>
            <div class="check-detail">查看明细>></div>
        </div>
        <div class="total balance">当前余额：33265元</div>
    </div>
</template>

<script>

export default {
  name: 'financeManage',
  data() {
    return {}
  },
  components: {},
  computed: {},
  props: {},
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
    width: 960px;
    margin: 30px 0 0 40px;
    div {
        font-size: 14px;
    }

    .content {
        position: relative;
        padding: 12px 0 20px 0;
        border-bottom: 1px solid #777;
    }

    .check-detail {
        position: absolute;
        top: 8px;
        right: 20px;
        font-family: "Arial Negreta", Arial;
        font-weight: 800px;
        font-size: 16px;
    }

    .total {
        font-family: "Arial Negreta", Arial;
        font-weight: 900px;
        font-size: 19px;
    }

    .second {
        margin-top: 13px;
    }

    .three {
        margin-top: 36px;
    }

    .balance {
        margin-top: 20px;
    }
}
</style>
