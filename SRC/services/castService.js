import Cast from '../models/Cast.js';

const getAll = (filter) => Cast.find();

const getAllWithout = (castIds) => Cast.find({ _id: { $nin: castIds } });

const create = (cast) => Cast.create(cast);

export default{
    create,
    getAll,
    getAllWithout,
}