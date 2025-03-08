import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      redirect: "/protokoll",
    },
    {
      path: "/protokoll",
      name: "protokoll",
      component: () => import("../pages/ProtokollPage/ProtokollPage.vue"),
    },
  ],
});

export default router;
