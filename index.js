//plugins descargadas en el proyecto
const mongoose      =        require('mongoose')

const app           =        require('./config/app')
const config        =        require('./config/config')

mongoose.connect(config.conectdb.db, (err, res) => {

    if(err){
        console.log(`Error al conectar con la bd, asegurese de tener encendido el servidor de mongo: ${err}`)
    }
    console.log('La conexion a la base de datos ha sido exitosa')

    app.listen(config.host,config.port, () =>  {
        console.log(`API REST corriendo en http://${config.host}:${config.port}`)
    })

})