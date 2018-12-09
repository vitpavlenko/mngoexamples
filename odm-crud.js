'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stringify = (obj) => (Object.keys(obj).reduce((res, prop) => res += prop + ': ' + obj[prop] + ' ' , '{ ') + ' }');

// подключение
mongoose.connect("mongodb://vpavlenko:vpavlenko1@ds227674.mlab.com:27674/mongoexample", { useNewUrlParser: true });
// установка схемы
const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 3333
    }
});
const User = mongoose.model("User", userScheme);

(async () => {

    try {
        const doc = await User.create({name: 'Oleg', age: 47});
        console.log(`Saved object user: ${doc}`);

        const all = await User.find({});
        console.log(all);

        const oleg = await User.find({name: 'Oleg'});
        console.log(`Oleg: ${oleg}`);
    
        await User.create([{name: 'Oleg', age: 228}, {name: 'Oleg', age: 322}, {name: 'Oleg', age: 1488}]);

        const oneOleg = await User.findOne({name: 'Oleg'});
        console.log(`Found only one Oleg: ${oneOleg}`);

        const deletedOleg = await User.deleteOne({age: 228});
        console.log(`removed Oleg: ${stringify(deletedOleg)}`);

        const deletedWithFindOleg = await User.findOneAndDelete({name: 'Oleg'});
        console.log(`Found and removed one Oleg: ${deletedWithFindOleg}`);

        const foundAndUpdated = await User.findOneAndUpdate({name: 'Oleg'}, {name: 'Epamovec', age: 1});
        console.log(`Found and updated Oleg: ${foundAndUpdated}`);

    } catch (err) {
        return console.log(err);
    } finally {
        await mongoose.disconnect();
    }
}) ();