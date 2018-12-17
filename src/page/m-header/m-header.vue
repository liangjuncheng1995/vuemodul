<template>
	<header>
		<section class="top-menu">
			<div id="J_top_menu" class="top-menu-list" >
				<!-- <a v-for="item in dataList" href="javascript:;">{{item}}</a> -->
				<!-- :to="'/home/'+index"> -->
				<!-- :to="{path:'/home/'+item}" -->
				<!-- @click.native="getDescribe(item)" -->
				<router-link v-for="(item,index) of dataList" tag="a" class="tab-item"
										 :to="`/home/${item}`"
				>
		      {{item}}
		    </router-link>
			</div>
			<div class="menu-more">
				<div class="list-shadow">
				</div>
				<a href="https://toutiao.eastday.com/subscribe.html?v=161207" class="more-btn"></a>
			</div>
		</section>
	</header>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		methods: {
			getDescribe(id) {
				// console.log("点击")
				// console.log("头部组件的参数:" + id)
				// this.$router.push({
				//  path: `/home/${id}`,
			  // })
				// this.$router.push({
				// 	path: '/home',
				//   query: {id: id}
			 // })

			}
		},
		mounted() {
			// 顶部数据的请求
			this.$ajax({
				url: '/a/news.list',
				method: 'get'
			}).then(res => {
				this.dataList = res.list
			})
		}
	}
</script>

<style lang="scss" scoped="">
	@import "@/assets/styles/common.scss";
	header {
			position: fixed;
			z-index: 100;
			top: 0;
			width: px2rem(375px);
			max-width: 750px;
			height: 37px;
			.top-menu {
				position: relative;
		    height: 37px;
		    background-color: #f4f5f6;
				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 1px;
					background-image: -webkit-linear-gradient(top,transparent,transparent 40%,#ddd 0);
					background-size: 100% 1px;
					background-position: bottom;
					background-repeat: no-repeat;
				}

				.top-menu-list {
					overflow: hidden;
			    overflow-x: scroll;
			    margin-right: 40px;
			    white-space: nowrap;
			    -webkit-overflow-scrolling: touch;
					a {
						font-size: 17px;
				    line-height: 27px;
				    display: inline-block;
				    height: 26px;
				    margin: 5px 0 5px 5px;
				    padding: 0 10px;
				    -webkit-animation: fadeout .4s;
				    animation: fadeout .4s;
				    vertical-align: middle;
				    white-space: nowrap;
				    color: #505050;
					}
					.router-link-active{
						 color: #f85959;
					 }
				}
				.menu-more {
					position: absolute;
			    top: 0;
			    right: 0;
			    width: 40px;
			    background-color: #f4f5f6;
					.list-shadow {
						position: absolute;
				    left: -10px;
				    width: 10px;
				    height: 36px;
				    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABXAgMAAAB0Nf0bAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURQAAAAAAAAAAAINj6cAAAAADdFJOUwEIFV6wwAoAAACbSURBVCjPtZAxDsMgDEVtKexhoOdpBvYuIDVTpw6cJnMm5p6y+t+o5gANw9OTbcC2yF/O3XUxfwCRDORGJnAp9AxGuqYXAuVgFszPjvLSkaz0vSP5hmfzE14aHVRGonn60EG9NXcy1uZu8TrVjLv+jpT9V28+/rXe6DL6ROca0LmEiuk2ThRs6jGjb0PTtCXuRJRczW2t6+SXnC92Mzp31piZCgAAAABJRU5ErkJggg==) no-repeat 100%;
				    background-color: rgba(244,245,246,.3);
				    background-size: contain;
					}
					.more-btn {
						display: block;
				    width: 40px;
				    height: 36px;
				    background-size: 20px;
				    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8AgMAAABHkjHhAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURQAAAPhZWfhZWfhZWVw9SV4AAAADdFJOUwB9HHTmnyoAAAAxSURBVCjPY2CgDhBB49eO8unEFw0FgXowGQLk1/9HgL9Y+BD1/+HqR8NzIPgiVMp3AM6LOHXh3LGaAAAAAElFTkSuQmCC) no-repeat 50%;
				    background-size: 50%;
					}
				}
			}
	}
	.top-menu-list::-webkit-scrollbar{display: none}
</style>
