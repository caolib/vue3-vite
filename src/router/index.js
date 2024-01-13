import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/book",
            name: "book",
            component: () => import("../views/BookView.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
        },
        {
            path: "/user",
            name: "user",
            component: () => import("../views/UserView.vue"),
        },
        {
            path: "/borrow",
            name: "borrow",
            component: () => import("../views/BorrowView.vue"),
        },
    ],
});

export default router;
