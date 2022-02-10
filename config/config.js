//importar variables de entornos locales

require('dotenv').config()
console.log(process.env.URL_DB)

const conectdb = {
    // db      :    process.env.MONGODB || 'mongodb://localhost:27017/apilogin',
    // db      :    process.env.MONGODB || process.env.URL_DB
    db      :    'mongodb+srv://kevin:KeeD29@users.xgtm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}

const port = process.env.PORT || 8005
const host = ''

//TODO: en produccion

    const application = {
        cors: {
            server: [
                {
                    origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true,
                    "Access-Control-Allow-Methods": 'POST, GET, OPTIONS, DELETE'
                }
            ]
        }
    }

module.exports  =   {
    conectdb,
    port,
    host,
    application
}