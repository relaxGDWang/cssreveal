var showData={
    e1:{title:'透明边框',des:'暂时不支持IE8及以下'},
    e2:{title:'多边框',des:''}
};
var vu=new Vue({
    el: "#app",
    data:{
        show: showData,
        sel: '',
        element: {}
    },
    computed:{
        showIndex: function(){
            return this.sel.replace('e','');
        }
    },
    methods:{
        showPage: function(selNum){
            if (!selNum) selNum='e1';
            if (!this.element[selNum]) return;
            if (this.sel){
                this.element[this.sel].className='';
            }
            this.sel=selNum;
            this.element[this.sel].className='show';
            alert(this.element[this.sel].outerHTML);
        }
    },
    created:function(){
        var tempArray=document.querySelector('.outside').children;
        var i,len;
        for (i=0,len=tempArray.length; i<len; i++){
            this.element[tempArray[i].id]=tempArray[i];
        }
        this.showPage('e2');
    },
    watch:{

    }
});