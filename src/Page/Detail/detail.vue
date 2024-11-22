<template>
    <div v-if="detail[0]">
      <van-swipe  v-if="detail[0]" bclass="my-swipe" duration="300" lazy-render :height="350">
      <van-swipe-item v-for="(item, index) in detail[0].image" :key="index">
        <img :src="item"/>
      </van-swipe-item>
      <template>
        <div class="custom-indicator"></div>
      </template>
    </van-swipe>
    <!-- 作者 -->
    <div
      class="author-view global-display global-a-items"
      v-for="(item, index) in detail[0].author" :key="index"
    >
      <img
        :src="item.avatarUrl"
        alt=""
      />
      <div class="author-name">
        <p>{{ item.nickname}}</p>
        <p>{{ detail[0].time }}</p>
      </div>
      <div class="concern-author" @click="attentionAuthor">已关注</div>
    </div>
    <!-- 文章 -->
    <div class="author-essay">
      <p>{{ detail[0].title }}</p>
      <p>
       {{ detail[0].content }}
      </p>
    </div>
    <!-- 评论区 -->
    <div class="Comment-area">
      <div
        class="Comment-users global-display"
        v-for="(item, index) in commentsData"
        :key="index"
      >
        <img
          src="https://diancan-1252107261.cos.accelerate.myqcloud.com/lvyou/avatarurl.png"
          alt=""
        />
        <div class="Comment-content global-display global-f-direction">
          <p>张三</p>
          <p>这里景色不错</p>
        </div>
        <div class="Comment-delete">删除</div>
      </div>
      <div class="View-more">更多</div>
    </div>
    <!-- 相关推荐 -->
    <div>
      <p class="rec-the-same">相关推荐</p>
      <card :userTravels="userTravels" />
      <div class="View-more" v-if="userTravels.length >= 6" @click="onLoad">
        {{ moreRecommend }}
      </div>
    </div>
    <div style="height: 200px"></div>
    <!-- 底部：点赞，评价数，收藏 -->
    <div class="bottom-oper global-display global-a-items global-j-content">
      <div class="bottom-oper-feel" @click="show = true">谈谈感受</div>
      <div class="oper-number global-display">
        <div
          class="global-display global-a-items global-f-direction"
          v-for="(item, index) in bottomOper"
          :key="index"
          @click="operatingState(index)"
        >
          <img :src="item.status ? item.selectedIconPath : item.iconPath" />
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
    <!-- 弹出评论框 -->
    <van-overlay :show="show" duration="0.2">
      <div class="Comment-input">
        <van-cell-group inset>
          <van-field
            v-model="message"
            rows="5"
            autosize
            autofocus
            type="textarea"
            placeholder="请输入评论"
          />
        </van-cell-group>
        <div class="global-display global-j-end">
          <van-button size="small" type="default" @click="show = false"
            >取消</van-button
          >
          <van-button size="small" type="success" @click="commentTravel"
            >发表</van-button
          >
        </div>
      </div>
    </van-overlay>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, reactive } from "vue";
  import card from "@/Page/Card/card.vue";
  import { useRoute } from "vue-router";
  const route=useRoute()
  const userTravels = ref(false);
  const show = ref(false);
  // 存储评论数据
  const commentsData = ref([]);
  const moreRecommend = ref("查看更多");
  import detailData from '@/Data/Detail/detail.js'
  const detail = ref([])
  onMounted(()=>{
    detail.value=detailData
  })
  </script>
  
  <style>
  .my-swipe img {
    object-fit: cover;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .van-swipe-item img {
    object-fit: cover;
    height: 350px;
  }
  .author-view {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(202, 126, 124, 0.2);
  }
  .author-view img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  .author-name {
    flex: 1;
    padding: 0 10px;
  }
  .author-name p:nth-child(2) {
    font-size: 14px;
  }
  .concern-author {
    background-color: gold;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .author-essay {
    margin: 20px 10px;
  }
  .author-essay p:nth-child(1) {
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .author-essay p:nth-child(2) {
    line-height: 1.5;
  }
  .bottom-oper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    height: 70px;
    font-size: 14px;
    color: #9f9f9f;
    border-top: 1px solid #f5f5f5;
  }
  .bottom-oper-feel {
    background-color: #f5f7f9;
    padding: 8px;
    flex: 1;
    margin-left: 20px;
    border-radius: 40px;
  }
  .oper-number img {
    width: 25px;
    height: 25px;
  }
  .oper-number div {
    padding: 0 15px;
  }
  .Comment-area {
    background-color: #f6f7f9;
    padding: 0 10px 10px 10px;
    font-size: 16px;
    margin: 0 10px;
    border-radius: 4px;
  }
  .Comment-users {
    padding: 20px 0;
  }
  .Comment-users img {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    object-fit: cover;
  }
  .Comment-content {
    flex: 1;
    padding: 0 8px;
  }
  .Comment-content p:nth-child(1) {
    color: #8c8c8c;
    padding-bottom: 3px;
  }
  .Comment-delete {
    color: #627095;
  }
  .van-cell-group--inset {
    margin: 0 !important;
    border-radius: inherit !important;
  }
  .Comment-input {
    --van-button-small-padding: 10px 20px;
    --van-button-small-font-size: 15px;
  }
  .van-button--small {
    margin: 10px;
  }
  .View-more {
    color: #1989fa;
    text-align: center;
    font-size: 12px;
  }
  .rec-the-same {
    margin: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  