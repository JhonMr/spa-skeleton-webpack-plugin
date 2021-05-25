<template>
  <div class="Detail" v-html="html">

  </div>
</template>

<script>
  import services from '@/services';
export default {
  name: 'Detail',
  components: {
  },
  data() {
    return {
      html: '',
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const path = this.$route.query.path;
      const [err, result] = await this.$tools.to(services.newsDetail(path));
      if (err) return false;
      this.html = result;
    }
  }
}
</script>
