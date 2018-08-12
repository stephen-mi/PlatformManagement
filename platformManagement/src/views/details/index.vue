<template>
    <div class="card">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <p><span class="title">订单编号：</span><span>{{orderInfoDetailVO.orderNo}}</span></p>
                <p><span class="title">下单时间：</span><span>{{orderInfoDetailVO.created}}</span></p>
                <p><span class="title">实付金额：</span><span v-if="orderInfoDetailVO.realPaymentMoney">{{orderInfoDetailVO.realPaymentMoney}}元</span></p>
                <p><span class="title">优惠金额：</span><span v-if="orderInfoDetailVO.discountMoney">{{orderInfoDetailVO.discountMoney}}元</span></p>
                <p><span class="title">下单店铺：</span><span>{{orderInfoDetailVO.customerId}}</span></p>
                <p><span class="title">下单商品：</span>
                    <ul>
                        <li v-for="item in orderInfoDetailVO.orderItemVoList">
                            <span>{{item.productName}}</span>
                            <span>X{{item.amount}}{{item.skuCode}}</span>
                            <span v-if="item.price">{{item.price * item.amount}}元</span>
                        </li>
                    </ul>
                </p>
                <p><span class="title">订单类型：</span><span>{{orderInfoDetailVO.orderType}}</span></p>
                <p><span class="title">支付方式：</span><span>{{orderInfoDetailVO.payType}}</span></p>
                <p><span class="title">使用优惠券：</span><span>{{orderInfoDetailVO.useCoupon}}</span></p>
            </div>
            <p>
                <span class="title">订单状态：</span>
                <ul>
                    <li v-for="(item, index) in orderChangeVoList" :key="index">
                        <span class="status">{{item.changeDateTime}}</span>
                        <span class="status">{{item.changeMsg}}</span>
                    </li>
                </ul>
            </p>

        </el-card>
    </div>
</template>
<script>
  export default {
    name: 'details',
    props: {
    },
    created() {
    //   console.log(this.$props.obj)
    },
    data() {
      return {
        'orderInfoDetailVO': {
          'orderNo': 'DD56789543',
          'created': '2018-09-09 09:09:09',
          'realPaymentMoney': 435,
          'discountMoney': 20,
          'customerId': '小明商店',
          'orderItemVoList': [
            {
              'productName': '达利园饼干',
              'amount': 1,
              'price': 13.00,
              'skuCode': '盒'
            },
            {
              'productName': '蒙牛全脂牛奶',
              'amount': 2,
              'price': 32.00,
              'skuCode': '箱'
            },
            {
              'productName': '可比克烧烤味薯片',
              'amount': 3,
              'price': 13.00,
              'skuCode': '包'
            }
          ],
          'orderType': '线上计价',
          'payType': '微信线上支付',
          'useCoupon': '全场通用满一百减二十优惠券'
        },
        'orderChangeVoList': [
          {
            'changeDateTime': '2018-09-09 09:09:09',
            'changeMsg': '订单已完成'
          },
          {
            'changeDateTime': '2018-09-09 09:09:09',
            'changeMsg': '用户已确认'
          },
          {
            'changeDateTime': '2018-09-09 09:09:09',
            'changeMsg': '商铺已确认价格，待用户确认'
          },
          {
            'changeDateTime': '2018-09-09 09:09:09',
            'changeMsg': '订单待提取，取货码：2345'
          },
          {
            'changeDateTime': '2018-09-09 09:09:09',
            'changeMsg': '订单待商铺确认'
          },
          {
            'changeDateTime': '2018-09-09 09:09:09',
            'changeMsg': '订单已提交'
          }
        ]
      }
    },
    watch: {

    },
    methods: {

    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .card{
      width:  100%;
      height: 100%;
      padding: 30px;
      li {
          list-style-type: none;
          height: 30px;
          line-height: 30px;
      }
      p {
          display: -webkit-flex; /* Safari */
          display: flex;
          width: 100%;
          span {
              height: 30px;
              line-height: 30px;
          }
          .title {
              display: inline-block;
              width: 110px;
              margin-right: 10px;
              text-align: right;
          }
          ul {
              display: inline-block;
              padding-inline-start: 0px;
              margin-block-start: 0px;
              margin-block-end: 0px;
              width: calc(100% - 110px);
              li {
                  width: 100%;
                span {
                    display: inline-block;
                    &:first-child {
                        width: 40%;
                        white-space: nowrap;
                        &.status {
                            width: 180px;
                        }
                    }
                    &:nth-child(2) {
                        width: 20%;
                        &.status {
                            width: calc(100% - 200px);
                            white-space: nowrap;
                        }
                    }
                    &:nth-child(3) {
                        width: 20%
                    }
                }
            }
          }
      }
  }
</style>
