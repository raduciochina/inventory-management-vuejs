const Chance = require('chance');
const chance = new Chance();
const admin = require('firebase-admin');
const db = require('./db');

const categories = [
  { name: 'Clothing' },
  { name: 'Electronics' },
  { name: 'Sports' },
  { name: 'Music' }
];

const controller = {
    generateData: async(req, res) => {
    const param = req.query.ownerId;
    console.log(param);
    for (const category of categories) {
    category.ownerId = param;
      db.collection('categories').add(category)
        .then(docRef => {
            console.log(`Category saved with ID: ${docRef.id}`);
            console.log({docRef})
            })
        .catch(error => {
            console.error(`Error saving category: ${error}`);
        });
      }
    const items = [];
    const categoryRefsSnapshot = await db.collection('categories').get();
    const categoryRefs = [];
    categoryRefsSnapshot.forEach(doc => {
      categoryRefs.push(doc.ref);
    });
    console.log(categoryRefs)
    
    for (let i = 0; i < 10; i++) {
      const category = chance.pickone(categoryRefs);
      const item = {
        ownerId: param,
        name: chance.word(),
        description: chance.sentence(),
        quantity: chance.integer({ min: 1, max: 300 }),
        price: chance.floating({ min: 0, max: 1000, fixed: 2 }),
        category: category,
      };
      items.push(item);
    
      db.collection('items').add(item)
        .then(docRef => {
          console.log(`Item saved with ID: ${docRef.id}`);
        })
        .catch(error => {
          console.error(`Error saving item: ${error}`);
        });
    }
    

    }
}





module.exports = controller;