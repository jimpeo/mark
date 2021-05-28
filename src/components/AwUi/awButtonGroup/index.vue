<template>
  <div class="aw_button_group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'awButtonGroup'
};
</script>
<style lang="scss" scoped>
.aw_button_group {
  .aw_button_button + .aw_button_button {
    margin-left: 0;
  }

  & + .aw_button_group {
    margin-left: 10px;
  }
}
</style>