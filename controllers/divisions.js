import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Found all divisions here")
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`Division ${id} finally found`)
})
export { router }