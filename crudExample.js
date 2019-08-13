Vue.config.devtools = true;


// 1. 路由組件範例，主要路由放在component.js
const Foo = { template: '<div>router1 work!</div>' };

// 2. 定義路由
// 每個路由應該對應一個組件，其中component可以是
// Vue.extend() 創建的組件構造器或組件配置對象(Vue.component)
// 參考: https://router.vuejs.org/zh/api/#router-link-props
const routes = [
    
    { path: '/router1', component: Foo },                                   // 字串路由
    { path: '/insert', component: insert },
    { path: '/update/:id', component: update },                             // 帶參數的字串路由
    { path: '/detail/:id',name: 'detail', component: detail, props: true}   // 帶參數的命名路由
]


// 3. 創建 router 實例，然後傳 `routes` 配置
const router = new VueRouter({
    routes // (縮寫) routes: routes
})

// 4. 創建&掛載根實例。
// 記得要通過 router 配置參數注入路由，
// 從而讓整個應用都有路由功能
// const app = new Vue({
//     router
// }).$mount('#app')


var getList = new Vue({
    el: '#table',
    data: {
        items: []
    },
    created: function () {
        axios.get('http://localhost/testApi/api/TEST')
            .then((result) => {
                this.items = result.data;
            }).catch((err) => {
                console.log(err);
            });
    },
    methods: {
        Get: function () {
            axios.get('http://localhost/testApi/api/TEST')
                .then((result) => {
                    this.items = result.data;
                }).catch((err) => {
                    console.log(err);
                });
        },
        Delete: function (id) {
            axios.delete('http://localhost/testApi/api/TEST/' + id)
                .then((result) => {
                    this.Get();
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                });
        }

    },
    router
}).$mount('#table');
