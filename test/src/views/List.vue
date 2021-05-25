<template>
  <div class="List">
    <ul>
      <li v-for="it in list" @click="toDetail(it.path)" :key="it.title">
        <img :src="it.image" alt="" />
        <div class="content">
          <h5>{{ it.title }}</h5>
          <small>{{ it.passtime }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import services from '@/services';
  export default {
    name: "List",
    componentName: "List",
    props: {},
    components: {},
    data() {
      return {
        page: {
          page: 1,
          count: 25,
        },
        list: []
      }
    },
    computed: {},
    created() {
      setTimeout(() => {
        this.init();
      }, 5000)
    },
    methods: {
      async init() {
        const [err, result] = await this.$tools.to(services.newsList(this.page));
        if(err) return false;
        this.list = result.result;
        // 手动去除骨架元素
        const skeleton = document.querySelector('#skeleton');
        if(skeleton) skeleton.parentNode.removeChild(skeleton);
      },
      toDetail(path) {
        this.$router.push({name: 'Detail', query: {path}});
      }
    },
    watch: {},
  }
</script>

<style lang="scss" scoped>
  .List {
    li {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #eee;
      img {
        width: 100px;
      }
      .content {
        text-align: left;
        padding-left: 10px;
      }
    }
  }
</style>
