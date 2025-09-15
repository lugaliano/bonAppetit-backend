import express from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import cors from 'cors'
import userRouter from './src/routes/users.router.js'
import setupSwagger from './swagger.js'

const app = express();
const PORT = config.port

app.use(express.json({ limit: '100mb' }));
app.use(cors());

app.use('/api/users', userRouter)


setupSwagger(app);
mongoose.connect(config.mongourl)
    .then(() => {
        console.log("Conectado a la Base de Datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la Base de Datos", error)
    })


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})