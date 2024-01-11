import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
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
            path: "/reader",
            name: "reader",
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
