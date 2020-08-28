<template>
  <div id="nav">
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 's_nav2.vue',
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
  #nav {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: black;
  }
</style>
