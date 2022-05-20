<template>
  <div class="list-layout-wrapper">
    <div class="conditions">
      <slot name="header" />
    </div>
    <div class="list-box">
      <slot name="content" />
    </div>
    <div class="list-box">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.list-layout-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}
.conditions {
  width: 100%;
  margin-bottom: 20px;
}
.list-box {
  width: 100%;
}

</style>
