<template>
  <div :class="divClass">
    <label>{{ labelText }}</label>
    <input
      :type="typeInput"
      class="form-control"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    divClass: String,
    labelText: String,
    typeInput: String,
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
    value: [String, Number],
  },
  data() {
    return {
      label: this.label,
    };
  },
  methods: {
    updateValue(event) {
      return this.$emit("input", event.target.value);
    },
  },
};
</script>

<style>

</style>
