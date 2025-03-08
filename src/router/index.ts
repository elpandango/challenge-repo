import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      component: () => import("../pages/TextPage/TextPage.vue"),
    },
    {
      path: "/protokoll",
      name: "protokoll",
      component: () => import("../pages/ProtokollPage/ProtokollPage.vue"),
    },
    {
      path: "/text-page",
      name: "text-page",
      component: () => import("../pages/TextPage/TextPage.vue"),
    },
    {
      path: "/patienten",
      name: "patienten",
      component: () => import("../pages/TextPage/TextPage.vue"),
    },
    {
      path: "/kurven",
      name: "kurven",
      component: () => import("../pages/TextPage/TextPage.vue"),
    },
    {
      path: "/einstellungen",
      name: "einstellungen",
      component: () => import("../pages/TextPage/TextPage.vue"),
    },
  ],
});

export default router;
