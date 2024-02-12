// give me some initial donuts in the database
// which will make it easy to test my routes

// this file will be run with a script command in the terminal
// we will set that script command up in package.json
// the command will be `npm run seed`

const mongoose = require('mongoose')
const Donut = require('./donut')
const db = require('../../config/db')

const startDonuts = [
    { name: 'Glazed Donut', description: 'thin glaze that coats the surface', glutenFree: false, price: '$1.50' },
    { name: 'Jelly Donut', description: 'doughnut without a hole in the middle, with fruit-filling inside', glutenFree: false, price: '$2.00' },
    { name: 'Cake Donut', description: 'Yummy Dense and crumbly', glutenFree: true, price: '$1.50' },
    { name: 'Frosted Chocolate Donut', description: 'delicious chocolate frosting', glutenFree: false, price: '$1.50' },
    { name: 'Frosted Pink Donut', description: 'delicious pink frosting', glutenFree: false, price: '$1.50' },
    { name: 'Pink Sprinkled Donut', description: 'pink frosting with sprinkles', glutenFree: false, price: '$1.75' },
    { name: 'Chocolate Sprinkled Donut', description: 'chocolate frosting with sprinkles', glutenFree: false, price: '$1.75' },
    { name: 'Boston Cream', description: 'filled with custard and topped with a chocolate glaze', glutenFree: false, price: '$2.00' },
    { name: 'Churro', description: 'Cinnamon sticks: coated with a traditional mixture of cinnamon sugar filled with dulce de leche.', glutenFree: false, price: '$1.00' },
    { name: 'Beignet', description: 'French pastry dough, served dusted with powdered sugar', glutenFree: false, price: '$1.50' },
    { name: 'Irish Donuts', description: 'Daugh made with flour and potatoes, coated with sugar', glutenFree: false, price: '$2.50' }

]

// first, establish a connection to the db
// then remove all donuts that do not have an owner
// then, insert all the starter donuts from the startDonuts array
// then, most importantly CLOSE the connection to the db

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        Donut.deleteMany({ owner: null })
            .then(deletedDonuts => {
                console.log('deleted donuts in seed script: ', deletedDonuts)

                Donut.create(startDonuts)
                    .then(newDonuts => {
                        console.log('new donuts added to db: \n', newDonuts)
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