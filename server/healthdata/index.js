const { Router } = require("express")
const routeHealth = Router()
const { userHealth } = require("../db")


routeHealth.post("/add", async (req, res) => {
    const { token } = req.headers
    const { symptoms, mood, medications, notes } = req.body
    const healthDetails = await userHealth.create({
        userId: token,
        date: new Date().toISOString().split('T')[0],
        symptoms: symptoms.map(s => String(s)),
        mood: String(mood),
        medications: medications.map(m => String(m)),
        notes: String(notes)
    });
    res.json({ healthDetails })
})

routeHealth.get("/", async (req, res) => {
    const { token } = req.headers
    const getData = await userHealth.find({ userId: token })
    res.json({ getData })
})
module.exports = { routeHealth }
