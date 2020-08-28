<template>
<div id="container">
  <div id="Nav">
    <my-nav></my-nav>
  </div>
  <div class="body01">
    <div class="text01">
      <span>Fire in the heart</span>
      <br>
      <span>light in the eyes</span>
    </div>
    <div class="bodtBtn">
      <Button ghost class="loginBtn" @click="openPop01()">登录</Button>
    </div>
  </div>
<!--  遮罩-->
  <div id="cover" v-show="showPop01"></div>
  <div class="login" v-show="showPop01">
    <my-login v-show="popType01 === 1 "></my-login>
    <my-sign-up v-show="popType01 === 2 "></my-sign-up>
    <my-retrieve v-show="popType01 === 3 "></my-retrieve>
    <my-other-way v-show="popType01 === 4 "></my-other-way>
  </div>
</div>
</template>

<script>
import login from '../../components/unindex/login.vue'
import otherway from '../../components/unindex/otherway.vue'
import retrieve from '../../components/unindex/retrieve.vue'
import signUp from '../../components/unindex/signUp.vue'

import { mapMutations, mapState } from 'vuex'

import nav from '../../components/navs/u_nav1.vue'

export default {
  name: 'index_u.vue',
  components: {
    'my-nav': nav,
    'my-login': login,
    'my-other-way': otherway,
    'my-retrieve': retrieve,
    'my-sign-up': signUp
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'showPop01',
      'popType01'
    ])
  },
  methods: {
    ...mapMutations([
      'openPop01',
      'closePop01',
      'changePopType01'
    ]),
    openLogin () {
    }
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
    background-color: transparent;
    background: url("../../assets/bc02.jpg");
    background-size: cover;
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
    /*border-bottom: 1px solid lightgrey;*/
    /*box-shadow: 1px 0px 10px 1px rgba(213,213,213,0.6);*/
    background-color: transparent;
    z-index: 20;
  }

  .body01 {
    height: calc(100% - 70px);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    .text01 {
      font-size: 40px;
      font-family: "Sitka Small";
      width: 500px;
      span:last-child {
        position: relative;
        left: 50px;
      }
    }
    .loginBtn {
      border: 1.5px solid white;
      border-radius: 50px;
      width: 110px;
      height: 35px;
      font-size: 16px;
      color: white;
    }
  }

  #cover{
    /*display: none;*/
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(240,240,240,0.2);
    z-index: 2000;
  }

  .login{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 300px;
    z-index: 2001;
    box-shadow: 2px 2px 10px 5px rgba(0,0,0,0.1);
    border-radius: 4px;
  }
</style>
