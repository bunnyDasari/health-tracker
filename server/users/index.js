const { Router } = require("express")
const userRouter = Router()
const jwt = require("jsonwebtoken")
const { usersData, userHealth } = require("../db")
const bcrypt = require('bcrypt')
const seckey = "rohan"
userRouter.get("/", (req, res) => {
    res.json({ msg: "hi there" })
})

userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body
    const userFound = await usersData.findOne({ username })
    if (userFound) {
        const token = jwt.sign({
            token: userFound._id
        }, seckey)
        res.json({
            token
        })
    } else {
        res.json({ msg: "signup!!!" })
    }
})


userRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body
    const userFound = await usersData.findOne({ username })
    const hashpassword = await bcrypt.hash(password, 10)
    if (userFound) {
        res.json({ msg: "user is alredy exsist" })
    } else {
        await usersData.create({
            username, password: hashpassword
        })
        res.json({ msg: "user is created" })
    }
})

module.exports = { userRouter }