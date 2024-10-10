import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
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