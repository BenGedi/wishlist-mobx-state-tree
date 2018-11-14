import { types } from 'mobx-state-tree';

const data = {
    "name": "Chronicles of Narnia Box Set - C.S Lewis",
    "price": 28.73,
    "image": "http://t3.gstatic.com/images?q=tbn:ANd9GcRR8RtvlbILZwwijAbdrE8oo4wfpoC3gSFGxcoT9LvuHE6AlX5M"
};

// define the model types 
export const wishListItem = types.model({
    name: types.string,
    price: types.number,
    image: '', // equval to: types.optional(types.string, '')
});