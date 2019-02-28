<template>
  <div class="legend">
    <ul>
      <li v-for="item in items">
        <div>
          <span style="color:#fff;margin: 5px;">{{item.group}}</span>
          <div style="display: inline-block"
               :style="{background:item.color,width: width,height: height}"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "showlegend",
    props: {
      items: Array,
      width: String,
      height: String
    }
  }
</script>

<style lang="less">
  @import "showlegend.less";
</style>

