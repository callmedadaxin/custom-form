<template>
  <div>
    <el-input v-model=""></el-input>
    <hr>
    <custom-form name="test" 
      @on-submit="onSubmit"  
      :items="formRule" 
      :data="data" 
      :rules="rules">
    </custom-form>
  </div>
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
        date: {
          type: 'date',
          label: '活动时间',
        },
        type: {
          type: 'checkbox',
          label: '活动性质',
          options: [{
            label: '美食/餐厅线上活动',
            value: 1
          }, {
            label: '地推活动',
            value: 2
          }, {
            label: '线下主题活动',
            value: 3,
            disabled: true
          }, {
            label: '单纯品牌曝光',
            value: 4
          }]
        },
        resource: {
          type: 'radio',
          label: '特殊资源',
          options: [{
            label: '线上品牌商赞助',
            value: '0'
          }, {
            label: '线下场地免费',
            value: '1'
          }]
        }
      },
      data: {
        name: '',
        region: '',
        date: '',
        delivery: false,
        type: [],
        resource: '0',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onSubmit(data) {
      console.log(data)
    }
  },

  components: {
  	CustomForm
  }
};
</script>

<style lang="css" scoped>
</style>