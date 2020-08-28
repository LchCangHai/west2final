// 注册
<template>
  <div id="container02">
    <div class="Ticon">
      <div id="backIcon" class="iconBtn" @click="toBack()"><Icon type="ios-arrow-back" /></div>
      <div id="closeIcon" class="iconBtn" @click="closePop01()"><Icon type="md-close" /></div>
    </div>
    <div id="title">注册</div>
    <div class="hrr"></div>
    <div id="content">
      <Form ref="formValidata01" :model="formdata01" :rules="formrules" :label-width="80" inline v-show="!stepOned">
        <FormItem label="昵称" prop="nickname">
          <Input  placeholder="昵称" v-model="formdata01.nickname"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input  placeholder="密码" v-model="formdata01.password"></Input>
        </FormItem>
        <FormItem label="手机号" prop="telephone">
          <Input  placeholder="手机号" v-model="formdata01.telephone"></Input>
        </FormItem>
      </Form>
      <Form ref="formValidata01" :model="formdata01" :rules="formrules" :label-width="80" inline v-show="stepOned">
        <FormItem label="验证码" prop="code">
          <Input  placeholder="验证码" v-model="formdata01.code"></Input>
        </FormItem>
      </Form>
      <Button class="loginBtn" type="primary" @click="signUp01()" v-show="!stepOned">发送短信</Button>
      <Button class="loginBtn" type="primary" @click="signUp02()" v-show="stepOned">立即注册</Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/

export default {
  name: 'signUp.vue',
  components: {
  },
  data () {
    return {
      stepOned: false,
      password1: '',
      tip2: '',
      tip1: '',
      nickname: '',
      telephone: '',
      password: '',
      code: '',
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
      if (this.stepOned === false) {
        this.changePopType01(1)
      } else {
        this.stepOned = false
      }
    },
    signUp01 () {
      this.$Loading.start()
      // 验证用户名是否已注册
      this.$axios('/api/auth/check/nickname', {
        params: {
          nickname: this.formdata01.nickname
        }
      }).then(res => {
        if (res.data.status === 0) {
          console.log('昵称可用')
          // 验证手机号是否已注册
          this.$axios('/api/auth/check/telephone', {
            params: {
              tel: this.formdata01.telephone
            }
          }).then(res => {
            if (res.data.status === 0) {
              console.log('手机号可用')
              // 发送验证码
              this.$axios.post('/shmclass', null, {
                params: {
                  type: 0,
                  tel: this.formdata01.telephone
                },
                baseURL: '/too'
              }).then(res => {
                console.log(res)
                this.$Notice.success({
                  title: '发送短信中。。5分钟内有效'
                })
                this.stepOned = true
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
        } else if (res.data.status === 1) {
          this.$Loading.error()
          this.$Notice.error({
            title: '该昵称已被占用'
          })
        }
      }).catch(error => {
        this.$Loading.error()
        this.$Notice.error({
          title: '验证昵称出错'
        })
        console.log(error)
      })
    },
    signUp02 () {
      this.$Loading.start()
      this.$axios.post('/api/user/current', {
        nickname: this.formdata01.nickname,
        telephone: this.formdata01.telephone,
        password: this.formdata01.password,
        code: this.formdata01.code
      }, {
        header: {
          'Content-Type': 'application/json' // 如果写成contentType会报错
        }
      }).then(res => {
        this.$Loading.finish()
        this.$Notice.success({
          title: '注册成功'
        })
      }).catch(error => {
        this.$Loading.error()
        this.$Notice.error({
          title: '注册失败'
        })
        console.log(error)
      }).finally(() => {
        this.formdata01.nickname = ''
        this.formdata01.telephone = ''
        this.formdata01.password = ''
        this.formdata01.code = ''
        this.stepOned = false
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
    height: 100%;
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
      margin-top: 8px;
      width: 75%;
      height: 30px;
    }
    .loginBtn {
      margin: 12px 0;
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
