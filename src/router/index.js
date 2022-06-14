import {
    createRouter,
    createWebHistory
} from "vue-router";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/EventRegister.vue";
import EventEdit from "@/views/event/EventEdit.vue";
import NProgress from 'nprogress'
import EventService from '@/core/services/EventService.js'
import GStore from '@/store/gstore'
const routes = [{
        path: "/",
        name: "event-list",
        component: EventList,
        props: route => ({
            page: parseInt(route.query.page || 1)
        })
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import("@/views/AboutView.vue"),
    },
    {
        path: '/event/:id/',
        name: 'EventLayout',
        props: true,
        component: EventLayout,
        beforeEnter: (to) => {
            return EventService.getEvent(to.params.id)
                .then((response) => {
                    GStore.event = response.data
                })
                .catch((error) => {
                    if (error.response && error.response.status == 404) {
                        return {
                            name: '404',
                            params: {
                                resource: 'event'
                            },
                        }
                    } else {
                        return {
                            name: 'NetworkError'
                        }
                    }
                })
        },
        children: [ // <-----
            {
                path: '',
                name: 'EventDetails',
                component: EventDetails
            },
            {
                path: 'register',
                name: 'EventRegister',
                component: EventRegister
            },
            {
                path: 'edit',
                name: 'EventEdit',
                component: EventEdit,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: () => import("@/views/NotFound.vue")
    },
    {
        path: '/404/:resource',
        name: '404',
        component: () => import("@/views/NotFound.vue"),
        props: true
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: () => import("@/views/NetworkError.vue")
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) { // <----
            return savedPosition
        } else {
            return {
                top: 0
            }
        }
    }
});
router.beforeEach((to, from) => {
    NProgress.start()
    const notAuthorized = true
    if (to.meta.requireAuth && notAuthorized) {
        GStore.flashMessage = 'Sorry, you are not authorized to view this page'

        setTimeout(() => {
            GStore.flashMessage = ''
        }, 3000)
        if (from.href) {
            return false

        } else {
            return {
                path: '/'
            }
        }
    }
})
router.afterEach(() => {
    NProgress.done()
})
export default router;