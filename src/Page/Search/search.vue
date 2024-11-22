<template>
  <div class="search-div" :style="{ background: styleSwitch.searchBack ? 'rgba(233, 89, 60, 1)' : '#ffffff' }">
        <van-search autofocus show-action placeholder="搜索游记/地点等" @focus="focusInput"  v-model="keywords" @clear="clearEvent" @search="onSearch" background="none" @update:model-value="upInput(keywords)">
      <template #action>
        <div @click="onSearch" :style="{ color: styleSwitch.hotCityExist ? '#ffffff' : '#151419' }">搜索</div>
      </template>
    </van-search>

    
  </div>
  <!-- 占位高度 -->
  <div :class="[styleSwitch.categorySearch ? 'search_height_y' : 'search_height_n']"></div>
  <!-- 搜索历史和热门城市 v-show="historyShow"-->
  <div class="search-padding">
    <div  v-show="historyShow">
        <div v-if="historyData.length>0">
          <div class="search-history global-display global-a-items global-j-content">
            <p>历史搜索</p>
            <img src="@/icon/search/delete-search.png" alt="" @click="deleteHistory" />
          </div>
          <div class="history-data global-display global-a-items global-f-wrap">
            <p v-for="(item,index) in historyData" :key="index" @click="goSearch(item)">{{item}}</p>
          </div>
        </div>
     </div>
    <!-- 热门城市 -->
     <div v-if=hotCityShow>
          <div class="search-history global-display global-a-items global-j-content">
            <p>热门旅游城市</p>
            </div>
            <div class="Hot-city global-display global-a-items fadeIn" v-for="(item,index) in hotCityTravels" :key="index" @click="goSearch(item._id)">
              <img :src="item.image" alt="">
              <div>
                <p>{{item._id}}</p>
                <p>{{item.count}}人去过</p>
              </div>
            </div>

           
            
          </div>
      </div>

  <!-- 显示实时搜索列表 -->
  <div class="search-list" v-show="listShow">
    <p class="text-show" v-for="(item, index) in searchList" :key="index" @click="goSearch(item)">{{ item }}</p>
  </div>
  <!-- 搜索结果展示 -->
  <div v-show="travelShow">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" offset="100" @load="onLoad">
      <card :usertravels="userTravels" />
    </van-list>
  </div>
  <div style="height: 100px"></div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
// 瀑布流游记
import card from "@/Page/Card/card.vue";
import { useRouter } from "vue-router";
//引入debounce
import debounce from 'debounce';

import search from '@/Data/Search/search_List.js'
// 搜索框内容发生改变时触发的事件
const upInput = debounce((keywords)=>{
  searchList.value = search
  if(keywords === ''){
    hotCityShow.value = true
  historyShow.value = true
  listShow.value = false
  travelShow.value = false
  } else{
    searchList.value = search
    listShow.value = true
  hotCityShow.value = false
  historyShow.value = false
  }
  travelShow.value =false
},1000)

// 输入框清空按钮
const clearEvent=()=> {
  historyShow.value = true
  hotCityShow.value = true
  listShow.value = false
console.log(123455)
}


//热门城市的推荐
import hot from '@/Data/Search/hot.js'
// 热门城市包含的游记
const hotCityTravels = ref([]);

onMounted(()=>{
  hotCityTravels.value = hot
    historyData.value = JSON.parse(localStorage.getItem("history"))||[]
//   hot_city.value = hotCityData
})

// 搜索关键词
const keywords = ref("");

watch(keywords,(newValue,oldValue)=>{
  if(newValue == ''){
    travelShow.value = false
  }
})


// 热门城市的数据
// import hotCityData from '@/Data/Search/hot_city.js'
const hot_city = ref([])

const $router = useRouter(); // 这是路由跳转的

// 获取焦点时触发:如果输入框为空，则展示搜索历史部分，否则展示搜索列表
const focusInput = ()=>{
  console.log(123456);
}
// 存储搜索历史数据
const historyData = ref([1]);
// 热门旅游城市的显示隐藏
const hotCityShow = ref(true)

// 热门旅游城市的数据
// 存储热门旅游城市
const hotCity = ref([]);



// 存储实时搜索列表
const searchList = ref([]);
// 隐藏 || 显示：搜索历史
const historyShow = ref(true);
// 隐藏 || 显示：搜索列表
const listShow = ref(false);
// 隐藏 || 显示：搜索出来的游记
const travelShow = ref(false);

// tab选项卡切换
const active = ref(0);
// 存储swiper的宽度
const swiperWidthPx = ref(0);
// 存储有热门城市或没有的样式切换
const styleSwitch = reactive({
  searchBack: false, //顶部搜索栏背景
  categorySearch: false, //是否展示搜索切换选项卡false
  hotCityExist: false, //是否搜索出热门城市
  author: false, //是否展示搜索的作者
});
// 输入时触发
async function seacrhKeyword() {
 
}
  // const updateInput = debounce(seacrhKeyword);
// 暂存处理去重的搜索历史
const setKeywords = ref([]);
// 搜索出的游记
const userTravels = ref([]);
// 热门城市轮播
const hotCity_Data = ref([]);

// 存储搜索出的作者数据
const authorData = ref([]);
// 点击搜索列表去搜索数据
import card_data from '@/Data/Search/card.js'
const goSearch =(item)=>{
  userTravels.value = card_data
  travelShow.value = true
  listShow.value = false
  hotCityShow.value = false
  historyShow.value =false
  keywords.value = item

  let arr = JSON.parse(localStorage.getItem('history'))||[]
console.log(arr)
arr.unshift(item)
arr = Array.from(new Set(arr));
localStorage.setItem('history',JSON.stringify(arr))

historyData.value = arr
}

// 清空搜索历史
const deleteHistory = ()=>{
    historyData.value = []
    localStorage.removeItem('history')
    // console.log(123334)
}



// 手动或回车按下搜索时触发
async function onSearch() {
  await goSearch(keywords.value);
}


// 点击tab选项卡，按游记或用户切换
const tabIndex = ref(0); //存储选项卡选中哪个
async function onClickTab(event) {}
// 上啦加载瀑布流游记
const loading = ref(false);
const finished = ref(false);
const page = ref(1);
async function onLoad() {}
// 上拉加载作者数据
const loadingAuth = ref(false);
const finishedAuth = ref(false);
const pageAuth = ref(1);
async function onLoadAuth() {}

</script>

<style>
.search-div {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  --van-search-content-background: #f7f8fa !important;
}
/* 有搜索选项卡时 */
.search_height_y {
  height: 98px;
}
/* 没有搜索选项卡时 */
.search_height_n {
  height: 54px;
}
.search-padding {
  padding: 10px;
}
/* 搜索历史和热门城市 */
.search-history {
  margin-bottom: 5px;
}
.search-history img {
  width: 15px;
  height: 15px;
  display: block;
}
.search-history p {
  font-weight: bold;
}
.history-data {
  margin: 10px 0;
}
.history-data p {
  background-color: #f9f9f9;
  border-radius: 40px;
  padding: 6px 10px;
  margin: 0 10px 10px 0;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(7 * 20px + 2 * 0.5px); /* 显示7个字符 */
}
.Hot-city {
  padding: 5px 0;
  box-sizing: border-box;
}
.Hot-city img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  display: block;
  object-fit: cover;
}
.Hot-city div {
  flex: 1;
  padding-left: 10px;
}
.Hot-city p {
  padding: 3px 0;
}
.Hot-city p:nth-child(2) {
  color: #bdbdbd;
}
/* 触发实时搜索展示 */
.search-list {
  padding: 0 10px;
}
.search-list p {
  border-bottom: 1px solid #e3e4e7;
  /* padding: 12px 0; */
  height: 40px;
  line-height: 40px;
}
</style>