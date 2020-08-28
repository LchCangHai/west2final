// 找回密码
<template>
  <div id="container02">
    <div class="Ticon">
      <div id="backIcon" class="iconBtn" @click="toBack()"><Icon type="ios-arrow-back" /></div>
      <div id="closeIcon" class="iconBtn" @click="closePop01()"><Icon type="md-close" /></div>
    </div>
    <div id="title">找回密码</div>
    <div class="hrr"></div>
    <div id="content">
      <Form ref="formValidata01" :model="formdata01" :rules="formrules" :label-width="80" inline v-show="!stepThree">
        <FormItem label="手机号" prop="telephone">
          <Input  placeholder="手机号" v-model="formdata01.telephone"></Input>
        </FormItem>
        <FormItem label="新密码" prop="password">
          <Input  placeholder="新密码" v-model="formdata01.password"></Input>
        </FormItem>
      </Form>
      <Form ref="formValidata02" :model="formdata01" :rules="formrules" :label-width="80" inline v-show="stepThree">
        <FormItem label="验证码" prop="code">
          <Input  placeholder="验证码" v-model="formdata01.code"></Input>
        </FormItem>
      </Form>
      <Button class="loginBtn"
                type="primary"
                v-show="!stepThree"
                @click="sendCode('formValidata01')">发送验证码</Button>
      <Button class="loginBtn"
                type="primary"
                v-show="stepThree"
                @click="modify('formValidata02')">立即修改</Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/

export default {
  name: 'retrieve.vue',
  components: {
  },
  data () {
    return {
      telphone: '',
      code: '',
      password: '',
      password1: '',
      stepThree: false,
      tip1: '',
      tip2: '',
      formdata01: {
        nickname: '',
        password: '',
        password1: '',
        telephone: '',
        code: ''
      },
      formrules: {
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'string', pattern: reg, message: '请输入正确的手机号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
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
    toBack () {
      if (this.stepThree === false) {
        this.changePopType01(1)
      } else {
        this.stepThree = false
      }
    },
    sendCode (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Loading.start()
          // 验证手机号
          this.$axios('/api/auth/check/telephone', {
            params: {
              tel: this.formdata01.telephone
            }
          }).then(res => {
            if (res.data.status === 0) {
              console.log('手机号可用')
              this.$axios.post('/shmclass', null, {
                params: {
                  type: 3,
                  tel: this.formdata01.telephone
                },
                baseURL: '/too'
              }).then(res => {
                console.log(res)
                this.$Loading.finish()
                this.stepThree = true
                this.$Notice.success({
                  title: '发送短信中。。5分钟内有效'
                })
              }).catch(error => {
                console.log(error)
                this.$Loading.error()
                this.$Notice.error({
                  title: '发送短信失败'
                })
              })
            } else if (res.data.status === 1) {
              this.$Loading.error()
              this.$Notice.error({
                title: '该手机号已注册'
              })
            }
          }).catch(error => {
            this.$Loading.error()
            this.$Notice.error({
              title: '验证手机号出错'
            })
            console.log(error)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    modify (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Loading.start()
          this.$axios.put('/api/user/current', {
            password: this.formdata01.password,
            code_changePassword: this.formdata01.code
          }, {
            header: {
              'Content-Type': 'application/json' // 如果写成contentType会报错
            }
          }).then(res => {
            this.$Loading.finish()
            this.$Notice.success({
              title: '修改密码成功！'
            })
            this.stepThree = false
            window.localStorage.setItem('access_token', null)
          }).catch(error => {
            this.$Loading.error()
            console.log(error)
          }).finally(() => {
            this.formdata01.telphone = ''
            this.formdata01.password = ''
            this.formdata01.password1 = ''
            this.formdata01.code = ''
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
    min-height: 280px;
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
      margin: 10px 0;
      border-radius: 50px;
      width: 75%;
    }
  }
  .tip1, .tip2 {
    width: 75%;
    margin: 3px 0;
    color: red;
  }
</style>
