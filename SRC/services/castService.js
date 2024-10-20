import Cast from '../models/Cast.js';

const getAll = (filter) => Cast.find();

const getAllWithout = (casts) => {
    const castIds = casts.map(cast => cast.cast._id);

    return Cast.find({ _id: { $nin: castIds } });
}

const create = (cast) => Cast.create(cast);

export default {
    create,
    getAll,
    getAllWithout,
}