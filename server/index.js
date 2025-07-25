require('dotenv').config()
const express = require("express")
const { userRouter } = require("./users")
const { routeHealth } = require("./healthdata")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(cors("*"))
app.use("/v1/users", userRouter)
app.use("/v1/health", routeHealth)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Db is connected"))
    .catch((e) => console.log("Error" + e))

app.listen(process.env.PORT, () => console.log("server is running port " + process.env.PORT))