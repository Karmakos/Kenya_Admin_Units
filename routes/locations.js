import { Router } from "express";

const router = Router();

router.get("/name", (req, res) => {
    res.send("Found all Locations here")
})


export { router }