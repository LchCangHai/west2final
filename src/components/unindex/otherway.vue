// 手机号登陆
<template>
  <div id="container02">
    <div class="Ticon">
      <div id="backIcon" class="iconBtn" @click="toBack()"><Icon type="ios-arrow-back" /></div>
      <div id="closeIcon" class="iconBtn" @click="closePop01()"><Icon type="md-close" /></div>
    </div>
    <div id="title">短信验证登录</div>
    <div class="hrr"></div>
    <div id="content">
      <Form ref="formValidata01" :model="formdata01" :rules="formrules" :label-width="80" inline v-show="!steptwo">
        <FormItem label="手机号" prop="tel">
          <Input  placeholder="手机号" v-model="formdata01.tel"></Input>
        </FormItem>
      </Form>
      <Form ref="formValidata02" :model="formdata01" :rules="formrules" :label-width="80" inline v-show="steptwo">
        <FormItem label="验证码" prop="code">
          <Input placeholder="验证码" v-model="formdata01.code"></Input>
        </FormItem>
      </Form>
      <Button class="loginBtn"
                type="primary"
                v-show="!steptwo"
                @click="sendCode('formValidata01')">发送验证码</Button>
      <Button class="loginBtn"
                type="primary"
                v-show="steptwo" @click="login('formValidata02')">立即登录</Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/

export default {
  name: 'otherway.vue',
  components: {
  },
  data () {
    return {
      tel: '',
      code: '',
      steptwo: false,
      tip2: '',
      formdata01: {
        tel: '',
        code: ''
      },
      formrules: {
        tel: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { type: 'string', pattern: reg, message: '请输入正确的手机号', trigger: 'change' }
        ],
        code: [
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
    toBack () {
      if (this.steptwo === false) {
        this.changePopType01(1)
      } else {
        this.steptwo = false
      }
    },
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Loading.start()
          this.$axios.post('/api/auth/login', {
            method: 1,
            tel: this.formdata01.tel,
            code: this.formdata01.code
          }, {
            header: {
              'Content-Type': 'application/json' // 如果写成contentType会报错
            }
          }).then(res => {
            this.$Loading.finish()
            this.$Message.success('登录成功')
            this.setisSignup(true)
            this.setcurrentUser(res.data.data.user_info)
            window.localStorage.setItem('access_token', res.data.data.access_token)
            // this.$router.push('/index')
          }).catch(error => {
            this.$Loading.error()
            this.$Message.error('出错了，登录失败')
            console.log(error)
          }).finally(() => {
            this.formdata01.tel = ''
            this.formdata01.code = ''
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    sendCode (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Loading.start()
          this.$axios('/api/auth/check/telephone', {
            params: {
              tel: this.formdata01.tel
            }
          }).then(res => {
            if (res.data.status === 0) {
              this.$Loading.error()
              this.$Notice.error({
                title: '手机号未注册'
              })
            } else if (res.data.status === 1) {
              this.$Message.success('手机号验证通过')
              this.$axios.post('/shmclass', null, {
                params: {
                  type: 1,
                  tel: this.formdata01.tel
                },
                baseURL: '/too'
              }).then(res => {
                this.$Loading.finish()
                this.$Notice.success({
                  title: '发送短信中。。5分钟内有效'
                })
                this.steptwo = true
              }).catch(error => {
                console.log(error)
                this.$Loading.error()
                this.$Notice.error({
                  title: '发送短信失败'
                })
              })
            }
          }).catch(error => {
            this.$Loading.error()
            this.$message.error('发送验证码失败')
            console.log(error)
          })
        } else {
          this.$Message.error('Fail!')
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
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .Ticon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;
    margin: 0;
    padding: 0;
  }
  .iconBtn {
    position: relative;
    cursor: pointer;
    width: 30px;
    height: 30px;
    i {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
  }
  .iconBtn:hover {
    background-color: #108ee9;
    color: white;
  }

  .iconBtn:active {
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
      margin-top: 10px;
      border-radius: 50px;
      width: 75%;
    }
    .tip1, .tip2 {
      width: 75%;
      margin: 3px 0;
      color: red;
    }
  }
</style>
