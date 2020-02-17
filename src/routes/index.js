import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../components/layout/Index'
import LayoutMake from '../components/layout/make'

import Main from '../components/Main'
import Login from '../components/member/Login'
import Email from '../components/member/Email'
import Register from '../components/member/Register'
import Password from '../components/member/Password'
import PasswordReset from '../components/member/PasswordReset'

import RouteList from '../components/route/RouteList'
import RouteView from '../components/route/RouteView'

import Map from '../components/search/Map'
import PlaceView from '../components/search/PlaceView'

import Setting from '../components/setting/Setting'
import Notice from '../components/setting/Notice'
import NoticeView from '../components/setting/NoticeView'

import Profile from '../components/profile/MyProfile'
import ProfileMod from '../components/profile/ProfileMod'

import RouteMake from '../components/make/RouteMake'
import RouteMake2 from '../components/make/RouteMake2'

import store from '../store'

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
    if (store.state.mb_id !== null) {
        return next();
    }
    next('/email');
}

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/email',
            component: Email
        },
        {
            path: '/password',
            component: Password
        },
        {
            path: '/passwordRe',
            component: PasswordReset
        },
        {
            path: '/main',
            component: Layout,
            children:[
                {
                    path: '',
                    component: Main
                }
            ],
            beforeEnter: requireAuth()
        },
        {
            path: '/map',
            component: Layout,
            children:[
                {
                    path: '',
                    component: Map,
                },
                {
                    path: ':id',
                    component: PlaceView,
                    props:true
                }
            ],
            beforeEnter: requireAuth()
        },
        {
            path: '/profile',
            component: Layout,
            children:[
                {
                    path: '',
                    component: Profile,
                },
            ],
            beforeEnter: requireAuth()
        },
        {
            path: '/profileMod',
            component: Layout,
            children:[
                {
                    path: '',
                    component: ProfileMod,
                },
            ],
            beforeEnter: requireAuth()
        },
        {
            path: '/route',
            component: Layout,
            children:[
                {
                    path: '',
                    component: RouteList
                },
                {
                    path: ':id',
                    component: RouteView,
                    props: true
                }
            ],
            beforeEnter: requireAuth()
        },
        {
            path: '/make',
            component: LayoutMake,
            children: [
                {
                    path: '',
                    component: RouteMake,
                },
                {
                    path: ':id',
                    component: RouteMake2,
                    props: true
                }
            ],
            beforeEnter: requireAuth()
        },
        {
            path: '/setting',
            component: Layout,
            children:[
                {
                    path: '',
                    component: Setting
                }
            ],
            beforeEnter: requireAuth()
        },
        {
            path: '/notice',
            component: Layout,
            children: [
                {
                    path: '',
                    component: Notice
                },
                {
                    path: ':id',
                    component: NoticeView,
                    props: true
                }
            ],
            beforeEnter: requireAuth()
        }
    ]
});
