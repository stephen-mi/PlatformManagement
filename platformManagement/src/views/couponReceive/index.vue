<template>
    <div class="wrap">
        <div class="title">优惠券领券管理</div>
        <div class="activity">
            <div class="word">
                <span>*</span>领券活动名称：</div>
            <input class="activity-name" type="text"> 领券活动ID：
            <input class="activityID" type="text">
        </div>
        <div class="explain">
            <div class="word">领券活动说明：</div>
            <input type="text">
        </div>
        <div class="remark">
            <div class="word">领券活动备注：</div>
            <textarea class="activity-remark"></textarea>
        </div>
        <div class="appoint-store">
            <div class="word">
                <span>*</span>指定惠小店：
            </div>
            <select class="select-common" v-model="appointType">
                <option v-for="(item,i) in storeOption" :key="i" :value="item.value" :disabled="item.disabled">{{item.text}}</option>
            </select>
            <div class="check-rule button">查看规则</div>
            <div class="according-area" v-if="appointType == '1'">
                <div class="add">
                    省份：
                    <select>
                        <option v-for="(item,i) in province" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    城市：
                    <select>
                        <option v-for="(item,i) in city" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    区县：
                    <select>
                        <option v-for="(item,i) in county" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    镇/街道：
                    <select>
                        <option v-for="(item,i) in town" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    村/居委会：
                    <select>
                        <option v-for="(item,i) in village" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    <div class="check-rule button">增加</div>
                </div>
                <div class="delete">
                    省份：
                    <select>
                        <option v-for="(item,i) in province" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    城市：
                    <select>
                        <option v-for="(item,i) in city" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    区县：
                    <select>
                        <option v-for="(item,i) in county" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    镇/街道：
                    <select>
                        <option v-for="(item,i) in town" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    村/居委会：
                    <select>
                        <option v-for="(item,i) in village" :key="i" value="item.text">{{item.text}}</option>
                    </select>
                    <div class="check-rule button">增加</div>
                    <div class="check-rule button">删除</div>
                </div>
                <div class="chosen">
                    己选择
                    <span class="chosen-num">100</span>
                    家惠小店
                </div>
                <div class="close button" @click="appointType = '0'">关闭</div>
                <div class="confirm button" @click="appointType = '0'">确定</div>
            </div>
            <div class="user-defined" v-if="appointType == '2'">
                <div class="storeID">
                    <span>惠小店ID：</span>
                    <input type="text">
                </div>
                <div class="import button">导入</div>
                <div class="chosen">
                    己选择
                    <span class="chosen-num">100</span>
                    家惠小店
                </div>
            </div>
        </div>
        <div class="appoint-coupon common-margin">
            <div class="word">
                <span>*</span>指定优惠券：
            </div>
            <input type="text" @click="isShowPopup = true">
            <div class="check-rule button">查看规则</div>
            <div class="check-rule button">增加</div>
        </div>
        <div class="select-date common-margin">
            <div class="word">
                <span>*</span>指定活动时间：
            </div>
            <input type="date" placeholder="选择日期">
            <input type="date" placeholder="选择日期">
        </div>
        <div class="count-limit common-margin">
            <div class="word">
                <span>*</span>发放优惠券数量的限制：
            </div>
            <select class="select-common">
                <option v-for="(item,i) in countLimitOption" :key="i" value="item.text">{{item.text}}</option>
            </select>
            <div class="check-rule button">查看规则</div>
        </div>
        <div class="user-limit common-margin">
            <div class="word">
                <span>*</span>C端用户领券限制：</div>
            <select class="select-common">
                <option v-for="(item,i) in userLimitOption" :key="i" value="item.text">{{item.text}}</option>
            </select>
            <div class="check-rule button">查看规则</div>
        </div>
        <div class="select-date common-margin">
            <div class="word">
                <span>*</span>优惠券有效期：
            </div>
            <input type="date">
            <input type="date">
        </div>
        <div class="submit">提交</div>
        <div class="back">返回</div>
        <div class="popup" v-if="isShowPopup">
            <div class="content">
                <div class="popup-title">设定优惠券</div>
                <div class="close" @click="isShowPopup = false">×</div>
                <div class="popup-name">
                    优惠券编码：<input type="text">
                    优惠券名称：<input type="text">
                    <div class="button search">搜索</div>
                    <div class="button reset">重置</div>
                </div>
                <div class="coupon-details">
                    <el-table ref="multipleTable" :data="couponData.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 100%" :current-page="currentPage" @selection-change="handleSelectionChange" border height=400 :row-style="rowStyle">
                        <el-table-column type="selection" width="40">
                        </el-table-column>
                        <el-table-column label="序号" width="66">
                            <template slot-scope="scope">{{ scope.row.number }}</template>
                        </el-table-column>
                        <el-table-column prop="name" label="优惠券编码" width="260">
                            <template slot-scope="scope">{{ scope.row.code }}</template>
                        </el-table-column>
                        <el-table-column prop="address" label="优惠券名称" width="260" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                    </el-table>
                    <div class="describe">
                        显示第1到第10条记录，总共{{totalDataNumber}}条记录 每页显示{{pageSize}}条记录
                    </div>
                    <div class="my-pagination">
                        <el-pagination background layout="prev, pager, next" :total="totalDataNumber" :page-size="pageSize" @current-change="current_change">
                        </el-pagination>
                    </div>
                    <div class="button popup-close" @click="isShowPopup = false">关闭</div>
                    <div class="button popup-confirm" @click="isShowPopup = false">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'couponOff',
  data() {
    return {
      storeOption: [
        {
          value: '0',
          text: '请选择',
          disabled: true
        },
        {
          value: '1',
          text: '按区域选择惠小店'
        },
        {
          value: '2',
          text: '自定义导入惠小店'
        }
      ],
      appointType: '0',
      province: [
        {
          value: '00',
          text: '请选择',
          disabled: true
        },
        {
          value: '01',
          text: '北京'
        },
        {
          value: '02',
          text: '河南'
        },
        {
          value: '01',
          text: '湖南'
        },
        {
          value: '01',
          text: '广西'
        },
        {
          value: '01',
          text: '江西'
        },
        {
          value: '01',
          text: '陕西'
        },
        {
          value: '01',
          text: '山西'
        },
        {
          value: '01',
          text: '云南'
        },
        {
          value: '01',
          text: '贵州'
        },
        {
          value: '01',
          text: '河北'
        }
      ],
      city: [
        {
          value: '00',
          text: '请选择',
          disabled: true
        },
        {
          value: '01',
          text: '北京'
        },
        {
          value: '02',
          text: '河南'
        },
        {
          value: '01',
          text: '湖南'
        },
        {
          value: '01',
          text: '广西'
        },
        {
          value: '01',
          text: '江西'
        },
        {
          value: '01',
          text: '陕西'
        },
        {
          value: '01',
          text: '山西'
        },
        {
          value: '01',
          text: '云南'
        },
        {
          value: '01',
          text: '贵州'
        },
        {
          value: '01',
          text: '河北'
        }
      ],
      county: [
        {
          value: '00',
          text: '请选择',
          disabled: true
        },
        {
          value: '01',
          text: '北京'
        },
        {
          value: '02',
          text: '河南'
        },
        {
          value: '01',
          text: '湖南'
        },
        {
          value: '01',
          text: '广西'
        },
        {
          value: '01',
          text: '江西'
        },
        {
          value: '01',
          text: '陕西'
        },
        {
          value: '01',
          text: '山西'
        },
        {
          value: '01',
          text: '云南'
        },
        {
          value: '01',
          text: '贵州'
        },
        {
          value: '01',
          text: '河北'
        }
      ],
      town: [
        {
          value: '00',
          text: '请选择',
          disabled: true
        },
        {
          value: '01',
          text: '北京'
        },
        {
          value: '02',
          text: '河南'
        },
        {
          value: '01',
          text: '湖南'
        },
        {
          value: '01',
          text: '广西'
        },
        {
          value: '01',
          text: '江西'
        },
        {
          value: '01',
          text: '陕西'
        },
        {
          value: '01',
          text: '山西'
        },
        {
          value: '01',
          text: '云南'
        },
        {
          value: '01',
          text: '贵州'
        },
        {
          value: '01',
          text: '河北'
        }
      ],
      village: [
        {
          value: '00',
          text: '请选择',
          disabled: true
        },
        {
          value: '01',
          text: '北京'
        },
        {
          value: '02',
          text: '河南'
        },
        {
          value: '01',
          text: '湖南'
        },
        {
          value: '01',
          text: '广西'
        },
        {
          value: '01',
          text: '江西'
        },
        {
          value: '01',
          text: '陕西'
        },
        {
          value: '01',
          text: '山西'
        },
        {
          value: '01',
          text: '云南'
        },
        {
          value: '01',
          text: '贵州'
        },
        {
          value: '01',
          text: '河北'
        }
      ],
      countLimitOption: [
        {
          value: '0',
          text: '请选择',
          disabled: true
        },
        {
          value: '1',
          text: '发放总数控制'
        },
        {
          value: '2',
          text: '每店数量控制'
        }
      ],
      userLimitOption: [
        {
          value: '0',
          text: '请选择',
          disabled: true
        },
        {
          value: '1',
          text: 'C端用户领券限制'
        },
        {
          value: '2',
          text: '不限'
        }
      ],
      isShowPopup: false,
      couponData: [
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
        },
        {
          number: '14',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '15',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '16',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '17',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '18',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '19',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '20',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '21',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '22',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '23',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '24',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '25',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '26',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '27',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '28',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '29',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '30',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '31',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '32',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '33',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '34',
          code: 'asdjkas123455',
          name: '阿大声道'
        },
        {
          number: '35',
          code: 'asdjkas123455',
          name: '阿大声道'
        }
      ],
      pageSize: 10,
      // pageSizesList: [10, 15, 20, 30, 50],
      totalDataNumber: 35,
      currentPage: 1
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
    rowStyle({ row, rowIndex }) {
      return 'height: 30px'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    .title {
        width: 200px;
        padding-top: 20px;
        text-align: right;
        font-size: 16px;
        color: rgb(26, 179, 148);
    }
    input {
        margin-left: 20px;
        font-size: 14px;
    }
    .word {
        display: inline-block;
        width: 200px;
        text-align: right;
        font-size: 14px;
        span {
            font-size: 14px;
            color: red;
        }
    }
    .button {
        display: inline-block;
        width: 74px;
        height: 22px;
        margin-left: 10px;
        line-height: 22px;
        border: 1px solid #000;
        font-size: 12px;
        text-align: center;
    }
    select {
        font-size: 14px;
        option {
            font-size: 14px;
        }
    }
    .select-common {
        margin-left: 20px;
    }
    .activity {
        margin-top: 42px;
        font-size: 14px;
        .activity-name {
            width: 300px;
            margin-right: 80px;
        }
        .activityID {
            margin-left: 0;
        }
    }
    .explain {
        margin-top: 18px;
    }
    .remark {
        margin-top: 18px;
        .activity-remark {
            width: 760px;
            height: 100px;
            vertical-align: top;
            margin-left: 20px;
            font-size: 14px;
        }
    }
    .appoint-store {
        margin-top: 38px;
        .check-rule {
            margin-left: 16px;
        }
        .according-area {
            height: 160px;
            margin-left: 160px;
            div {
                margin-top: 12px;
                font-size: 14px;
            }
            .chosen {
                height: 30px;
                width: 770px;
                line-height: 30px;
                border-bottom: 1px solid #7d7d7d;
                .chosen-num {
                    color: #009900;
                }
            }
            .close {
                width: 54px;
                margin-left: 650px;
                border: 1px solid #000;
            }
            .confirm {
                width: 54px;
                margin-left: 12px;
                background-color: rgb(26, 179, 148);
                border: none;
                color: #fff;
            }
        }
        .user-defined {
            height: 160px;
            margin-left: 160px;
            .storeID {
                display: inline-block;
                margin-top: 14px;
                font-size: 14px;
            }
            .chosen {
                width: 770px;
                margin-top: 14px;
                font-size: 14px;
            }
        }
    }
    .common-margin {
        margin-top: 20px;
    }
    .submit {
        display: inline-block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 140px 20px 0 410px;
        border: 1px solid rgb(26, 179, 148);
        color: rgb(26, 179, 148);
        font-size: 14px;
    }
    .back {
        display: inline-block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-top: 140px;
        border: 1px solid rgb(51, 51, 51);
        color: rgb(51, 51, 51);
        font-size: 14px;
    }
    .popup {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(47, 79, 79, .6);
        .content {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 790px;
            height: 590px;
            background-color: #fff;
            .popup-title {
                width: 200px;
                margin: 12px 0 0 10px;
                font-size: 14px;
                color: #009900;
            }
            .close {
                position: absolute;
                top: 5px;
                right: 20px;
                font-size: 16px;
                font-weight: 900;
                cursor: pointer;
            }
            .popup-name {
                margin: 10px 0 30px 50px;
                font-size: 14px;
                .search {
                    width: 60px;
                    background-color: rgb(26, 179, 148);
                    border: none;
                    color: #fff;
                }
                .reset {
                    width: 60px;
                    border: none;
                    background-color: rgb(194, 194, 194);
                    color: #fff;
                }
            }
            .coupon-details {
                margin-left: 50px;
                .describe {
                    display: inline-block;
                    width: 380px;
                    margin-top:22px;
                    font-size: 12px;
                }
                .my-pagination {
                    display: inline-block;
                    margin:22px 0 12px 40px;
                }
                .popup-close {
                    width: 60px;
                    margin-left: 540px;
                }
                .popup-confirm {
                    width: 60px;
                    background-color: rgb(26, 179, 148);
                    color: #fff;
                    border: 1px solid rgb(26, 179, 148);
                }
            }
        }
    }
}
</style>
