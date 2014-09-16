
<script> 
//function initWatch(){
Object.prototype.doWatch = function (prop, path, handler) {
	var oldval = this[prop];
	var newval = oldval; 
	
	getter = function () {
		return newval;
	};
	setter = function (val) {
		oldval = newval;
		return newval = handler.call(this, prop, oldval, val, path);
	};
	if (delete this[prop]) { // can't watch constants
		if (Object.defineProperty) // ECMAScript 5
			Object.defineProperty(this, prop, {
				get: getter,
				set: setter
			});
		else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
			Object.prototype.__defineGetter__.call(this, prop, getter);
			Object.prototype.__defineSetter__.call(this, prop, setter);
		}
	}
	
};

//}

function startWatching (obj, handler){
	traverse(obj,null,null, handler);
}

 function traverse(obj, parentName, keyName, handler) {
	if(parentName!=null && keyName != null){
		parentName = parentName +'.'+ keyName; 
	}
    for (key in obj) {
        if (typeof(obj[key])=="object") {
			if(parentName==null){parentName = 'root';}
            traverse(obj[key], parentName,key, handler);
        }
		else {
			obj.doWatch(key,parentName,handler);
		}
    }
} 


var store =  {
	userdata : {
		name : 'manish',
		age : 30,
		level1:{
				l1: 'deepak', 
				l2 : 'ganesh'
			}
		}, 
	systemdata : [{
		name : 'bansal123',
		age : 50
		},
		{
		name : 'manish',
		age : 30
		}		
		]
		
}


startWatching(store, function (prop, oldval, newval, path){
	alert ('changed at : ' + path); 
});

store.userdata.age = 40; 

store =  {
	userdata : {
		name : 'bansal',
		age : 30,
		level1:{
				l1: 'deepak', 
				l2 : 'ganesh'
			}
		}, 
	systemdata : [{
		name : 'bansal123',
		age : 50
		},
		{
		name : 'manish',
		age : 30
		}		
		]
		
}

store.userdata.age = 45; 




store.userdata.level1["l3"]= 'parag'; 
alert(store.userdata.age);				
alert(store.userdata.level1.l1);			
alert(store.userdata.level1.l3);
//alert(JSON.stringify(store));				


alert(JSON.stringify(store.systemdata[0].name));	
</script> 











