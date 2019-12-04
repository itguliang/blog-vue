<template>
  <div class="edit-blog">
    <div class="title">
      <input type="text" v-model="blog.title" placeholder="请输入标题……">
      <button class="btn-save" @click="save">保存</button>
    </div>
    <mavon-editor 
      v-model="blog.desc" 
      ref="md" 
      @change="change" 
      class="editor"
    />
    </div>
</template>

<script>
import axios from "axios";
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

let that;
export default {
  name: "editBlog",
  components: {
    mavonEditor,
  },
  data() {
    that = this;
    return {
      blog: {
        title: "",
        content: "",
        desc: "",
      }
    };
  },
  mounted() {
    if(this.$route.params.blogId){
        this.fetchData();
    }
  },
  methods: {
    fetchData: function() {
      axios
        .get("/api/blog/detail?blogId=" + this.$route.params.blogId)
        .then(function(response) {
          that.blog = response.data;
        })
        .catch(function(response) {
          console.log("err:" + response);
        });
    },
    save: function() {
      console.log("保存数据");
      console.log(this.blog);
      let url="/api/blog/create";
      if(this.$route.params.blogId){
        url="/api/blog/update";
      }
      axios
        .post(url, this.blog)
        .then(function(response) {
          that.$router.push({
            name: "Home"
          });
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    // 所有操作都会被解析重新渲染
    change(value, render){
      // render 为 markdown 解析后的结果[html]
      this.blog.content = render;
    },
  }
};
</script>
<style scoped lang="scss">
.edit-blog {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  .title {
    height: 40px;
    margin: 0;
    padding: 20px;
    border-bottom: 10px solid #f1f1f1;
    input {
      -webkit-appearance: none;
      outline: none;
      border: none;
      height: 38px;
      line-height: 38px;
      width: 90%;
      font-size: 30px;
      color:#555;
    }
  }
  .editor{
    position: absolute;
    bottom: 0;
    top: 90px;
    width: 100%;
  }
  .btn-save {
    background: #258fb8;
    float: right;
    margin: 5px 0 0 0;
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
}

</style>
