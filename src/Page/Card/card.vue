<template>
    <div class="card-view fadeIn">
  
        <div>
          <div class="item-card" v-for="(item,index) in left_data" :key="index">
          <div class="cover-drawing">
            <img
              :src="item.cover_image.url"
              class="cover-image"
            />
            <div class="cover-adress global-display global-a-items">
              <img src="@/icon/index/address.png" />
              <span class="text-show">{{item.address}}</span>
            </div>
          </div>
          <p class="cart-Title-text text-show">{{item.title}}</p>
          <div class="global-display global-j-content">
            <div
              class="card-name global-display global-a-items">
              <img
                :src="item.author_data[0].avatarUrl"
                alt=""
                class="avatarUrl"
              />
              <p>{{item.author_data[0].nickname}}</p>
            </div>
            <div class="card-name global-display global-a-items">
              <img src="@/icon/index/page-zan.png" alt="" class="page-zan" />
              <p>{{item.likes}}</p>
            </div>
          </div>
        </div>
        </div>

        <div>
          <div class="item-card" v-for="(item,index) in right_data" :key="index">
          <div class="cover-drawing">
            <img
              :src="item.cover_image.url"
              class="cover-image"
            />
            <div class="cover-adress global-display global-a-items">
              <img src="@/icon/index/address.png" />
              <span class="text-show">{{item.address}}</span>
            </div>
          </div>
          <p class="cart-Title-text text-show">{{item.title}}</p>
          <div class="global-display global-j-content">
            <div
              class="card-name global-display global-a-items">
              <img
                :src="item.author_data[0].avatarUrl"
                alt=""
                class="avatarUrl"
              />
              <p>{{item.author_data[0].nickname}}</p>
            </div>
            <div class="card-name global-display global-a-items">
              <img src="@/icon/index/page-zan.png" alt="" class="page-zan" />
              <p>{{item.likes}}</p>
            </div>
          </div>
        </div>
        </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive,watch } from "vue";
  const left_data = ref([])
  const right_data = ref([])
  const left_height = ref(0)
  const right_height = ref(0)
  const us = ref([])
  
  const props = defineProps({
    usertravels:{
      type:Array,
      required:true
    }
  })
  const handleHight=(realHeight,realWidth)=>{
    let radio = realHeight/realWidth;
    let padding = 4;
    let margin = 17;
    let screenWidth = window.innerWidth
    let itemWidth = Math.floor((screenWidth-padding*2-margin*2)/2)
    return (itemWidth*radio)
  }
  // watch(props,(newValue,oldValue)=>{
  //   const {user_travels} = props
  //   if(user_travels.length>0){
  //     user_travels.forEach(item=>{
  //       us.value.push(item)
  //     })
  //   }
  // })
  watch(props,(newValue,oldValue)=>{
      const {usertravels} = props
      if(usertravels.length>0){
        //遍历数组的每一个元素，判断添加到左侧还是右侧
        usertravels.forEach(item=>{
          if(left_height.value<=right_height.value){
            left_data.value.push(item)
            //更新左侧的高度
            left_height.value+=handleHight(item.cover_image.height,item.cover_image.width)
          }
          else{
             right_data.value.push(item)
            right_height.value+=handleHight(item.cover_image.height,item.cover_image.width)
          }
        })
      }
    })
  </script>
  
  <style scoped>
  /* ----------- */
  .card-view{
      padding: 0 5px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
  }
  .item-card{
      padding: 5px;
      box-sizing: border-box !important;
  }
  .data-left {
      grid-column: 1 / 2;
  }
  .data-right {
      grid-column: 2 / 3;
  }
  .cover-drawing{
      position: relative;
      border-radius: 10px;
      overflow: hidden;
  }
  .cover-image{
      width: 100%;
      display: block;
      /* border-radius: 10px; */
      object-fit: cover;
  }
  .cover-adress{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 0 10px 10px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  }
  .cover-adress img{
      width: 12px;
      height: 12px;
      display: block;
  }
  .cover-adress span{
      font-size: 10px;
      font-weight: bold;
      color: #ffffff;
      padding-left: 5px;
  }
  .cart-Title-text{
      font-size: 14px;
      font-weight: bold;
      padding-top: 7px;
      line-height:1.4;
  }
  .card-name{
      padding: 7px 0;
  }
  .avatarUrl{
      width: 20px;
      height: 20px;
      object-fit: cover;
      border-radius: 50%;
  }
  .page-zan{
      width: 15px;
      height: 15px;
  }
  .card-name p{
      padding-left: 6px;
      font-size: 13px;
      color: #717375;
  }
  </style>