//TODO: seeds script should come here, so we'll be able to put some data in our local env
require("dotenv").config();

var mongoose = require("mongoose");

require("../models/User");
require("../models/Item");
require("../models/Comment");

var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");

mongoose.connect(process.env.MONGODB_URI);

const falso = require('@ngneat/falso');

// users 
const seedUsers = async (count) => {
  let errorCount = 0;
  let successfulCount = 0;

  while(successfulCount < count && errorCount < 10) {
    var user = new User();

    user.username = falso.randUserName().replace(/[^a-zA-Z0-9]/g,'');
    user.email = falso.randEmail().replace(/[^a-zA-Z0-9@\.]/g,'');
    user.setPassword(falso.randPassword());

    await user
      .save()
      .then(function() {
        successfulCount++;
        return console.log("user created: ", user.username);
      })
      .catch((err) => {
        errorCount++;
        console.log('error');
        console.error(err);
      });
  }
}

// products
const seedProducts = async (count) => {
  let errorCount = 0;
  let successfulCount = 0;
  
  while(successfulCount < 200 && errorCount < 10) {
    var count =  await User.count()

    var seller = await User.findOne().skip(Math.floor(Math.random() * count))

    if(!seller) {
      errorCount++;
    
      continue;
    }
    
    var item = new Item({
      slug: falso.randSlug() + '-' + falso.randUuid(),
      title: falso.randText(),
      description: falso.randSentence(),
      image: "",
      tagList: []
    })

    item.seller = seller;

    await item
      .save()
      .then(function() {
        successfulCount++;
        console.log("item created: ", item.title);
      })
      .catch((err) => {
        errorCount++;
        console.log('error');
        console.error(err);
      });
  }
}

// comments
const seedComments = async (count) => {
  let errorCount = 0;
  let successfulCount = 0;
  
  while(successfulCount < 200 && errorCount < 10) {
    var userCount =  await User.count()

    var commenter = await User.findOne().skip(Math.floor(Math.random() * userCount))

    if(!commenter) {
      errorCount++;
    
      continue;
    }

    var itemCount =  await Item.count()

    var item = await Item.findOne().skip(Math.floor(Math.random() * itemCount))

    if(!item) {
      errorCount++;
    
      continue;
    }
    
    var comment = new Comment({
      body: falso.randParagraph()
    })
    comment.item = item;
    comment.seller = commenter;

    await comment
      .save()
      .then(function() {
        item.comments = item.comments.concat([comment]);
        item.save({
          validateModifiedOnly: true,
        });
        
        successfulCount++;
        console.log("comment created: ", comment.body);
      })
      .catch((err) => {
        errorCount++;
        console.log('error');
        console.error(err);
      });
  }
}

const main = async () => {
  await seedUsers(100),
  await seedProducts(100),
  await seedComments(100),
  
  console.log('done')
  process.exit();
}

main()