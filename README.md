# vue-custom-form

> 根据字段，自动生成表单，表单内容依赖element-ui,支持表单验证

```
<template>
  <custom-form 
    name="test" 
    @on-submit="onSubmit"  
    :items="formRule" 
    :data="data" 
    :rules="rules">
  </custom-form>
</template>

<script>
import CustomForm from 'custom-form';

export default {
  data () {
    return {
      formRule: {
        name: {
          type: 'input',
          label: '活动名称',
          placeholder: '请输入活动名称',
        },
        region: {
          type: 'select',
          label: '活动区域',
          placeholder: '请选择活动区域',
          options: [{
            label: '区域一',
            value: 'shanghai',
          },{
            label: '区域二',
            value: 'beijing'
          }]
        },
        delivery: {
          type: 'switch',
          label: '及时配送'
        },
        ...
      },
      data: {
        name: '',
        region: '',
        date: '',
        delivery: false,
        ...
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        ...
      }
    }
  }
}
```
