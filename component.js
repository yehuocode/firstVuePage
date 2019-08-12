var insert = Vue.extend({
    data: function () {
        return { data: { A: '', B: '' } };
    },
    methods: {
        PostMethod: function (event) {
            axios.post('http://localhost/testApi/api/TEST', this.data)
                .then(res => {
                    console.log(res);
                    getList.Get();
                    this.RandomMethod();
                })
                .catch(err => {
                    console.log(err);
                    this.RandomMethod();
                });
        },
        // 隨機產生key值，方便快速插入
        RandomMethod: function () {
            this.data.A = Math.floor((Math.random() * 100000) + 1);
        }

    },
    template: '<div><h2>Insert</h2><p>{{data}}</p><p>A: <input type="text" v-model="data.A"></p><p>B: <input type="text" v-model="data.B"></p><button v-on:click="PostMethod">Insert</button></div>'
});

var detail = Vue.extend({
    props: ['id'],
    data: function () {
        return { data: { A: '', B: '' } };
    },
    created: function () {
        this.data.A = this.$route.params.id;
        this.GetSingle();
    },

    // beforeRouteUpdate用途:
    // 因為vue有component re-use的機制，所以連續在相同component、但不同params之間切換時ex:detail/123 & detail/asd
    // component內容不會更新，使用beforeRouteUpdate即可強制更新
    beforeRouteUpdate: function (to, from, next) {
        this.data.A = to.params.id;
        this.GetSingle();
        next();
    },
    methods: {
        GetSingle: function(){
            axios.get('http://localhost/testApi/api/TEST/' + this.data.A)
            .then((result) => {
                this.data.B = result.data.B;
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    template: '<div><h2>Row Detail</h2><p>A: {{data.A}}</p><p>B: {{data.B}}</p></div>'
});

var update = Vue.extend({
    data: function () {
        return { data: { A: '', B: '' } };
    },
    created: function() {
        this.data.A = this.$route.params.id;
    },
    beforeRouteUpdate: function(to, from, next){
        this.data.A = to.params.id;
        next();
    },
    methods: {
        UpdateClick: function (event) {
            this.data.A = this.$route.params.id;

            axios.put('http://localhost/testApi/api/TEST/' + this.data.A, this.data)
                .then(res => {
                    console.log(res);
                    getList.Get();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    template: '<div><h2>Update</h2><p>{{data}}</p><p>A: {{ $route.params.id }}</p><p>B: <input type="text" v-model="data.B"></p><button v-on:click="UpdateClick">Update</button></div>'
});

//$route.params.id