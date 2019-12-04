<template>
  <div>
    <blog-header title="IT姑凉"/>
    <div class="home">

      <div class="blog-list">
        <div v-for="item in blogs" :key="item.id" class="item"> 
          <span><i class="far fa-calendar-alt"></i>{{item.time | formatData}}</span>
          <router-link :to=" '/blog-detail/'+item._id ">{{item.title}}</router-link>
        </div>
        <pagination :currentPage="currentPage" :totalPage="totalPage" @prePage="prePage" @nextPage="nextPage" @jumpPage="jumpPage"/>
      </div>

      <aside>
        <div class="widget-wrap">
          <h3 class="widget-title">标签云</h3>
          <div class="widget tagcloud">
            <a href="/tags/Angular/" style="font-size: 10px;">Angular</a> <a href="/tags/CSS/" style="font-size: 10px;">CSS</a> <a href="/tags/Cordova/" style="font-size: 12.5px;">Cordova</a> <a href="/tags/Git/" style="font-size: 10px;">Git</a> <a href="/tags/H5/" style="font-size: 10px;">H5</a> <a href="/tags/Hexo/" style="font-size: 10px;">Hexo</a> <a href="/tags/Ionic/" style="font-size: 10px;">Ionic</a> <a href="/tags/Q-A/" style="font-size: 17.5px;">Q&amp;A</a> <a href="/tags/React/" style="font-size: 20px;">React</a> <a href="/tags/Redux/" style="font-size: 15px;">Redux</a> <a href="/tags/package/" style="font-size: 10px;">package</a>
          </div>
        </div>
        <div class="widget-wrap">
          <h3 class="widget-title">分类</h3>
          <div class="widget">
            <ul class="category-list">
              <li class="category-list-item"><a class="category-list-link" href="/categories/IT/">IT</a></li>
              <li class="category-list-item"><a class="category-list-link" href="/categories/Life/">Life</a></li></ul>
          </div>
        </div>
        <div class="widget-wrap">
          <h3 class="widget-title">友链</h3>
          <div class="widget">
            <ul class="entry">
                <li class="link"><a target="_blank" href="https://fuzhaohao.github.io" rel="external nofollow noopener noreferrer">Michael</a></li>
                <li class="link"><a target="_blank" href="http://www.linovo.me" rel="external nofollow noopener noreferrer">Linovo</a></li>
                <li class="link"><a target="_blank" href="http://mumusanke.com" rel="external nofollow noopener noreferrer">Sherryriver</a></li>
                <li class="link"><a target="_blank" href="https://musclejack.github.io" rel="external nofollow noopener noreferrer">Mz</a></li>
                <li class="link"><a target="_blank" href="http://jintang.github.io" rel="external nofollow noopener noreferrer">堂</a></li>
                <li class="link"><a target="_blank" href="https://www.lovemoqing.com" rel="external nofollow noopener noreferrer">默卿</a></li>
                <li class="link"><a target="_blank" href="http://www.xinke.org.cn" rel="external nofollow noopener noreferrer">ECode1024</a></li>
            </ul>
          </div>
        </div>
        <div class="widget-wrap">
          <h3 class="widget-title">公众号</h3>
          <div class="widget">
            <img style="width: 85%; margin:0 auto;display:block;" src="http://img.itguliang.com/qrcode-itguliang.png">
          </div>
        </div>
      </aside>
    </div>
    <blog-footer text="©2018 IT姑凉"/>
  </div>
</template>

<script>
import axios from "axios";
import utils from "../utils.js";
import BlogFooter from "@/components/BlogFooter.vue";
import Pagination from "@/components/Pagination.vue";
import BlogHeader from "@/components/BlogHeader.vue";
let that;
export default {
  name: "home",
  components: { BlogHeader,Pagination, BlogFooter },
  data() {
    that = this;
    return {
      blogs: [],
      pageSize: 15,
      currentPage: 1,
      totalPage: 0
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      axios
        .get(
          "/api/blog/pageList?page=" +
            that.currentPage +
            "&pageSize=" +
            that.pageSize
        )
        .then(function(response) {
          that.blogs = response.data.data;
          that.totalPage = Math.ceil(response.data.total / that.pageSize);
          console.log(response.data);
        })
        .catch(function(response) {
          console.log("err:" + response);
        });
    },
    prePage() {
      this.currentPage--;
      this.fetchData();
    },
    nextPage() {
      this.currentPage++;
      this.fetchData();
    },
    jumpPage(pageIndex) {
      if (pageIndex > this.totalPage) {
        pageIndex = this.totalPage;
      }
      if (!pageIndex || pageIndex < 1) {
        pageIndex = 1;
      }
      this.currentPage = pageIndex;
      this.fetchData();
    }
  }
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
  align-items: flex-start;
  width: 75%;
  margin: 0 auto;
}
.blog-list,
aside {
  display: inline-block;
}
.blog-list {
  display: inline-block;
  width: 75%;
  margin-top: 30px;
  .item {
    position: relative;
    padding: 0 0 0 100px;
    margin-top: 15px;
    span {
      color: #999;
      font-size: 14px;
      margin-right: 15px;
      position: absolute;
      left:0;
      top:2px;
      i {
        margin: 0 2px 0 0;
      }
    }
    a {
      text-decoration: none;
      font-weight: 400;
      color: #555;
      font-size: 15px;
      -webkit-transition: color 0.2s;
      -moz-transition: color 0.2s;
      -ms-transition: color 0.2s;
      transition: color 0.2s;
      &:hover {
        color: #258fb8;
      }
    }
  }
}
aside {
  width: 25%;
  margin-left: 5%;
}
.widget-wrap {
  margin: 15px 0;
}
.widget-title {
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #999;
  line-height: 1em;
  text-shadow: 0 1px #fff;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  margin: 0;
  font-size: 14px;
}
.widget {
  line-height: 1.6em;
  word-wrap: break-word;
  font-size: 0.9em;
  color: #777;
  padding: 15px 0;
  a {
    color: #258fb8;
    text-decoration: none;
  }
  .link {
    display: inline-block;
    margin-right: 15px;
  }
  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

.tagcloud a {
  margin-right: 5px;
  display: inline-block;
}
</style>
