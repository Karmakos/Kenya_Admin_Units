import { Router } from "express";
import { isNumber } from "../utils/inputValidators.js";
import { getAllCountries } from "../services/countries/countries.js";

const router = Router();

router.get("/", async (req, res) => {

    let limit = Math.max(parseInt(req.query?.limit, 10) || 25);
    let page = Math.max(parseInt(req.query?.page, 10) || 1);

    console.log(limit, page)

    if (page || limit) {
        page = isNumber(page);
        limit = isNumber(limit)
    }



    //pass to the controllers
    const allCountries = await getAllCountries(page, limit)
    console.log(allCountries)

    return res.json(allCountries)
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`Country ${id} finally found`)
})
export { router }