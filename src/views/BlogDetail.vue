<template>
  <div>
    <blog-header title="IT姑凉"/>
    <div class="blog-detail">
      <h1>{{blog.title}}</h1>
      <div class="grey">
        <span><i class="far fa-calendar-alt"></i>{{blog.time | formatData}}</span>
        <span @click="editBlog()"><i class="far fa-edit"></i>编辑</span>
      </div>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import utils from "../utils.js";
import BlogHeader from "@/components/BlogHeader.vue";

let that;
export default {
  components: { BlogHeader },
  data() {
    that = this;
    return {
      blog: {}
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      axios
        .get("/api/blog/detail?blogId=" + this.$route.params.blogId)
        .then(function(response) {
          console.log("blog-detail");
          console.log(response.data);
          that.blog = response.data;
        })
        .catch(function(response) {
          console.log("err:" + response);
        });
    },
    editBlog: function() {
      this.$router.push({
        name: "EditBlog",
        params: {
          blogId: this.$route.params.blogId
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.blog-detail {
  width: 70%;
  margin: 30px auto;
  h1 {
    text-decoration: none;
    font-size: 30px;
    font-weight: bold;
    line-height: 1.1em;
    -webkit-transition: color 0.2s;
    -moz-transition: color 0.2s;
    -ms-transition: color 0.2s;
    transition: color 0.2s;
    margin: 0 0 10px 0;
    color: #555;
    text-align: left;
    font: bold 25px/1.1 ff-tisa-web-pro, Cambria, "Times New Roman", Georgia,
      Times, sans-serif;
  }
  .markdown-body {
    padding: 0;
    overflow-y: auto;
    margin-top: 20px;
  }
}
.fa-edit {
  margin-left: 20px;
}
.grey{
  color: #999;
}
</style>
