<template>
    <div class="card">
		<div class="power">
			<label for="">权限组名称</label>
			<el-input v-model="permissionGroup" placeholder="请输入权限组名称"></el-input>
		</div>
       	<el-tree
			:data="data2"
			show-checkbox
			default-expand-all
			node-key="code"
			ref="tree"
			highlight-current
			:props="defaultProps">
		</el-tree>
		<el-button type="primary">保存</el-button>
    </div>
</template>
<script>
// import {getAuthorityData} from '@/api/report';
export default {
  name: 'authorization',
  data() {
    return {
      permissionGroup: '', // 权限组名称
      data2: [
        {
          code: 1,
          name: '商品管理',
          children: [
            {
              code: 11,
              name: '商品库',
              children: [
                {
                  code: 111,
                  name: 'SPU库',
                  children: [
                    {
                      code: 1111,
                      name: '搜索'
                    },
                    {
                      code: 1112,
                      name: '新增'
                    },
                    {
                      code: 1113,
                      name: '编辑'
                    },
                    {
                      code: 1114,
                      name: '状态转换'
                    }
                  ]
                },
                {
                  code: 112,
                  name: 'SKU库',
                  children: [
                    {
                      code: 1121,
                      name: '搜索'
                    },
                    {
                      code: 1122,
                      name: '新增'
                    },
                    {
                      code: 1123,
                      name: '编辑'
                    },
                    {
                      code: 1124,
                      name: '状态转换'
                    }
                  ]
                }
              ]
            },
            {
              code: 12,
              name: '品牌管理',
              children: [
                {
                  code: 121,
                  name: '供应商库',
                  children: [
                    {
                      code: 1211,
                      name: '搜索'
                    },
                    {
                      code: 1212,
                      name: '新增'
                    },
                    {
                      code: 1213,
                      name: '编辑'
                    },
                    {
                      code: 1214,
                      name: '删除'
                    },
                    {
                      code: 1215,
                      name: '状态转换'
                    }
                  ]
                },
                {
                  code: 122,
                  name: '品牌库',
                  children: [
                    {
                      code: 1221,
                      name: '搜索'
                    },
                    {
                      code: 1222,
                      name: '新增'
                    },
                    {
                      code: 1223,
                      name: '编辑'
                    },
                    {
                      code: 1224,
                      name: '删除'
                    },
                    {
                      code: 1225,
                      name: '状态转换'
                    }
                  ]
                }
              ]
            },
            {
              code: 13,
              name: '类目库',
              children: [
                {
                  code: 131,
                  name: '类目库',
                  children: [
                    {
                      code: 1311,
                      name: '搜索'
                    },
                    {
                      code: 1312,
                      name: '新增'
                    },
                    {
                      code: 1313,
                      name: '编辑'
                    },
                    {
                      code: 1314,
                      name: '删除'
                    },
                    {
                      code: 1315,
                      name: '状态转换'
                    }
                  ]
                },
                {
                  code: 132,
                  name: '类目树',
                  children: [
                    {
                      code: 1321,
                      name: '搜索'
                    },
                    {
                      code: 1322,
                      name: '新增'
                    },
                    {
                      code: 1323,
                      name: '编辑'
                    },
                    {
                      code: 1324,
                      name: '状态转换'
                    }
                  ]
                }
              ]
            },
            {
              code: 14,
              name: '属性库',
              children: [
                {
                  code: 141,
                  name: '搜索'
                },
                {
                  code: 142,
                  name: '新增'
                },
                {
                  code: 143,
                  name: '编辑'
                },
                {
                  code: 144,
                  name: '状态转换'
                }
              ]
            },
            {
              code: 15,
              name: '门店商品管理',
              children: [
                {
                  code: 151,
                  name: '搜索'
                },
                {
                  code: 152,
                  name: '查看'
                },
                {
                  code: 153,
                  name: '下架'
                },
                {
                  code: 154,
                  name: '状态转换'
                }
              ]
            },
            {
              code: 16,
              name: '商品提报审核',
              children: [
                {
                  code: 161,
                  name: '搜索'
                },
                {
                  code: 162,
                  name: '查看'
                },
                {
                  code: 163,
                  name: '上架'
                },
                {
                  code: 164,
                  name: '播放'
                }
              ]
            }
          ]
        },
        {
          code: 2,
          name: '门店管理',
          children: [
            {
              code: 21,
              name: '搜索'
            },
            {
              code: 22,
              name: '新增'
            },
            {
              code: 23,
              name: '编辑'
            },
            {
              code: 24,
              name: '查看'
            }
          ]
        },
        {
          code: 3,
          name: '顾客管理',
          children: [
            {
              code: 31,
              name: '顾客',
              children: [
                {
                  code: 311,
                  name: '搜索'
                },
                {
                  code: 312,
                  name: '查看'
                },
                {
                  code: 313,
                  name: '导出Excel'
                },
                {
                  code: 314,
                  name: '移入黑名单'
                },
                {
                  code: 315,
                  name: '查看订单明细'
                }
              ]
            },
            {
              code: 32,
              name: '黑名单',
              children: [
                {
                  code: 321,
                  name: '搜索'
                },
                {
                  code: 322,
                  name: '查看'
                },
                {
                  code: 323,
                  name: '导出Excel'
                },
                {
                  code: 324,
                  name: '移出黑名单'
                },
                {
                  code: 325,
                  name: '查看订单明细'
                }
              ]
            }
          ]
        },
        {
          code: 4,
          name: '订单管理',
          children: [
            {
              code: 41,
              name: '搜索'
            },
            {
              code: 42,
              name: '查看'
            }
          ]
        },
        {
          code: 5,
          name: '财务管理',
          children: [
            {
              code: 51,
              name: '财务管理',
              children: [
                {
                  code: 511,
                  name: '入账查看'
                },
                {
                  code: 512,
                  name: '出账查看'
                },
                {
                  code: 513,
                  name: '搜索'
                }
              ]
            },
            {
              code: 52,
              name: '提款申请',
              children: [
                {
                  code: 521,
                  name: '搜索'
                },
                {
                  code: 522,
                  name: '确认提款'
                }
              ]
            },
            {
              code: 53,
              name: '优惠券核销',
              children: [
                {
                  code: 531,
                  name: '搜索'
                },
                {
                  code: 532,
                  name: '查看详情'
                },
                {
                  code: 533,
                  name: '确认核销'
                }
              ]
            }
          ]
        },
        {
          code: 6,
          name: '促销管理',
          children: [
            {
              code: 61,
              name: '优惠券模板管理',
              children: [
                {
                  code: 611,
                  name: '搜索'
                },
                {
                  code: 612,
                  name: '添加'
                },
                {
                  code: 613,
                  name: '查看'
                },
                {
                  code: 614,
                  name: '编辑'
                }
              ]
            },
            {
              code: 62,
              name: '适用对象规则管理',
              children: [
                {
                  code: 621,
                  name: '搜索'
                },
                {
                  code: 622,
                  name: '添加'
                },
                {
                  code: 623,
                  name: '查看'
                },
                {
                  code: 624,
                  name: '编辑'
                },
                {
                  code: 625,
                  name: '删除'
                },
                {
                  code: 626,
                  name: '复用'
                }
              ]
            },
            {
              code: 63,
              name: '出资方规则管理',
              children: [
                {
                  code: 631,
                  name: '搜索'
                },
                {
                  code: 632,
                  name: '添加'
                },
                {
                  code: 633,
                  name: '查看'
                },
                {
                  code: 634,
                  name: '编辑'
                },
                {
                  code: 635,
                  name: '删除'
                },
                {
                  code: 636,
                  name: '复用'
                }
              ]
            },
            {
              code: 64,
              name: '优惠券领劵管理',
              children: [
                {
                  code: 641,
                  name: '搜索'
                },
                {
                  code: 642,
                  name: '添加'
                },
                {
                  code: 643,
                  name: '查看'
                },
                {
                  code: 644,
                  name: '编辑'
                },
                {
                  code: 645,
                  name: '复用'
                },
                {
                  code: 646,
                  name: '停止'
                },
                {
                  code: 647,
                  name: '撤回'
                }
              ]
            },
            {
              code: 65,
              name: '优惠券推劵管理',
              children: [
                {
                  code: 651,
                  name: '搜索'
                },
                {
                  code: 652,
                  name: '添加'
                },
                {
                  code: 653,
                  name: '查看'
                },
                {
                  code: 654,
                  name: '编辑'
                },
                {
                  code: 655,
                  name: '复用'
                },
                {
                  code: 656,
                  name: '停止'
                },
                {
                  code: 657,
                  name: '撤回'
                }
              ]
            }
          ]
        },
        {
          code: 7,
          name: '消息管理',
          children: [
            {
              code: 71,
              name: '搜索'
            },
            {
              code: 72,
              name: '新增'
            },
            {
              code: 73,
              name: '编辑'
            },
            {
              code: 74,
              name: '推送'
            },
            {
              code: 75,
              name: '删除'
            }
          ]
        },
        {
          code: 8,
          name: '系统管理',
          children: [
            {
              code: 81,
              name: '权限管理',
              children: [
                {
                  code: 811,
                  name: '搜索'
                },
                {
                  code: 812,
                  name: '新增'
                },
                {
                  code: 813,
                  name: '编辑'
                },
                {
                  code: 814,
                  name: '删除'
                }
              ]
            },
            {
              code: 82,
              name: '成员管理',
              children: [
                {
                  code: 821,
                  name: '搜索'
                },
                {
                  code: 822,
                  name: '新增'
                },
                {
                  code: 823,
                  name: '编辑'
                },
                {
                  code: 824,
                  name: '删除'
                },
                {
                  code: 825,
                  name: '查看'
                },
                {
                  code: 826,
                  name: '重置密码'
                }
              ]
            },
            {
              code: 83,
              name: '订单时间设置'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
      this.$refs.tree.store._getAllNodes()[i].expanded = false
    }
    // this.getAuthority();
  },
  methods: {
    // 请求权限组数据---权限管理新增进入页面请求
    // getAuthority() {
    //   const params = {
    //     'id': 11,
    //     'permissions': [
    //       {
    //         'id': 1,
    //         'permission': '2254',
    //         'permissionName': 'shop',
    //         'roleId': 0
    //       }
    //     ],
    //     'roleName': '商品名称'
    //   }
    //   getAuthorityData('/role/add', 'post', params).then(res => {
    //     console.log(res)
    //   }).catch(errData => {
    //     console.log('error 出错了')
    //     console.log(errData)
    //   })
    // },
    // getCheckedNodes() {
    //   console.log(this.$refs.tree.store._getAllNodes())
    // }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
.power {
  padding: 25px 35px;
  box-sizing: border-box;
  label {
    font-weight: 400;
    padding-right: 15px;
  }
  .el-input {
    width: 178px;
  }
}
.el-tree {
  padding-left: 60px;
  padding-bottom: 45px;
  box-sizing: border-box;
}
.el-button {
  display: block;
  margin: 0 auto;
}
</style>
