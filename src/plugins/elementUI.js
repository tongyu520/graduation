import Vue from 'vue'
import{
	Form,
	FormItem,
	Input,
    Button,
	Message,
	Dialog,
	Select,
	Option,
	Table,
	TableColumn,
	Tag,
	Pagination
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Pagination)

//避免页面刷新弹出一条空的消息提示
Vue.component(Message.name,Message)
Vue.prototype.$message=Message