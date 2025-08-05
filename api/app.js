import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
import { router } from './otros/rutas.js'
import cors from 'cors'

dotenv.config()

mongoose.connect(process.env.URL)
    .then(() => {
        console.log("Si funciona la DB")
    })
    .catch((error) => {
        console.log("No funciona la DB", error)
    })

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", router)


app.listen(3000, () => {
    console.log("Se conecto al server en el puestro 3000, http://localhost:3000/api/")
})

