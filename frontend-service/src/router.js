import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginPage.vue';
import Items from '@/components/ItemsPage.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/items', component: Items, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
