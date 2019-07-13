<template>
  <div
    class="bg"
    :style="{ 'background-color': color }"
  >
  </div>
</template>



<script>
export default {
  name: 'background-color',
  props: ['color'],
}
</script>


<style scoped>
.bg {
  display: flex;
  height: 100%;
  min-height: 100%;
}

</style>
