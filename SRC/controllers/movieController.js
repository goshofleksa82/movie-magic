import { Router } from "express";

const router = Router();

router.get('/movies/create', (req, res) => {
res.render('movies/create');
})

export default router;