<template>
	<transition name="slide">
   <div class="list">
		 <header>
			 <section class="top-title">
  			 <a href="javascript:;" class="back" @click="back()">
					 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUxpcf///////////////////////////////////////////////////////////////0xpcf///////////////+Nhri4AAAAVdFJOUwDnwEciCdr78hQvzTpWp21hAH6Vi4PgU5gAAAD2SURBVEgNrZbJEoMgEETbBRCXaJnw/7+aMTJWDjl0W/Hs8/UIzAD8+dnl772KijyLijySiIRHsUcJdhIKEtrDoVhCa3VISK4O3pKnU1HKSpafYyXSRhJ9rHWkhSbc0bFEU4mBJcaLmEnHOLiDJWYnmpF0dLeJ1PSkY6nLUaJOZNKx1V9VJpZYZWL3OtpApsLukpaNBejBgM2j0eV/MZHPpi8l0Hk2evmNkbcloG9+QD9ixsgHGegvhm0XxlyN7w7Dtj5Ab7DGeBtPbBs3xodFYk8P4ENMG3znhuMt5vkMZMXijGKxdw+PiEC/kAD6tQfQL1e/K3kDD2Ub0EJ8V6YAAAAASUVORK5CYII=" alt="">
				 </a>
  			 <h1 class="title">频道管理</h1>
  		 </section>
		 </header>
		 <div class="content">
		 	<p class="type-title type-title-1">
				"我的频道"
				<span>（拖动排序）</span>
			</p>
		 </div>
   </div>
 </transition>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {
       this.$router.back()
     	},
		}
	}
</script>

<style lang="scss" scoped="">
	@import "@/assets/styles/common.scss";
	.slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
	}
	.slide-enter, .slide-leave-to{
	  transform: translate3d(100%, 0, 0);
	}
	.list{
		position: fixed;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 10000;
		margin-top:-37px;
		header {
			position: fixed;
			top: 0;
			z-index: 2;
			width: px2rem(375px);
			.top-title {
				position: relative;
		    width: 100%;
		    height: px2rem(44px);
		    background-color: #d43d3d;
		    color: #fff;
				.back {
					position: absolute;
			    left: 0;
			    top: 0;
			    width: px2rem(50px);
			    height: px2rem(44px);
					img {
						width: px2rem(20px);
				    height: px2rem(20px);
				    margin-left: px2rem(15px);
				    margin-top: px2rem(12px);
				    -webkit-transform: scale(1);
				    transform: scale(1);
					}
				}
				.title {
					position: relative;
			    display: block;
			    width: px2rem(150px);
			    margin: 0 auto;
			    text-align: center;
			    height: 100%;
			    line-height: px2rem(44px);
			    font-weight: 700;
			    font-size: px2rem(22px);
			    color: #fff;
				}
			}
		}
	}
</style>
