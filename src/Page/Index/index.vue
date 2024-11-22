<template>
  <div>
    <div>
      <van-search v-model="keyWords" placeholder="请输入搜索关键词" @click="goSearch"/>
    </div>
    <div>
      <van-grid :column-num="5" :border="false">
        <van-grid-item v-for="(item,index) in grid" :key="index" :icon="item.icon" :text="item.text" />
      </van-grid>
    </div>
    <div>
      <tab-bar></tab-bar>
    </div>

    <!-- 推荐 -->
    <p class="recommend">推荐</p>
  <div class="Mainstream-view global-display global-a-items" v-if="recomm_data.length>0">
    <div class="Mainstream-left" @click="goDetail(recomm_data[active_index]._id)">
      <img
        class="Mainstream-left-image"
        :src="recomm_data[active_index].cover_image.url"
        alt=""
      />
      <div class="Mainstream-bottom">
        <p class="m-title text-show">{{recomm_data[active_index].tltle}}</p>
        <div class="global-display global-a-items">
          <img
            :src="recomm_data[active_index].author_data[0].avatarUrl"
          />
          <p class="m-name">{{recomm_data[active_index].author_data[0].nickname}}</p>
          <p class="m-name text-show dis-flex">我在&nbsp;{{recomm_data[active_index].address}}</p>
        </div>
      </div>
    </div>
    <div class="Mainstream-right global-display global-f-direction">
      <img v-for="(item,index) in recomm_data" :key="index"
        :src="item.cover_image.url"
        @click="change_img(index)"
      />
      
    </div>
  </div>
  <!-- 瀑布流 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    offset = "5"
  >
    <card :usertravels="usertravels"></card>
    
  </van-list>
    <div style="height:100px"></div>
  </div>
  
</template>

<script setup>
  import { ref,onMounted } from 'vue'
  import tabBar from '@/Page/Tabbar/tabbar.vue'
  import request from '@/API/request.js'
  const keyWords = ref('')
  // 九宫格的数据
  const grid = ref([])
  import category_nav from '@/Data/Index/grid_arr.js'

  // 推荐的数据
  import recomm from '@/Data/Index/recommend_travel.js'
  const recomm_data = ref([])
  const active_index = ref(0)
  onMounted(async ()=>{
    // const result = await request.get1('/user_travels',{
    //   page:1,
    //   keywords:'001'
    // })
    // console.log(result,11)
    grid.value = category_nav
    recomm_data.value = recomm
    usertravels.value = pb1

  })

  // 切换图片
  const change_img = (value)=>{
    active_index.value = value
  }


  const goDetail =(id)=>{
    router.push({path:'/detail',query:{_id:id}})
  }

  // 瀑布流的数据
  import card from '@/Page/Card/card.vue'
  import pb1 from '@/Data/Index/user_travels.js'
  import pb2 from '@/Data/Index/user_travels02.js'
  import router from '@/router/index.js'
  const list = ref([])
  const loading = ref(false)
  const finished = ref(false)
  const usertravels= ref([])
   const onLoad = () => {
      loading.value = true
      console.log(123)
      // usertravels.value = [...usertravels.value,pb2]
      loading.value = false;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   list.value.push(list.value.length + 1);
        // }
        usertravels.value = [...usertravels.value,...pb2]


        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (usertravels.value.length >= 18) {
          finished.value = true;
        }
      }, 1000);
    };

    // 点击去搜索页面
    const goSearch = ()=>{
      // console.log(1234)
      // router.push('/search')
      router.push('/search')
    }
  

  
</script>

<style>
.bottom{
  height: 100px;
}
	.index-search {
  --van-search-content-background: #ffffff !important;
  --van-search-background: #f8f8f8 !important;
  --van-grid-item-content-background: #f8f8f8 !important;
  --van-grid-item-text-color: #7f7f7f !important;
}
.recommend {
  font-size: 17px;
  font-weight: bold;
  margin: 10px;
}
.Mainstream-view {
  margin: 10px;
  height: 200px;
  border-radius: 5px;
  background-color: #7d89b9;
  overflow: hidden;
}
.Mainstream-left {
  position: relative;
  flex: 1;
  height: 200px;
}
.Mainstream-left-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.Mainstream-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #ffffff;
  padding: 0 0 10px 10px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}
.Mainstream-bottom img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.m-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}
.m-name {
  padding-left: 8px;
  font-size: 12px;
}
.dis-flex {
  flex: 1;
}
.Mainstream-right {
  gap: 8px;
  margin: 0 8px;
}
.Mainstream-right img {
  display: block;
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 3px;
}
.img_border {
  border: 2px solid yellow;
  box-sizing: border-box;
}
</style>