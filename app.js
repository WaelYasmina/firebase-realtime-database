const express = require('express');
const app = express();
const port = 3000;
const admin = require('firebase-admin');

// var serviceAccount = require("the .json file path");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "your database url"
// });

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "your database url"
  });


app.use(express.json());
app.use(express.static('public'));


const database = admin.database();
const usersRef = database.ref('/users');

app.get('/', (req, res) => {
    res.send('index');
});

app.post('/save', (req, res) => {
    const user_id = usersRef.push().key;
    usersRef.child(user_id).set({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age
    });
});

app.put('/update', (req, res) => {
    const newData = {
        age: req.body.age,
        first_name: req.body.first_name
    };
    usersRef.child(req.body.user_id).update(newData);
    // const newData = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     age: req.body.age
    // };
    // const user_id = usersRef.push().key;
    // const updates = {};
    // updates['/users/' + user_id] = newData;
    // updates['/super-users/' + user_id] = newData;
    // database.ref().update(updates);
});

app.delete('/remove', (req, res) => {
    usersRef.child(req.body.user_id).remove();
});

// usersRef.on('child_added', snapshot => {
//     console.log('New data has been added to the database !');
// });

// usersRef.on('child_changed', snapshot => {
//     console.log('Data has been changed !');
// });

// usersRef.on('child_removed', snapshot => {
//     console.log('Data has been removed !');
// });

// usersRef.on('value', snapshot => {
//     console.log('An event occured on the database !');
// });

// usersRef.on('child_changed', snapshot => {
//     console.log(snapshot.val());
// });

// usersRef.orderByKey().limitToLast(2).on('value', snapshot => {
//     console.log(snapshot.val());
// });

// usersRef.orderByChild('last_name').startAt('J').on('value', snapshot => {
//     console.log(snapshot.val());
// });

usersRef.orderByValue().limitToLast(2).on('value', snapshot => {
    console.log(snapshot.val());
});

app.listen(port, () => {
    //console.log(`App is listening to port ${port}`);
});