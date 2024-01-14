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
            path: "/admin/book",
            name: "adminBorrow",
            component: () => import("../views/admin/AdminBookView.vue"),
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
        {
            path: "/reader",
            name: "reader",
            component: () => import("../views/admin/ReaderView.vue"),
        },
    ],
});

export default router;
