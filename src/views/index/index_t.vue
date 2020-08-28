<template>
<div id="container">
  <div id="Nav"></div>
</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'index_t.vue',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
    ])
  },
  methods: {
    ...mapMutations([
    ])
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less">
  #container {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
  }

  #Nav {
    position: relative;
    top: 0;
    left:0;
    width:100%;
    min-width: 1000px;
    height: 60px;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid lightgrey;
    box-shadow: 1px 0px 10px 1px rgba(213,213,213,0.6);
    background-color: white;
    z-index: 20;
  }
</style>
