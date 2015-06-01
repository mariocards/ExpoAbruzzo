var cachedObj = {
	newsC : {},
	itinerari: {},
	eventi: {},
	
	setNews: function(id, object){
		this.newsC['id'] = object;
	},
	getNews: function(id){
		if(!this.newsC){
			return undefined;
		}
		return this.newsC['id'];
	},
	setItinerari: function(id, object){
		this.itinerari['id'] = object;
	},
	getItinerari: function(id){
		if(!this.itinerari){
			return undefined;
		}
		return this.itinerari['id'];
	},
	setEventi: function(id, object){
		this.eventi['id'] = object;
	},
	getEventi: function(id){
		if(!this.eventi){
			return undefined;
		}
		return this.eventi['id'];
	},
	
}