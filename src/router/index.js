import {
    createRouter,
    createWebHistory
} from "vue-router";
import EventList from "@/views/EventList.vue";
import EventDetails from "@/views/EventDetails.vue";

const routes = [{
        path: "/",
        name: "event-list",
        component: EventList,
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import("@/views/AboutView.vue"),
    },
    {
        path: "/event/:id",
        name: "event-details",
        component: EventDetails,
        props: true,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;