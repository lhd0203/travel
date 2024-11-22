import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: "/index",
            component: () => import('@/Page/Index/index.vue')
        },
        {
            path: "/found",
            component: () => import('@/Page/Found/found.vue')
        },
        {
            path: "/mine",
            component: () => import('@/Page/Mine/mine.vue')
        },
        {
            path: '/publish',
            component: () => import('@/Page/Publish/publish.vue')
        },
        {
            path:'/search',
            component: ()=>import('@/Page/Search/search.vue')
        },
        {
            path:'/detail',
            component: () => import('@/Page/Detail/detail.vue')
        }
    ]
})

export default router