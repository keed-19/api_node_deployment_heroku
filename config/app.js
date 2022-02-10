const express           =       require('express')
const cors              =       require('cors')


const authRoutes        =       require('../routes/auth')
const dashboardRoutes   =       require('../routes/dashboard')
const verifyToken       =       require('../middleware/middleware')
const config            =       require('../config/config')

const app = express()


app.use(cors(config.application.cors.server));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Creamos la variable de configuración

app.use('/api', authRoutes)

//TODO:falta por acomodar esta ruta en el archivo de rutas
//verificacion del token con el middleware
app.use('/api/dashboard', verifyToken, dashboardRoutes)

module.exports = app