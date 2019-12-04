<template>
  <footer id="footer">
    {{text}} <a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备18137070号</a>
    <div class="back-to-top" id="back-to-top">
      <i class="fa fa-arrow-up"></i>
    </div>
  </footer>
</template>

<script>
export default {
  name: "blog-footer",
  props: {
    text: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#footer {
    padding: 10px 0;
    color: #999;
    float: left;
    width: 100%;
    line-height: 1.6em;
    font-size: 0.85em;
    text-align: center;
    a{
      text-decoration: none;
      color: #999;
      margin-left: 5px;
    }
}
.back-to-top {
    font-size: 24px;
    color: #444;
    position: fixed;
    bottom: 20px;
    right: 25px;
    display: none;
}
</style>

