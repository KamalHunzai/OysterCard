
    exports = module.exports = function (app,mongoose) {
        app.db = {};

        app.db = mongoose.connect (app.get('databaseURL'),function (err) {
            if(err) {
                console.log("Please check the mongodb Service " + err);
            } else {
                console.log("Mongodb connected to server");
            };
        });
    };