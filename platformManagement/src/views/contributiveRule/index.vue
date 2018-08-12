<template>
    <div class="wrap">
        <div class="title">优惠券出资方规则页面</div>
        <div class="contr-rule">
            <span class="star">*</span>
            出资方规则名称：
            <input class="contr-name" type="text" placeholder="出资方规则名称"> 出资方规则编码：
            <input class="contr-code" type="text" value="WS_CZF201807310914_11924">
        </div>
        <div class="remarks">
            备注：
            <textarea>可口可乐商品适用</textarea>
        </div>
        <div class="add-contr handle" v-for="(item, i) in contrList" :key="i">
            <div :class="item.class" @click="handleContr(i)">{{item.title}}</div>
            <span class="star">*</span>
            出资方：
            <select v-model="item.contrRule">
                <option value="惠下单">惠下单</option>
                <option value="经销商">经销商</option>
            </select>
            <div class="brand" v-if="item.contrRule === '经销商'">品牌：</div>
            <input v-if="item.contrRule === '经销商'" type="text" @click="isShowPopup = true">
            <div class="ratio">出资占比：</div>
            <input type="number"> %
        </div>
        <div class="popup" v-if="isShowPopup">
            <div class="content">
                <div class="word">选择品牌</div>
                <div class="close" @click="isShowPopup = false">×</div>
                <div class="head">
                    <div class="brand-code">品牌编码：<input type="text"></div>
                    <div class="brand-name">品牌名称：<input type="text"></div>
                    <el-button type="primary">搜索</el-button>
                    <el-button>重置</el-button>
                </div>
                <div class="brand-table">
                    <el-table ref="multipleTable" :data="brandNameData.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 640px" :current-page="currentPage" @selection-change="handleSelectionChange" border height=400>
                        <el-table-column type="selection" width="40">
                        </el-table-column>
                        <el-table-column label="序号" width="66">
                            <template slot-scope="scope">{{ scope.row.number }}</template>
                        </el-table-column>
                        <el-table-column prop="name" label="品牌编码" width="262">
                            <template slot-scope="scope">{{ scope.row.code }}</template>
                        </el-table-column>
                        <el-table-column prop="address" label="品牌名称" width="262" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="describe">
                    显示第1到第10条记录，总共{{totalDataNumber}}条记录每页显示{{pageSize}}条记录
                </div>
                <div class="my-pagination">
                    <el-pagination background layout="prev, pager, next" :total="totalDataNumber" :page-size="pageSize" @current-change="current_change">
                    </el-pagination>
                </div>
                <div class="footer">
                    <el-button @click="isShowPopup = false">关闭</el-button>
                    <el-button type="primary" @click="isShowPopup = false">确定</el-button>
                </div>
            </div>
        </div>
        <el-button type="primary" class="submit" @click="submit">提交</el-button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'contributiveRule',
  data() {
    return {
      contrList: [
        { id: 1, class: 'add-btn btn', title: '新增出资方', contrRule: '' }
      ],
      brandNameData: [
        {
          number: '01',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '02',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '03',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '04',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '05',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '06',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '07',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '08',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '09',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '10',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '11',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '12',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '13',
          code: 'asdjkas123455',
          name: '阿大声道'
        }
      ],
      pageSize: 10,
      totalDataNumber: 13,
      currentPage: 1,
      isShowPopup: false
    }
  },
  components: {},
  computed: {},
  props: {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    handleContr(index) {
      if (index === 0) {
        this.contrList.push({ id: 1, class: 'delete-btn btn', title: '删除出资方' })
      } else {
        this.contrList = this.contrList.filter((item, i) => {
          return index !== i
        })
      }
    },
    submit() {
      const _params = { 'name': '1233', 'remark': 'wwwwww', 'listDetail': [{ 'names': '惠下单', 'investor_type': '1', 'percent': '30', 'brandCode': '' }, { 'names': '可口可乐', 'investor_type': '2', 'percent': '70', 'brandCode': 'cocola' }] }
      axios({
        method: 'post',
        url: '/coupon/v1/addCouponInvestor',
        data: _params
      }).then(res => {
        console.log(res)
      }).catch(errData => {
        console.log('error 出错了')
        console.log(errData)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
div,
span,
{
    font-size: 12px;
}

input,
select,
textarea {
    font-size: 13px;
    margin-left: 13px;
}

.title {
    margin: 20px 0 0 83px;
    font-size: 14px;
    color: #1AB394;
}

.star {
    font-size: 14px;
    color: #FF0000;
}

.contr-rule {
    margin: 36px 0 0 182px;
    .contr-name {
        width: 258px;
        height: 26px;
    }
    .contr-code {
        width: 210px;
        height: 26px;
    }
}

.remarks {
    margin: 24px 0 0 249px;
    textarea {
        width: 570px;
        height: 60px;
        font-size: 12px;
        vertical-align: top;
    }
}

.handle {
    margin: 24px 0 0 97px;
    div {
        display: inline-block;
    }
    input {
        width: 160px;
        height: 25px;
    }
    .btn {
        width: 120px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 4px;
        color: #fff;
        margin-right: 11px;
    }
    select {
        width: 240px;
        height: 25px;
        font-size: 13px;
    }
    .brand {
        width: 76px;
        text-align: right;
    }
    .ratio {
        width: 98px;
        text-align: right;
    }
}

.delete-btn {
    background-color: rgb(102, 102, 153);
    cursor: pointer;
}

.add-btn {
    background-color: #1AB394;
    cursor: pointer;
}

.popup {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(47, 79, 79, .6);
    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 800px;
        height: 660px;
        background-color: #fff;
        .word {
            width: 800px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-bottom: 1px solid rgb(51, 51, 51);
            font-size: 17px;
            font-weight: 700;
        }
        .close {
            position: absolute;
            top: 10px;
            right: 40px;
            cursor: pointer;
            font-size: 20px;
            font-weight: 900;
            color: rgb(194, 194, 194);
        }
        .head {
            margin-top: 20px;
            .brand-code {
                display: inline-block;
                margin-left: 35px;
                input {
                    width: 100px;
                    height: 25px;
                }
            }
            .brand-name {
                display: inline-block;
                margin-left: 76px;
                input {
                    width: 100px;
                    height: 25px;
                }
            }
            .el-button--primary {
                margin-left: 137px;
            }
        }
        .brand-table {
            margin: 22px 0 0 52px;
        }
        .describe {
            display: inline-block;
            width: 420px;
            margin: 24px 0 25px 52px;
        }
        .my-pagination {
            display: inline-block;
            vertical-align: middle;
        }
        .footer {
            width: 736px;
            height: 60px;
            line-height: 60px;
            text-align: right;
            border-top: 1px solid rgb(101, 101, 101)
        }
    }
}

.submit {
    width: 90px;
    margin: 60px 0 0 380px;
}
</style>
