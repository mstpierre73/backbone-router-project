
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

//Définir les modèles 
const Car = Backbone.Model.extend();
const Boat = Backbone.Model.extend();

//Définir les collections
const Cars = Backbone.Collection.extend({
    model: Car
});

const Boats = Backbone.Collection.extend({
    model: Boat
});

//Défnir les vues
const HomeView = Backbone.View.extend({
    render: function(){
        this.$el.html("This is the home page view");
        return this;
    }
});

const NavView = Backbone.View.extend({
    events: {
        "click": "onClick"
    },

    onClick: function(e){
        let $li = $(e.target);
        router.navigate($li.attr("data-url"), {trigger: true});
    }
});

const OneCarView = Backbone.View.extend({
    tagName: "li",
    render: function(){
        this.$el.html(this.model.get("id") + " " + this.model.get("make") + " " + this.model.get("year"));
        return this;
    }
});

const OneBoatView = Backbone.View.extend({
    tagName: "li",
    render: function(){
        this.$el.html(this.model.get("id") + " " + this.model.get("color") + " " + this.model.get("speed"));
        return this;
    }
});

const CarsCollectionView = Backbone.View.extend({
    tagName: "ul",

    render:function(){
        let self = this;

        this.model.each(function(car){
            let oneCarView = new OneCarView({model: car});
            self.$el.append(oneCarView.render().$el);
        });
    }
});

const BoatsCollectionView = Backbone.View.extend({
    tagName: "ul",

    render: function(){
        let self = this;

        this.model.each(function(boat){
            let oneBoatView = new OneBoatView({model: boat});
            self.$el.append(oneBoatView.render().$el);
        })
    }
});

//Créer les items et les joindre aux collections
let carList = new Cars([
    new Car({id: 1, make: "Toyota", year: 2019}),
    new Car({id: 2, make: "Honda", year: 2018}),
    new Car({id: 3, make: "Ford", year: 2010})
]);

let boatList = new Boats([
    new Boat({id: 1, color: "white", speed: 100}),
    new Boat({id: 2, color: "red", speed: 150}),
    new Boat({id: 3, color: "brown", speed: 30})
]);

//initialiser les vues

let carsCollectionView = new CarsCollectionView({el: "#container2", model: carList});
carsCollectionView.render();

let boatsCollectionView = new BoatsCollectionView({el: "#container3", model: boatList});
boatsCollectionView.render();

//créer le routeur
const AppRouter = Backbone.Router.extend({
    routes: {
        "home": "homeView",
        "cars": "carsView",
        "boats": "boatsView"
    },

    homeView: function(){
        let view = new HomeView({el: "#container"});
        view.render();
    },

    carsView: function(){
        let view = new CarsCollectionView({el: "#container", model: carList});
        view.render();
    },

    boatsView: function(){
        let view = new BoatsCollectionView({el: "#container", model: boatList});
        view.render();
    }
});

//Initialiser le routeur
let router = new AppRouter();
Backbone.history.start();
let navView = new NavView({el: "#nav"});


