const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, ()=>{
  console.log(`Your server is listening on port: ${PORT}`)
});

app.get('/api/quotes', (req, res, next)=>{
  if(req.query.person !== undefined) {
    const person2 = req.query.person;
    if(quotes.filter(e => e.person === person2).length > 0){
      let array = quotes.filter(e => e.person === person2)
       res.send({quotes: array});
    }else{
      res.send([]);
    }
  } else {    
    res.send({quotes: quotes});
  }  
});

app.get('/api/quotes/random', (req, res, next)=>{
  const random = getRandomElement(quotes);
  res.send({quote: random});
});

app.post('/api/quotes', (req, res, next)=>{
  const quote = req.query.quote;
  const person = req.query.person;
  if(quote && person ){
    const obj = {
      quote: quote,
      person: person
    }
    quotes.push(obj);
    res.send({quote: obj});
  }else {
    res.status(400).send();
  }  
});
