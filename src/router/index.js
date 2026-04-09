import { createRouter, createWebHistory } from 'vue-router'
import ArchitectureView from '../views/ArchitectureView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'architecture',
            component: ArchitectureView,
        },
    ],
})

export default router