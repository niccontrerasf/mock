var conexion = require('./conexion');

var table = 'mock_data';

////    Todas las query retornan la llave success y data
////    success:true    = query exitosa con resultados
////    seccess:false   = error

//validar si existe error en BD o query y retornar error o resulset
function checkError(err,rows,cb){
    if(err){
        return cb({"data":err,"success":false});
    }
    cb({"data":rows,"success":rows.length?true:false});
}


//valida a partir de Username,password si usuario existe / return json success
exports.login = (U,p,cb)=>{
    var que = [table,U,p];
    conexion.pool.query("SELECT id,first_name,last_name,email,Username FROM ?? WHERE Username = ? AND password = ?", que, function (err, rows, fields) {
        checkError(err,rows,cb);
    });
}

//retorna todos los usuarios
exports.readAll = (cb)=>{
    conexion.pool.query("SELECT id,first_name,last_name,email,Username FROM ??", table, function (err, rows, fields) {
        checkError(err,rows,cb);
    });
}

//retorna 1 usuario por id
exports.readOne = (id,cb)=>{
    var que = [table,+id];
    conexion.pool.query("SELECT id,first_name,last_name,email,Username FROM ?? WHERE id = ? LIMIT 1", que, function (err, rows, fields) {
        checkError(err,rows,cb);
    });
}

//elimina 1 usuario por id
exports.deleteOne = (id,cb)=>{
    var que = [table,id];
    conexion.pool.query("DELETE FROM ?? WHERE id = ?", que, function (err, rows, fields) {
        checkError(err,rows,cb);
    });
}

//inserta un usuario en la bd (id autonumerico)
exports.create = (datos,cb)=>{
    //solo inserta si vienen todos los parametros
    if(datos.length == 5){
        datos.unshift(table);
        conexion.pool.query("INSERT INTO ?? (first_name, last_name, email, password, Username) "+
                            "VALUES (?, ?, ?, ?, ?)", datos, function (err, rows, fields) {
            checkError(err,rows,cb);
        });
    }
    else
        cb({"data":[],"success":false});
}

exports.update = (datos,cb)=>{
    //solo inserta si vienen todos los parametros
    if(datos.length == 6){
        datos.unshift(table);//['nombre_tabla',....,id]
        conexion.pool.query("UPDATE ?? "+
                            "SET first_name = ?, last_name = ?, email = ?, password = ?, Username = ? "+
                            "WHERE id = ?", datos, function (err, rows, fields) {
            checkError(err,rows,cb);
        });
    }
    else
        cb({"data":[],"success":false});
}