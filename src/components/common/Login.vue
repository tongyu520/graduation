<template>
	<div class="login">
		<div class="login_box">
			<!--头像区域-->
			<div class="img">
				<img src="~assets/img/home.jpg" alt="" />
			</div>
			<!--表单区域-->
			<el-form :model='loginforms' label-width="0px" class='login-form'
				 :rules="loginrules1" ref='loginformref'>
				<el-form-item prop='username'>
					<el-input v-model='loginforms.username' prefix-icon='el-icon-user-solid'></el-input>
				</el-form-item>
				<el-form-item prop='password'>
					<el-input v-model='loginforms.password' prefix-icon='el-icon-s-goods' type='password'></el-input>
				</el-form-item>
				<el-form-item class='button'>
					<el-button type="primary" @click='login'>登录</el-button>
					<el-button type="info"  @click="dialogFormVisible = true">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 注册对话框 -->
		<el-dialog title="欢迎注册" :visible.sync="dialogFormVisible">
			<el-form :model="registerform" :rules="loginrules2" ref='registerformref'>
				<el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
					<el-input v-model="registerform.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
					<el-input v-model="registerform.password" autocomplete="off" type='password'></el-input>
				</el-form-item>
				<el-form-item label="确认密码" :label-width="formLabelWidth" prop='repassword'>
					<el-input v-model="registerform.repassword" autocomplete="off" type='password'></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="registerBtn">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data(){
			// 确认密码的校验
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.loginrules2.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return{
            // 登录表单的数据绑定对象
				loginforms:{
					username:'admin',
					password:'123456'
				},
					
            //	验证规则
				loginrules1:{
            //	必须与上面的属性名保持一致
					username:[
            			{ required: true, message: '请输入用户名', trigger: 'blur' },
            			{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         			],
          			password:[
           				{ required: true, message: '请输入密码', trigger: 'blur' },
            			{ min: 6, max: 12, message: '长度在 6到 12个字符', trigger: 'blur' }
         			]
				},
				loginrules2:{
            //	必须与上面的属性名保持一致
					username:[
            			{ required: true, message: '请输入用户名', trigger: 'blur' },
            			{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         			],
          			password:[
           				{ required: true, message: '请输入密码', trigger: 'blur' },
            			{ min: 6, max: 12, message: '长度在 6到 12个字符', trigger: 'blur' }
					],
					repassword:[
           				{ validator: validatePass2, trigger: 'blur' }
         			]	  
				},
			// 注册表单数据
				dialogFormVisible: false,
				registerform: {
					username: '',
					password: '',
					repassword: ''
				},
				formLabelWidth: '120px'
			}
		},
		methods:{
				login(){
					//调用表单的函数，进行验证
					this.$refs.loginformref.validate(valid=>{
						if(!valid) return;
						//调用axios的post方法返回一个promise
						this.$http.post('login',this.loginforms).then((res)=>{
							//数值解构的方法
							const {data:result}=res
							if(result.meta.status!==200) 
								return  this.$message.error('用户名及密码错误！')
								this.$message.success('登录成功')
			//1.将登录成功之后的token保存到客户端的sessionStorage中
			//  1.1项目中除了登录之外的其他api接口必须在登录之后才能访问,避免直接输入url来访问其他页面
			//	1.2token只应在当前网站打开期间生效,所以将它保存到sessionStorage中
			//2.通过router跳转到后台主页
			                //   window.sessionStorage.setItem('token',result.data.token)
			                    this.$router.push('/edu')
			                 
							 }
						)
					})
				},
			 	registerBtn(){
					this.$refs.registerformref.validate(valid=>{
						if(!valid) return
						this.$http.post('register',{username:this.registerform.username,password:this.registerform.password}).then((res)=>{
							if(res.data.message){
								this.$message.success('注册成功')
								// 关闭对话框
								this.dialogFormVisible = false
							}else{
								this.$message.error('用户名已经存在！')
							}
						})
						
					})
				 }
			 }
		
	}
</script>

<style lang="less" scoped>
	.login {
		background-color: #2b4b6b;
        height: 100vh;
        .login_box {
            width: 450px;
            height: 300px;
            background-color: #fff;
            border-radius: 3px;
            // 实现居中的另一种方式
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .img {
                position: absolute;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 87px;
                height: 87px;
                border: 1px solid #eee;
                border-radius: 50%;
                padding: 10px;
                box-shadow: 0 0 10px #ddd;
                background-color: #fff;
                img {
                    width: 110px;
                    height: 71px;
                    border-radius: 50%;
                    // 调整位置
                    position: relative;
                    right: 11px;
                    top: 7px;
                }
            }
            .login-form{
                position: absolute;
                bottom: 0;
                width:100%;
                padding:0 20px;
                box-sizing: border-box;
                .button{
                    display: flex;
                    justify-content: flex-end;
	            }
	        }
        }
    }
	
	
</style>