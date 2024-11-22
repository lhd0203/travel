import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import { Tabbar, TabbarItem, Search, Grid, GridItem,List, Cell, Swipe, SwipeItem } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(Swipe)
app.use(SwipeItem)

app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Grid)
app.use(GridItem)
app.use(List)
app.use(Cell)
app.mount('#app')
