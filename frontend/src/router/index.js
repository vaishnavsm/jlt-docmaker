import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/Home.vue")
    },
    {
      name: "select_data",
      path: "/select_data",
      component: () => import("@/views/SelectData.vue")
    },
    {
      name: "add_data",
      path: "/add_data",
      component: () => import("@/views/AddData.vue")
    },
    {
      name: "results",
      path: "/results",
      component: () => import("@/views/AddDataResults.vue"),
      props: true,
    },
    {
      name: "review",
      path: "/review",
      component: () => import("@/views/ReviewTemplate.vue"),
      props: true,
    },
    {
      name: "batch_apply",
      path: "/batch_apply",
      component: () => import("@/views/BatchApplyResults.vue"),
      props: true,
    }
  ]
});
