//utf8
var c3={
	template:'<div>show it</div>'
};
//Vue.component('c1',{
var c1={
	components:{
		'c3':c3,
	},
    template: '<div>'+
		'<div><slot></slot></div>'+
		'<ul v-for="item in ca">'+
			'<li><label>name</label><strong>{{item.name}}</strong></li>'+
			'<li><label>HP</label><strong>{{item.hp}}</strong></li>'+
			'<li><label>MP</label><strong>{{item.mp}}</strong></li>'+
			'<li><label>ACT</label><strong>{{item.act}}</strong></li>'+
			'<li><label>DEF</label><strong>{{item.def}}</strong></li>'+
			'<li><label>SP</label><strong>{{item.sp}}</strong></li>'+
			'<li><label>MDF</label><strong>{{item.mdf}}</strong></li>'+
		'</ul>'+
		'<c3></c3>'+
	'</div>',
    props:{
        ca:{
            required: true
        },
		tt:{
			default: 'relax show'
		}
    },
    computed:{
        
    },
    methods:{
    }
//});
};

//Vue.component('c2',{
var c2={
    template: '<div>'+
		'<div><slot></slot></div>'+
		'<table v-for="item in ca">'+
			'<tr>'+
				'<td colspan="2"><label>name</label><strong>{{item.name}}</strong></td>'+
			'</tr><tr>'+
				'<td><label>HP</label><strong>{{item.hp}}</strong></td><td><label>MP</label><strong>{{item.mp}}</strong></td>'+
			'</tr><tr>'+
				'<td><label>ACT</label><strong>{{item.act}}</strong></td><td><label>DEF</label><strong>{{item.def}}</strong></td>'+
			'</tr><tr>'+
				'<td><label>SP</label><strong>{{item.sp}}</strong></td><td><label>MDF</label><strong>{{item.mdf}}</strong></td>'+
			'</tr>'+
		'</table>'+
		'<pp :kk="ca[0].name"></pp>'+
	'</div>',
    props:{
        ca:{
            required: true
        }
    },
    computed:{
        
    },
    methods:{
    }
//});
};

Vue.component('pp',{
    template: '<div>'+
		'<strong>{{kk}}</strong><span>, hi what did you say?</span>'+
	'</div>',
    props:{
        kk:{
            default: 'test'
        }
    },
    computed:{
        
    },
    methods:{
    }
});