<template>
  <el-form-item :label="options.label" :prop="prop">
    <!-- input类型 -->
    <el-input v-if="options.type=== 'input' || options.type=== 'textarea'" 
      :type="options.type"
      :placeholder="options.placeholder"
      :disabled="options.disabled"
      v-model="ruleForm[prop]">
    </el-input>
    <!-- select类型 -->
    <el-select v-if="options.type === 'select'" 
      :filterable="computedFilterAble(options)"
      v-model="ruleForm[prop]"
      :multiple="options.multiple"
      :disabled="options.disabled" 
      :placeholder="options.placeholder">
      <el-option
        v-for="item in options.options"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled">
      </el-option>
    </el-select>
    <!-- switch类型 -->
    <el-switch
      v-if="options.type === 'switch'"
      v-model="ruleForm[prop]"
      on-text=""
      off-text="">
    </el-switch>
    <!-- datepicker类型,datetime类型 -->
    <el-date-picker
      v-if="options.type === 'date' || options.type === 'datetime'"
      v-model="ruleForm[prop]"
      :type="options.type"
      :placeholder="options.placeholder">
    </el-date-picker>
    <!-- checkbox类型 -->
    <el-checkbox-group 
      v-if="options.type === 'checkbox'"
      v-model="ruleForm[prop]">
      <el-checkbox v-for="item in options.options" 
        :disabled="item.disabled"
        :label="item.value">
        {{item.label}}
      </el-checkbox>
    </el-checkbox-group>
    <!-- radio类型 -->
    <el-radio-group 
      v-if="options.type === 'radio'"
      v-model="ruleForm[prop]">
      <el-radio v-for="item in options.options"
        :disabled="item.disabled"
        :label="item.value">
        {{item.label}}    
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  props: {
    ruleForm: Object,
    prop: String,
    options: {
      type: Object,
      default: function () {
        return {
          type: 'input'
        }
      }
    }
  },

  name: 'form-item',

  methods: {
    computedFilterAble(options) {
      return options.length > 12;
    }
  }
};
</script>
