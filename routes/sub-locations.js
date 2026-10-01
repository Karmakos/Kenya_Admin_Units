import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Found all sub locations here")
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`Sub location ${id} finally found`)
})
export { router }