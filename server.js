

//## Restful Routing

// Resource "Food(s)"

// INDUCES

// | HTTP Verb | URL Path | Description |
// |-----------|----------|-------------|
// | GET       | /foods   | List all food items |
// | GET       | /foods/new | Form to create a new food item |
// | DELETE    | /foods/:id | Delete a single food item |
// | PUT       | /foods/:id | Update a single food item |
// | POST      | /foods   | Create a new food item |
// | GET       | /foods/:id/edit | Form to edit a single food item |
// | GET       | /foods/:id | Get a single food item |
// ## Common Errors

// `Cannot GET /<whatever here>` - This error occurs when the server is running but the route does not exist. Check the route in the browser and the server.
const express = require('express');
const app = express();
// Middleware for parsing JSON payloads
app.use(express.json());

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));
const foods = [
    {
        "name": "Stuffing",
        "calories": 250,
        "id": "u1T2MkHh"
      },
      {
        "name": "Turkey",
        "calories": 200,
        "id": "LIZrCoo1"
      },
      {
        "name": "Mashed Potatoes",
        "calories": 450,
        "id": "Ful25Gjh"
      },
      {
        "name": "Mac N Cheese",
        "calories": 500,
        "id": "qmT8ybNh",
        "image": "https://www.allrecipes.com/thmb/e8uotDI18ieXNBY0KpmtGKbxMRM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/238691-Simple-Macaroni-And-Cheese-mfs_008-4x3-6ed91ba87a1344558aacc0f9ef0f4b41.jpg"
      },
      {
        "name": "Rolls",
        "calories": 150,
        "id": "fOfqizf9"
      },
      {
        "name": "Green Bean Casserole",
        "calories": 300,
        "id": "7DDIyuHU"
      },
      {
        "name": "Sweet Potato Pie",
        "calories": 550,
        "id": "OiBLlFp9"
      }
    ];
  

app.get('/', (req, res) => {
  res.render("home.ejs");
});

// INDEX
app.get('/foods', (req, res) => {
  res.render("index.ejs",{foods:foods});
});
// NEW - shows a form to create a new food
app.get('/foods/new', (req, res) => {
    res.render('new.ejs')
  });
  // CREATE - creates a new food
//   app.post ("/foods", (req, res) => {
//     console.log(req.body);
//     foods.push(req.body)
//     res.redirect('/foods')
//   });
app.post("/foods", (req, res) => {
    // generate a unique ID
    const id = generateId();
    // Merge that ID into the object from the form
    const mergedObject = { ...req.body, id };
    // Push that new object into our foods list
    foods.push(mergedObject)
    res.redirect('/foods')
  })
  
  function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

//show-showas a single food item and its properties
app.get('/foods/:id', (req, res) => {
  // Find the food from the list using the ID
  const id = req.params.id;
  const food = foods.find((food) => {
    return food.id === id;
  });
  res.render("show.ejs", { food: food });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
