<!-- 
 分页组件
 currentPage  当前页
 totalPage    总页数
 -->
<template>
    <div class="page" v-show="show">
      <div class="pagelist">
        <span class="jump" v-show="!pageStart" @click="$emit('prePage')">< prev</span>
        <span class="jump" v-show="currentPage>5" @click="$emit('jumpPage','1')">1</span>
        <span class="ellipsis" v-show="efront">...</span>
        <span class="jump" v-for="num in indexs" :key="num" :class="{current:currentPage==num}"  @click="$emit('jumpPage',num)">{{num}}</span>
        <span class="ellipsis" v-show="ebehind">...</span>
        <span class="jump" v-show="currentPage<totalPage-4" @click="$emit('jumpPage',totalPage)">{{totalPage}}</span>
        <span class="jump" v-show="!pageEnd" @click="$emit('nextPage')">next ></span>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      changePage: ""
    };
  },
  props: ["currentPage", "totalPage"],
  computed: {
    show: function() {
      return this.totalPage && this.totalPage !== 1;
    },
    pageStart: function() {
      return this.currentPage === 1;
    },
    pageEnd: function() {
      return this.currentPage === this.totalPage;
    },
    efront: function() {
      if (this.totalPage <= 7) return false;
      return this.currentPage > 5;
    },
    ebehind: function() {
      if (this.totalPage <= 7) return false;
      var nowAy = this.indexs;
      return nowAy[nowAy.length - 1] !== this.totalPage;
    },
    indexs: function() {
      var left = 1;
      var right = this.totalPage;
      var ar = [];
      if (this.totalPage >= 7) {
        if (this.currentPage > 5 && this.currentPage < this.totalPage - 4) {
          left = Number(this.currentPage) - 3;
          right = Number(this.currentPage) + 3;
        } else {
          if (this.currentPage <= 5) {
            left = 1;
            right = 7;
          } else {
            right = this.totalPage;

            left = this.totalPage - 6;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.page {
  height: 40px;
  text-align: right;
  color: #888;
  margin: 20px auto 0;
}
.pagelist {
  height: 50px;
  line-height: 50px;
  span {
    font-size: 14px;
    user-select: none;
  }
  .jump {
    padding: 6px 15px;
    cursor: pointer;
    margin-left: 10px;
    &:not(.current):hover{
      color:white;
      background:grey;
    }
  }
  .current {
    cursor: default;
    color: #555;
    font-weight: bold;
  }
  .ellipsis {
    padding: 0px 8px;
  }
}
</style>