import { Router } from 'express';

import authService from '../services/authService.js';

const router = Router();

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { email, password, repassword } = req.body;

    await authService.register(email, password);


    res.redirect('/auth/login');

});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
   
    const token = await authService.login(email, password);
    
    res.cookie('auth', token, { httpOnly: true });
    const location = '/'
    
    res.redirect(location);

});


export default router; 