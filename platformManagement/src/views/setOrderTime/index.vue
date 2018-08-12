<template>
    <div>
        <div class="content">
            <div class="word">用户下单后商家确认时间段</div>
            <div class="date"><input type="number">小时</div>
            <div class="describe">未确认订单自动取消</div>
            <div class="btn">保存</div>
        </div>
        <div class="content">
            <div class="word">商家确认后用户自提时间段</div>
            <div class="date">36小时</div>
            <div class="describe">未取货订单自动取消</div>
            <div class="btn">编辑</div>
        </div>
        <div class="content">
            <div class="word">用户退款后商家确认时间段</div>
            <div class="date">12小时</div>
            <div class="describe">未确认到时自动退款</div>
            <div class="btn">编辑</div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'setOrderTime',
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
.content {
    margin: 28px 0 0 38px;
    div {
        display: inline-block;
        font-size: 14px;
    }
    .date {
        width: 210px;
        text-align: center;
        input {
            width: 90px;
            height: 26px;
            margin-right: 10px;
            text-align: center;
        }
    }
    .btn {
        margin-left: 40px;
    }
}
</style>
