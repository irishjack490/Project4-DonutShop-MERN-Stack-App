const mongoose = require('mongoose')
const Coffee = require('./coffee')
const db = require('../../config/db')


const startCoffees = [
    { name: 'Irish Coffee', description: 'espresso, whiskey and cream (do not order during working hours)', size: 'small', price: 2.00 },
    { name: 'Espresso con Panna', description: 'espresso with cream', size: 'small', price: 2.00 },
    { name: 'Caramel Machiatto', description: 'vanilla syrup, steamed milk, espresso, caramel sauce', size: 'small', price: 2.00 },
    { name: 'Caffe Americano', description: 'hot water and espresso', size: 'small', price: 2.00 },
    { name: 'Caffee Latte', description: 'espresso, steamed milk and milk foam on top', size: 'small', price: 1.00 }
    
]

mongoose.connect(db, {useNewUrlParser: true})
    Coffee.find()
        .then(() => {
            Coffee.deleteMany({ owner: null })
                .then(deletedCoffees => {
                    console.log('deleted coffees in seed script: ', deletedCoffees)

                    Coffee.create(startCoffees)
                        .then(newCoffees => {
                            console.log('new coffees added to db: \n', newCoffees)
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