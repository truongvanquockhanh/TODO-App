
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
let cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://khanh:khanh123456@cluster0.7af3z.mongodb.net/stick');

const itemsSchema = {
    name: String
};

const work = mongoose.model('work', itemsSchema);
const home = mongoose.model('home', itemsSchema);

app.get('/work', function (req, res) {
    work.find({}, function(err, foundItems){
        if (foundItems.length === 0) {
            res.json({listTitle: 'Work is empty !', newLists: foundItems});
        } else {
            res.json({listTitle: 'Work', newLists: foundItems});
        }
        })
    });

app.post('/work', function(req, res) {
    const workName = req.body.newItem;
    console.log('item req', req.body);
    const item = new work ({
        name: workName
    });
    item.save();
    res.json({post: workName});
});

app.delete('/work/:checkID', function(req,res){
    const checkItemId = req.params.checkID;
    console.log('item delete', checkItemId);
    work.findByIdAndRemove(checkItemId, function(err){
        if (!err) {
            res.json({done: "delete"});
            console.log('done delete!!');
        }
    })
})

app.get('/', function (req, res) {
    home.find({}, function(err, foundItems){
        if (foundItems.length === 0) {
            res.json({listTitle: 'Home is empty !', newLists: foundItems});
        } else {
            res.json({listTitle: 'Home', newLists: foundItems});
        }
        })
});

app.post('/', function(req, res) {
    const workName = req.body.newItem;
    console.log('item req', req.body);
    const item = new home ({
        name: workName
    });
    item.save();
    res.json({post: workName});
});

app.delete('/:checkID', function(req,res){
    const checkItemId = req.params.checkID;
    console.log('item delete', checkItemId);
    home.findByIdAndRemove(checkItemId, function(err){
        if (!err) {
            res.json({done: "delete"});
            console.log('done delete!!');
        }
    })
})

app.listen(PORT, function () {
    console.log(`sever running on port ${PORT}`);
});