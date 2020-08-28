// 账号密码登录
<template>
  <div id="container02">
    <div id="closeC" @click="closePop01()"><Icon type="md-close" /></div>
    <div id="title">登录</div>
    <div class="hrr"></div>
    <div id="content">
      <Form ref="formValidata" :model="formdata01" :rules="formrules" :label-width="80" inline>
        <FormItem label="昵称" prop="account">
          <Input  placeholder="昵称" v-model="formdata01.account"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" placeholder="密码" v-model="formdata01.password"></Input>
        </FormItem>
      </Form>
      <Button class="loginBtn" type="primary" @click="login('formValidata')">立即登录</Button>

      <div id="tips">
        <span @click="changePopType01(3)">忘记密码</span>
        <span @click="changePopType01(4)">短信验证码登录</span>
      </div>
    </div>
    <div id="foot">——————— <span @click="changePopType01(2)">立即注册</span> ———————</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'login.vue',
  components: {
  },
  data () {
    return {
      account: '',
      password: '',
      formdata01: {
        account: '',
        password: ''
      },
      formrules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState([
      'showPop01',
      'popType01',
      'currentUser',
      'isSignup'
    ])
  },
  methods: {
    ...mapMutations([
      'openPop01',
      'closePop01',
      'changePopType01',
      'setcurrentUser',
      'setisSignup'
    ]),
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 初步验证过
          this.$axios('/api/auth/check/nickname', { // 验证是否存在账户
            params: {
              nickname: this.formdata01.account
            }
          }).then(res => {
            if (res.data.status === 0) {
              this.$Notice.error({
                title: '该账号不存在'
              })
            } else if (res.data.status === 1) {
              this.$Loading.start()
              this.$axios.post('/api/auth/login', {
                method: 0,
                username: this.formdata01.account,
                password: this.formdata01.password
              }, {
                header: {
                  'Content-Type': 'application/json' // 如果写成contentType会报错
                }
              }).then(res => {
                this.$Loading.finish()
                this.setisSignup(true)
                this.setcurrentUser(res.data.data.user_info)
                window.localStorage.setItem('access_token', res.data.data.access_token)
                this.$router.push('/index')
              }).catch(error => {
                this.$Notice.error({
                  title: '登录失败，请检查网络，密码'
                })
                this.account = ''
                this.password = ''
                console.log(error)
              }).finally(() => {
                this.account = ''
                this.password = ''
              })
            }
          }).catch(error => {
            this.$Notice.warning({
              title: '登录过程出现问题，请再次尝试'
            })
            console.log(error)
          })
        } else {
          console.log('出问题啦')
        }
      })
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less">
  #container02 {
    width: 100%;
    min-height: 295px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  #closeC {
    position: relative;
    cursor: pointer;
    width: 30px;
    height: 30px;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    i {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
  }

  #closeC:hover {
    background-color: #108ee9;
    color: white;
  }

  #closeC:active {
    background-color: #49a9ee;
  }

  #title{
    color: black;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }

  .hrr {
    height: 0;
    width: 90%;
    border-bottom: 1px solid #d6d6d6;
    margin: 10px 0;
  }

  #content{
    width: 100%;
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .loginIn{
      margin-top: 20px;
      width: 75%;
      height: 30px;
    }
    .loginBtn {
      /*margin-top: 20px;*/
      border-radius: 50px;
      width: 75%;
    }
    #tips{
      font-size: 10px;
      width: 75%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 5px 2px;
      >span {
        cursor: pointer;
        color: gray;
      }
      >span:hover {
        color: black;
      }
      >span:active {
        text-decoration: underline;
      }
    }
  }

  #foot {
    font-size: 12px;
    margin: 10px 0;
    >span {
      cursor: pointer;
      color: gray;
    }
    >span:hover {
      color:black;
    }
    >span:active {
      text-decoration: underline;
    }
  }
</style>
