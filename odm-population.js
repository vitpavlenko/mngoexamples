'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// connecting
mongoose.connect("mongodb://vpavlenko:vpavlenko1@ds227674.mlab.com:27674/mongoexample", { useNewUrlParser: true });
// creating schemas
const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  });
  
const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  });
  
const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

(async () => {

    try {
        const author = new Person({
            _id: new mongoose.Types.ObjectId(),
            name: 'Pavel Cravets',
            age: 50
        });

        await author.save();

        const story1 = new Story({
            title: 'Paren Crasavets',
            author: author._id    
        });

        await story1.save();

        //population
        const story = await Story.findOne({ title: 'Paren Crasavets' }).populate('author');            
        console.log('The author is %s', story.author.name);
    } catch (err) {
        return console.log(err);
    } finally {
        await mongoose.disconnect();
    }
}) ();