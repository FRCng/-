<template>
  <div>
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {};
  },
};
</script>

<style lang="" scoped></style>
