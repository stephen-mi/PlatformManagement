<template>
  <div class="UploadCdn" >
    <label>上传角标:</label>
    <el-input :readonly="typePage=== 'details'" :class="[typePage=== 'details'? 'removeBorder': '']" v-model="saveurl"  size="mini" style="width:250px"></el-input>

    <el-button type="primary" size="mini" icon="el-icon-delete" style="margin-left: 10px;margin-right:10px"></el-button>
   <el-upload
        class="upload-demo"
        action=""
        :before-upload = "uploadFile"
        :limit="1"

        >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
  </div>
</template>
<script>
  import { UploadCdn } from '@/api/promotion.js'
  export default {
    name: 'UploadCdn',
    components: {

    },
    props: {

    },
    data() {
      return {
        saveurl: '',
        typePage: 'add',
        dealerId: 'static',
        linkId: '1',
        imgType: '2',
        ajaxurl: 'http://upload.winhxd.com:8100/crm/uploadResource2CDNAction.do?method=uploadProductPicture4Dealer&dealerId=static&linkId=444&imgType=444'
      }
    },
    watch: {

    },
    methods: {
      uploadFile(file) {
        debugger
        const FormDatas = new FormData()
        FormDatas.append('file', file)
        const Files = FormDatas
        const url = 'http://upload.winhxd.com:8100/crm/uploadResource2CDNAction.do?method=uploadProductPicture4Dealer&dealerId=' + this.dealerId + '&linkId=' + this.linkId + '&imgType=' + this.imgType
        this.ajaxurl = url
        UploadCdn(url, Files).then(res => {
          alert('1')
        }).catch(err => {
          alert(2)
          console.log(err)
        })
        return true
      },
      submit(res) {
        console.log(res)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
.UploadCdn {
  display: flex;
  align-items: center;
  label {
    display: inline-block;
    margin-right: 30px;
    width: 164px;
    text-align: right;
    font-size: 12px;
    font-style: normal;
  }
}
</style>
