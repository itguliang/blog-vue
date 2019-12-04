<template>
  <header id="header">
      <a href="/" id="logo">
        <img src="../assets/logo.png" alt="IT姑凉">
        <span>{{ title }}</span>
      </a>
  </header>
</template>

<script>
export default {
  name: "blog-header",
  props: {
    title: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#header {
    height: 70px;
    -webkit-box-shadow: 0 0 1px rgba(0,0,0,0.15);
    box-shadow: 0 0 1px rgba(0,0,0,0.15);
}
#logo {
    font-size: 20px;
    letter-spacing: 2px;
    color: #313131;
    height: 70px;
    line-height: 70px;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    text-decoration: none;
    font-weight: 300;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
    padding:0 5%;
    cursor: pointer;
    img{
      height: 52px;
      width: 52px;
      outline: 0;
      margin: 0 20px 0 0;
      border-radius: 50%;
    }
}
</style>