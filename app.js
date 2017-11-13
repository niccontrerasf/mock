var express = require('express');
var app = express();
var crud = require('./crud');


function forceNumber(req){
    var id = +req.params.id;
    
    if(!Number.isInteger(id))
        id = 0;
    return +id;
}

//body.Username and password, test ajax
app.get('/login',(req,res)=>{
    crud.login('ramiranda1','144NBq',(a)=>{
        res.json(a);
    });
});

app.get('/read',(req,res)=>{
    crud.readAll((a)=>{
        res.json(a);
    });    
});

app.get('/read/:id',(req,res)=>{
    crud.readOne(forceNumber(req),(a)=>{
        res.json(a);
    });
});

app.get('/delete/:id',(req,res)=>{
    crud.deleteOne(forceNumber(req),(a)=>{
        res.json(a);
    });
});

//body.Username and password, test ajax
app.get('/create',(req,res)=>{
    crud.create([1,1,1,1,1],(a)=>{
        res.json(a);
    });
});

//body.Username and password, test ajax
app.get('/update',(req,res)=>{
    crud.update([1,1,'NOOOO',1,undefined,1003],(a)=>{
        res.json(a);
    });
});


app.listen(3000,()=>{
    console.log('server up :3000');
});