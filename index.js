var showData={
    e1:{title:'透明边框',des:'background-clip 属性不被IE8及以下版本的浏览器所支持'},
    e2:{title:'多边框',des:'目前'}
};
var nowSel='e2';

var expt= {
  el: "#app",
  data:{
    show: showData,
    sel: nowSel
  },
  computed:{
    showIndex: function(){
      return this.sel.replace('e','');
    }
  },
  methods:{
    showPage: function(selNum){
      if (!selNum || !this.$refs[selNum] || this.sel===selNum) return;
      if (this.sel){
        this.$refs[this.sel].className=this.$refs[this.sel].className.replace(/\s?show/,'');
      }
      this.sel=selNum;
      this.$refs[this.sel].className+=' show';
    }
  },
  mounted:function(){
    this.$refs[this.sel].className+=' show';
  },
  watch:{

  }
};

if (!document.addEventListener){
  document.getElementById(nowSel).className+=' show';
}else{
  var vu=new Vue(expt);
}