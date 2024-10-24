import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const router = Router();

router.get('/create', (req, res) => {
  res.render('movies/create');
})

//function toArray(documents) {
// return documents.map(document => document.toObject());
//}

router.post('/create', async (req, res) => {
  const movieData = req.body;
  const ownerId = req.user?._id;

  await movieService.create(movieData, ownerId);

  res.redirect('/');
})


router.get('/search', async (req, res) => {
  const filter = req.query;
  const movies = await movieService.getAll(filter).lean();

  res.render('home', { isSearch: true, movies, filter });
})

router.get('/:movieId/details', async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId).lean();

  const isOwner = req.user?._id === movie.owner?.toString();
  const isAuthenticated = !!req.user;

  res.render('movies/details', { movie, isOwner, isAuthenticated })
})

router.get('/:movieId/attach', async (req, res) => {
  const movie = await movieService.getOne(req.params.movieId).lean();
  const casts = await castService.getAllWithout(movie.casts).lean();

  res.render('movies/attach', { movie, casts });
})

router.post('/:movieId/attach', async (req, res) => {
  const movieId = req.params.movieId;
  const castId = req.body.cast;
  const character = req.body.character;

  await movieService.attach(movieId, castId, character);

  res.redirect(`/movies/${movieId}/details`);
});

router.get('/:movieId/delete', async (req, res) => {
  const movieId = req.params.movieId

  await movieService.remove(movieId);

  res.redirect('/');
})

router.get('/:movieId/edit', async (req, res) => {
  const movieId = req.params.movieId
  const movie = await movieService.getOne(movieId).lean();

  res.render('movies/edit', { movie });
});

router.post('/:movieId/edit', async (req, res) => {
  const movieData = req.body;
  const movieId = req.params.movieId;
  console.log(movieData);

  await movieService.edit(movieId, movieData);

  res.redirect(`/movies/${movieId}/details`);
});

export default router;