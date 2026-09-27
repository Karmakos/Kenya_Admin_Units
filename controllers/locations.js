import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Found all Locations here")
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`location ${id} finally found`)
})
export { router }