const mongoose = require('mongoose')
const Order = require('./order')
const Donut = require('./donut')
const Coffee = require('./coffee')
const User = require('./user')
const db = require('../../config/db')

const userId = '65cb7fe3825b95a713192701' //testing user 
const donutId = '65ca6d39931f775ef6a69741' //testing donut
const coffeeId = '65ca7db77b22de6ae35a0a8a' //testing coffee

const startOrders = [
    {   donuts: donutId,
        donutQuantity: 1,
        coffee: coffeeId,
        coffeeQuantity: 1,
        totalPrice: 3.00,
        onwer: ownerId,
        createdAt: new Date().toISOString()

    }

]


mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        Order.deleteMany({ owner: null })
            .then(deletedOrders => {
                console.log('deleted orders in seed script: ', deletedOrders)

                Order.create(startOrders)
                    .then(newOrders => {
                        console.log('new orders added to db: \n', newOrders)
                        // VERY IMPORTANT
                        mongoose.connection.close() 
                    })
                    .catch(error => {
                        console.log('an error has occurred: \n', error)
        
                        // VERY IMPORTANT
                        mongoose.connection.close() 
                    })
            })
            .catch(error => {
                console.log('an error has occurred: \n', error)

                // VERY IMPORTANT
                mongoose.connection.close() 
            })
    })
    .catch(error => {
        console.log('an error has occurred: \n', error)

        // VERY IMPORTANT
        mongoose.connection.close() 
    })