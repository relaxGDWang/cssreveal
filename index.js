var showData={
    e1:{title:'透明边框',des:'暂时不支持IE8及以下'}
};
new Vue({
    el: "#app",
    data:{
        show: showData,
        sel: 'e1'
    },
    computed:{
        showIndex: function(){
            return this.sel.replace('e','');
        }
    },
    methods:{

    },
    created:function(){

    },
    watch:{

    }
});