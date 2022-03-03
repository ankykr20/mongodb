const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'testdb'
const ObjectID = mongodb.ObjectId
//const { MongoClient, ObjectID } = require('mongodb')
const id = new ObjectID()
console.log(id)
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('DB! Connected')
    }
    const db = client.db(databaseName)

    //------------------using insertOne methode we can insert only one document
    db.collection('testcol').insertOne({
        firstname: 'Vaibhav',
        Lastname: 'Kumar',
        age: 21
    })

    // -----------------  using insertMany method to insert many document at a time.

    db.collection('testcol').insertMany([{
        firstname: 'Vaidehi',
        Lastname: 'Raj',
        age: 23
    }, {
        firstname: 'Avi',
        Lastname: 'Kumar',
        age: 26
    }], (error, result) => {
        if (result) {
            return console.log('Inserted!')
        }
        console.log(result.ops)
    })

    //---------finding one element
    db.collection('testcol').find({ firstname: 'Avinash' }).toArray((error, text) => {
        console.log(text)
       });

    db.collection('testcol').findOne({ _id: new
        ObjectID("622062f5e3069e3eec7e0baf") }, (error, task) => {
         console.log(task)
    })

    const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve([7, 4, 1])
        // reject('Things went wrong!')
        }, 2000)
       })
       doWorkPromise.then((result) => {
        console.log('Success!', result)
       }).catch((error) => {
        console.log('Error!', error)
       })

       //update one 

       db.collection('testcol').updateOne({
        _id: new ObjectID("622062f5e3069e3eec7e0baf")
       }, {
        $set: {
        age: 20,
        Lastname: 'Singh'
        }
       }).then((result) => {
        console.log(result)
       }).catch((error) => {
        console.log(error)
       })

    //--------------Update Many
    db.collection('testcol').updateMany({
        firstname : 'Vaidehi'
    },{
        $set:{
            age: 18
        }
    }, (error, result) => {
        if(error){
            console.log(error);
        }
        else{
            console.log(result);
        }
    })


    //-----------------------deleted one-------------------
    db.collection('testcol').deleteOne({
        age : 22
       }).then((result) => {
        console.log(result)
       }).catch((error) => {
        console.log(error)
    })


    //---------------Delete Many----------------------
    db.collection('testcol').deleteMany({
        age: 22
       }).then((result) => {
        console.log(result)
       }).catch((error) => {
        console.log(error)
       })
})