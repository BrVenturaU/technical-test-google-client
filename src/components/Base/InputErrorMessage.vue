<template>
  <div class="my-1">
    <div
      class="text-danger"
      v-for="(propertyErrors, property, index) in errors"
      :key="index"
    >
    <div v-for="(propertyName, index) in propertyNames" :key="index">
        <strong v-if="property == propertyName">
            <span v-for="(propertyError, index) in propertyErrors" :key="index">{{
            propertyError
            }} </span>
        </strong>
    </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        errors: Object,
        propertyNames: Array
    }
};
</script>
<style scoped>
</style>