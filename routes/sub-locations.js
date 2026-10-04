import { Router } from "express";

const router = Router();

router.get("/name", (req, res) => {
    res.send("Found all sub locations here")
})

export { router }