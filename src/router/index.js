import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/page/home/Home'
// import List from '@/page/list/List'




Vue.use(Router)


const Home = resolve => {
  import('@/page/home/Home').then(module => {
    resolve(module)
  })
}

const List = resolve => {
  import('@/page/list/List').then(module => {
    resolve(module)
  })
}

export default new Router({
	routes: [
		{
		path: '/',
		  redirect: '/home/看点'
		},
		{
			path: '/home/:id',
			name: 'Home',
			component: Home,
			meta:{keepAlive:true}
		},
		{
			path: '/list',
			name: 'List',
			component: List
		}
	]
})
