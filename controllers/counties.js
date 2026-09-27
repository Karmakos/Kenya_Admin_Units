import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Found all counties here")

})

router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`County ${id} finally found`)
})
export { router }