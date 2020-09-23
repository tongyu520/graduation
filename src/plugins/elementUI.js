import Vue from 'vue'
import{
	Form,
	FormItem,
	Input,
    Button,
	Message,
	Dialog
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
//避免页面刷新弹出一条空的消息提示
Vue.component(Message.name,Message)
Vue.prototype.$message=Message