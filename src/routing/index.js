import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    { path:'/', redirect:'/clusters' },
    { path:'/clusters', name:'clusterGraph',component: () => import ('../views/ClusterizationGraph.vue') },
    { path: '/dendrogram', name: 'dendrogramGraph', component : () => import('../views/DendrogramGraph.vue')},
    {path: '/:notFount(.*)', redirect: '/clusters'}
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;

