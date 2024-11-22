<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style>
	p{
	  font-size: 16px;
	  margin: 0;
	  padding: 0;
	}
	.global-display{
	  display: flex;
	}
	.global-f-wrap{
	  flex-wrap: wrap;
	}
	.global-f-direction{
	  flex-direction: column;
	}
	.global-j-content{
	  justify-content: space-between;
	}
	.global-j-end{
	  justify-content: end;
	}
	.global-a-items{
	  align-items: center;
	}
	.text-show{
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 1;
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
	}
	.fadeIn {
	  opacity: 0;
	  animation: fadeIn 0.3s ease forwards;
	}
	
	@keyframes fadeIn {
	  from {
	    opacity: 0;
	  }
	  to {
	    opacity: 1;
	  }
	}
	/* 骨架屏 */
	.skeleton-view{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 999;
		overflow: hidden;
		padding: 10px;
	}
	.skeleton-global{
		background-color: #f2f3f5; /* 修改为你需要的背景色 */
		position: relative;
		overflow: hidden;
		border-radius: 8px;
	}
	.skeleton-global::before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(to right, transparent 0%, #e6e6e6 50%, transparent 100%);
		animation: loading 1s infinite;
	}
	@keyframes loading {
		from {
		left: -100%;
		}
		to {
		left: 100%;
		}
	}
</style>