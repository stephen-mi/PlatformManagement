<template>
  <div class="tipsImput" >
    <el-input  v-model="addtemplatinput" :placeholder="placeholdertext" size="mini" style="width:250px" v-if="type=='input'"></el-input>
    <el-input type="textarea" :rows="2"  v-model="addtemplattextarea" v-if="type=='textarea'"></el-input>
    <i class="el-icon-tickets" @click="tipscontenshow = !tipscontenshow"></i>
    <div class="tipsconten" v-show="tipscontenshow">
      <p class="tipsconten-header"><i class="el-icon-close" @click="tipscontenshow = false"></i></p>
      <div class="tipsconten-conten">
        <p>说明</p>
        <p>【字段说明】</p>
        <p>{{tipsmess.explain}}</p>
        <p>【字段类型】</p>
        <p>{{tipsmess.fieldtype}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'addtemplate',
    components: {

    },
    props: {
      tipsmess: {
        type: Object
      },
      type: {
        type: String,
        default: 'input'
      },
      placeholdertext: {
        type: String
      },
      value: {
        type: String
      }
    },
    data() {
      return {
        tipscontenshow: false,
        addtemplatinput: '',
        addtemplattextarea: ''
      }
    },
    watch: {
      addtemplatinput(newvalue, oldvalue) {
        this.$emit('input', newvalue)
      },
      addtemplattextarea(newvalue, oldvalue) {
        this.$emit('input', newvalue)
      }
    },
    methods: {

    }
  }
</script>

<style type="text/scss" lang="scss">
.tipsImput {
  position: relative;
  display: inline-block;
  input {
    width: 100%;
  }
  .el-icon-tickets {
    position: absolute;
    right: -8px;
    top: -8px;
    z-index: 99;
    background: #16752192;
    color: #fff;
    cursor: pointer;
  }
  .tipsconten {
    position: absolute;
    top: 10px;
    right: 0px;
    z-index:999;
    width: 350px;
    border: 1px solid #ccc;
    background: #fff;
    .tipsconten-header {
      height: 30px;
      margin: 0;
      background: #ccc;
      position: relative;
      .el-icon-close {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
    .tipsconten-conten {
      overflow-y: auto;
      padding-left: 15px;
      height: 170px;
      p {
        font-size: 14px;
      }
      p:nth-of-type(1) {
        font-weight: bold;
      }
    }
  }
  textarea{
    resize: none;
    width: 760px;
    height: 100px;
  }
}
</style>
