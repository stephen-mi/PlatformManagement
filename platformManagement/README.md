### 自己写个性化页面样式问题

* **主要用elementUi**
* **from结构**

``` input结构
<el-input  v-model="headline" placeholder="满100减50" size="mini" style="width:250px" ></el-input>
```

``` textarea结构
 <el-input type="textarea" :rows="2"  v-model="deataildescription" style="width: 760px;"></el-input>
```

``` select结构
  <el-select v-model="formulaValue" placeholder="请选择">
    <el-option
      v-for="item in formula"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
```

``` 时间控件带开始至结束时间
    <el-date-picker
        v-model="dataTimes"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
    </el-date-picker>
```

* **button**

``` 查看规则按钮
<el-button type="info" class="look_btn" size="mini">查看规则</el-button>
```

``` 保存 搜索 查询 
<el-button type="primary">返回</el-button>
```

``` 返回 取消 
<el-button>默认按钮</el-button>
```
* **selection**