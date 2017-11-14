var express = require('express');
var router = express.Router();
var crud = require('../crud');

var blankJSON = {"data":[],"success":false};

//fuerza a que el parametro sea numerico, para consultas relacionadas con el id (INT)
function forceNumber(req){
    var id = +req.params.id;
    
    if(!Number.isInteger(id))
        id = 0;
    return +id;
}

//valida y response y setea el status code
//200 query ok, 201 crear/update/ ok,202 delete ok 204 query vacia, 500 error de query o conexion bd 
function resStatus(req,res,a){
    var status = 200;
    
    //si hay resultados
    status = a.data.length>0&&a.success==true?200:status;
    //create/update ok
    status = a.data.affectedRows>=1?201:status;
    //delete ok
    status = a.data.affectedRows>=1&&req.method=='DELETE'?202:status;
    //si data viene vacio = query 0 resultados
    status = a.data.length==0||a.data.affectedRows==0?204:status;
    //si data contiene error => 500
    status = a.data.errno?500:status;
    //if login
    status = a.data.length==0&&(req.path).match('login')?401:status;
    //console.log(status);
    res.status(status).json(a);
}

//valida par de contrasena y login existen
router.post('/login',(req,res)=>{
    var u = req.body.user;
    var p = req.body.pass;
    if(u && p)
        crud.login(u,p,(a)=>{
            resStatus(req,res,a);
        });
    else
        resStatus(req,res,blankJSON);
});

//select all
router.get('/users',(req,res)=>{
    crud.readAll((a)=>{
        resStatus(req,res,a);
    });    
});

//select by id
router.get('/users/:id',(req,res)=>{
    crud.readOne(forceNumber(req),(a)=>{
        resStatus(req,res,a);
    });
});

//delete by id si id existe
router.delete('/users/:id',(req,res)=>{
    crud.existeId(forceNumber(req),(ex)=>{
        if(ex.data.length!=0&&!ex.data.errno)
            crud.deleteOne(forceNumber(req),(a)=>{
                resStatus(req,res,a);
            });
        else
            resStatus(req,res,blankJSON);
    });
    
});

//create 1 si email o username no existe
router.post('/users',(req,res)=>{
    //first_name, last_name, email, password, Username
    var b = req.body;
    var arr = [b.first_name, b.last_name, b.email, b.password, b.Username];
    if(b.first_name &&
       b.last_name &&
       b.email &&
       b.password &&
       b.Username)
        crud.existeMailoUser(arr[2],arr[4],(ex)=>{
            if(ex.data.length==0&&!ex.data.errno)
                crud.create(arr,(a)=>{
                    resStatus(req,res,a);
                });
            else
                resStatus(req,res,blankJSON);
        });
    else
        resStatus(req,res,blankJSON);
});

//update 1 si nuevo mail no existe
router.put('/users/:id',(req,res)=>{
    var b = req.body;
    var arr = [b.first_name, b.last_name, b.email, b.password, forceNumber(req)];
    if(b.first_name &&
       b.last_name &&
       b.email &&
       b.password)
        crud.existeMail(arr[2],(ex)=>{
            if(ex.data.length==0&&!ex.data.errno)
                crud.update(arr,(a)=>{
                    resStatus(req,res,a);
                });
            else
                resStatus(req,res,blankJSON);
        });
    else
        resStatus(req,res,blankJSON);
});

router.all('*',(req,res)=>{res.status(404).send('none')});

module.exports = router;