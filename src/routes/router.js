import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "", name: "home", component: () => import("../components/Home.vue") },
  {
    path: "/artist/:id",
    name: "artist",
    component: () => import("../views/Artist.vue"),
    params: true,
  },
  {
    path: "/album/:id",
    name: "album",
    component: () => import("../views/Album.vue"),
    params: true,
  },
  {
    path: "/playlist/:id",
    name: "playlist",
    component: () => import("../views/Playlist.vue"),
    params: true,
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import("../views/User.vue"),
    params: true,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
