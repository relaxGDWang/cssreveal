var showData = {
  e1: {title: '透明边框', des: 'background-clip 属性不被IE8及以下版本的浏览器所支持。'},
  e2: {
    title: '多重边框',
    des: '真所谓鱼和熊掌不可兼得，多层边框借助box-shadow实现，但无法支持边框样式，而支持边框样式的out-line则不支持多边框设置和圆角响应。另外请留意他们的hover响应范围之外，还要注意box-shadow的透明来实现多层透明边框会导致颜色重叠的问题。'
  },
  e3: {title: '灵活的背景定位', des: '除了左上角的参照点定位之外，似乎没有额外的方法对ie8来做兼容实现'},
  e4: {title: '边框内圆角', des: 'ie8没有办法兼容实现，不过以上两个例子不用做任何修改就可以优雅回退成有边框但无内圆角的dom，注意outline其实在ie8下能被有限支持。'},
  e5: {title: '条纹背景', des: ''}
};
var nowSel = 'e5';

var expt = {
  el: "#app",
  data: {
    show: showData,
    sel: nowSel
  },
  computed: {
    showIndex: function () {
      return this.sel.replace('e', '');
    }
  },
  methods: {
    showPage: function (selNum) {
      if (!selNum || !this.$refs[selNum] || this.sel === selNum) return;
      if (this.sel) {
        this.$refs[this.sel].className = this.$refs[this.sel].className.replace(/\s?show/, '');
      }
      this.sel = selNum;
      this.$refs[this.sel].className += ' show';
    }
  },
  mounted: function () {
    this.$refs[this.sel].className += ' show';
  },
  watch: {}
};

if (!document.addEventListener) {
  document.getElementById(nowSel).className += ' show';
} else {
  var vu = new Vue(expt);
}