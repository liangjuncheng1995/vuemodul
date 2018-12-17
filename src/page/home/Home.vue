<template>
	<div>
		<div ref='mescroll' class="mescroll" id='mescroll' style="position:fixed;max-width: 750px;">
			<div>
				<div class="news-list-wrap" v-for="item in dataList">
					<template lang="html" v-if='item.images.length>=3'>
						<section class="news-item news-item-s2">
							<a class="J-news"
								:href="item.url" >
									<div class="news-wrap">
										<h3>{{item.title}}</h3>
										<div class="img-wrap " >
											<div class="img" v-for="itemImage in item.images.slice(0,3)">
												<!-- :style="{ backgroundImage: 'url(' + itemImage + ')'}" -->
												<img class="pic" :data-src='itemImage'
														 src='https://static.dzkandian.com/images/zhanwei.png'
														 style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"
												>
											</div>
										</div>
										<p class="tags clearfix">
											<em class="tag tag-src">{{item.source}}</em>
											<em class="tag tag-view">{{item.updateTime.substring(0,10)}}</em>
										</p>
									</div>
							</a>
						</section>
					</template>
					<template lang="html" v-else="">
						<section class="news-item news-item-s1">
							<a class="J-news"
								:href="item.url" >
									<div class="news-wrap">
										<div class="img-wrap " v-for="itemImage in item.images.slice(0,1)">
											<img class="pic" :data-src='itemImage' src='https://static.dzkandian.com/images/zhanwei.png'
													 style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"
											>
										</div>
										<div class="txt-wrap">
											<h3>{{item.title}}</h3>
											<p class="tags clearfix">
												<em class="tag tag-src">{{item.source}}</em>
												<em class="tag tag-view">{{item.updateTime.substring(0,10)}}</em>
											</p>
										</div>
								  </div>
							</a>
						</section>
					</template>

				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import MeScroll from 'mescroll.js'
	import 'mescroll.js/mescroll.min.css'
	export default {
  	name: 'Home',
		data() {
			return {
				type: '',
				name: '',
				dataList: [],
				itemImagelazy: []//懒加载存储图片数据
			}
		},
		mounted() {
			// let id = this.$route.query.id
			//首次进来的时候显示首页的路由
			this.loadingDialog("show");
			console.log(this.$route.params.id)
			let type = this.$route.params.id
			this.type = type
			console.log("首页进来的栏目:" + this.type)
			this.getDetailList(type)


			//首次进来获取滚动条的位置
			// this.handleScroll()
			//监听滚动条
			window.addEventListener('scroll', this.handleScroll)

			//下拉加载初始化
			let self = this
			self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
        down: {
          auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
          callback: self.downCallback, //下拉刷新的回调
        },
        // up: {
        //   auto: false, //初始化完毕,是否自动触发上拉加载的回调
        //   isBoth: false, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
        //   isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        //   callback: self.upCallback, //上拉加载的回调
        //   // toTop:{ //配置回到顶部按钮
        //   // 	src : "https://4g.dzkandian.com/html/a/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
        //   // 	//offset : 1000
        //   // }
        // }
      });



		},
		methods: {
			downCallback() { //下拉刷新的回调
        var that = this
        setTimeout(function () {
          console.log("下拉刷新开")
					let type = that.$route.params.id
					let beforeId = that.dataList[that.dataList.length - 1].id
					that.getDetailLists(beforeId,type)
        }, 500)
      },
			upCallback(page) {
				let type = this.$route.params.id
				let id = this.dataList[this.dataList.length - 1].id
				let that = this
				this.$ajax({
					url: '/a/news.html',
					params: {
						type,
						beforeId: id
					},
					method: 'get'
				}).then(res => {
					// that.dataList	= res.data
					that.dataList = that.dataList.concat(res.data)
	        //     that.mescroll.endSuccess(response.data.data.length);
					that.loadingDialog("hide");
					that.mescroll.endSuccess(); //无参
					// that.$nextTick(function(){  //页面加载完成后执行
          //   that.handleScroll()
          // })
				})


        // setTimeout(function () {
        //   that.$axios.get(url, {
        //     params: {
        //       type,
        //       beforeId
        //     }
        //   })
        //   .then(function (response) {
        //     // console.log("上拉加载后请求的数据:" + JSON.stringify(response.data.data) )
        //     console.log("上拉加载后请求的数据:" + response.data.data)
        //     that.listdata = that.listdata.concat(response.data.data)
        //     that.mescroll.endSuccess(response.data.data.length);
				//
        //     // that._checkMore(response.data.data)
        //   })
        // }, 0)
      },


			getDetailList(type) {
				let that = this;
				//数据请求 获取第一条的数据
				this.$ajax({
					url: '/a/news.html',
					params: {
						type
					},
					method: 'get'
				}).then(res => {
					that.getDetailLists(res.data[0].id,type)
					// console.log("获取的第一条数据:")
					// console.log(res.data[0].id)
				})
			},
			//获取前十条的数据
			getDetailLists(id,type) {
				let that = this
				this.$ajax({
					url: '/a/news.html',
					params: {
						type,
						beforeId: id
					},
					method: 'get'
				}).then(res => {
					that.dataList	= res.data
					that.loadingDialog("hide");
					that.mescroll.endSuccess(); //无参
					that.$nextTick(function(){  //页面加载完成后执行
            that.handleScroll()
          })
				})
			},
			handleScroll () {//首次进入,或切换数据的时候监听滚动条的位置
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				// console.log(scrollTop)
				let imgs = document.getElementsByClassName('pic');
				// console.log(imgs.length)
				let imagelazy = []
				for(let i=0;i<imgs.length;i++) {
					if(imgs[i].y < window.innerHeight + scrollTop) {
						let currentImage = imgs[i].getAttribute("data-src")
						imgs[i].style.backgroundImage="url("+currentImage+")";
					}
				}
			}
		},
		watch:{
      // 监听路由变化-用于非首次加载
      $route: function (newdata,olddata) {
				this.type = this.$route.params.id
				// console.log(this.type)
				this.loadingDialog("show");
				this.getDetailList(this.type)
      },
    }

	}
</script>

<style lang="scss" scoped="">
		@import "@/assets/styles/common.scss";
		//三图的样式

		.news-list-wrap {
			background-color: #fff;
			.news-item , .news-item-s2{
				height: auto;
				a {
					display: block;
			    padding: 10px 0;
			    margin: 0 15px;
			    border-bottom: 1px solid #f5f5f5;
			    color: #333;
					.news-wrap {
						position: relative;
    				min-height: 115px;
						h3 {
							font-size: 17px;
					    line-height: 1.2em;
					    overflow: hidden;
					    width: 100%;
					    max-height: 40px;
					    margin-bottom: 7px;
						}
						.img-wrap {
							display: -webkit-box;
					    display: -ms-flexbox;
					    display: flex;
					    display: -webkit-flex;
					    overflow: hidden;
					    height: px2rem(75px);
							.img	{
								width: 33.33%;
    						padding-right: 2px;
								img {
									width: 100%;

									background-color: rgba(150,150,150,.1);
							    // background-image: url(//mini.eastday.com/toutiaoh5/img/img_preview.png);
							    background-repeat: no-repeat;
							    background-position: center;
							    background-size: cover;
							    height: 100%;


								}
							}
						}
						.tags {
							margin-top: 7px;
							color: #999;
							overflow: hidden;
							font-size: 0;
							.tag {
								display: inline-block;
						    font-size: 10px;
						    line-height: 12px;
						    margin-right: 5px;
							}
							.tag-view {
								float: right;
								margin-right: 0px;
							}
						}
					}

				}
			}
			.news-item-s1 {
				a {
					.news-wrap {
						display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
				    display: -webkit-flex;
						min-height: 0;
						.txt-wrap {
							position: relative;
							width: 67%;
							h3 {
								font-size: 17px;
						    line-height: 1.2em;
						    overflow: hidden;
						    margin-right: 12px;
						    height: 40px;
								.tags {
									position: absolute;
    							bottom: 0;
								}
							}
							p {
								width: 100%;
								position: absolute;
								bottom: 0;
								.tag-view {
									float: right;
								}
							}
						}
						.img-wrap {
							overflow: hidden;
							width: 33%;
							height: px2rem(75px);
							margin-right: 10px;
							img {
								width: 100%;
								background-color: rgba(150,150,150,.1);
								// background-image: url(//mini.eastday.com/toutiaoh5/img/img_preview.png);
								background-repeat: no-repeat;
								background-position: center;
								background-size: cover;
								height: 100%;
							}
						}
					}
				}
			}

		}


</style>
