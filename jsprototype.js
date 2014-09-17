
<script> 
//function initWatch(){
Object.prototype.doWatch = function (prop,path, handler) {
	var oldval = this[prop];
	var newval = oldval; 
	
	getter = function () {
		return newval;
	};
	setter = function (val) {
		if(newval==val){
			return; 
		}
		oldval = newval;
		return newval = handler.call(this, path +'.' + prop );
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

function startWatching (obj,storeName, handler){
	traverse(obj,storeName,null,null, handler);
}

 function traverse(obj,storeName, parentName, keyName, handler) {
	if(parentName!=null && keyName != null){
		parentName = parentName +'.'+ keyName; 
	}
    for (key in obj) {
        if (typeof(obj[key])=="object") {
			if(parentName==null){parentName = storeName;}
            traverse(obj[key],storeName, parentName,key, handler);
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


startWatching(store, 'store', function (path){
	alert ('changed at : ' + path); 
});

store.userdata.age = 40; 

store1 =  {
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

//resetStore(oldStroe, NewStroe)
	//recall startWatching 
	//update allObjects pointing to this store only 
//updateStore(Store, storeData)
	// update data from the existing store 
	// nothing else is required as soon as data will change it will update control associated 
	// update only matching and leave others 

//updateStroeAt()
	//  
	
//store.userdata.age = 45; 




store.userdata.level1["l3"]= 'parag'; 
alert(store.userdata.age);				
alert(store.userdata.level1.l1);			
alert(store.userdata.level1.l3);
//alert(JSON.stringify(store));				


alert(JSON.stringify(store.systemdata[0].name));	
</script> 











