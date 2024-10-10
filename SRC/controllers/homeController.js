import { Router } from 'express';
import movieService from '../services/movieService.js';

const router = Router();



router.get('/', (req, res) => {
   const movies = movieService.getAll();
   
   res.render('home', { movies });
});

router.get('/about', (req, res) => {
   res.render('home/about');
});

router.get('/search', (req, res) => {
   res.render('home/search');
});

router.get('/create', (req, res) => {
   res.render('home/create');
});

export default router;