import { WishListItem } from './WishList';

it('can create instance of a model', () => {
    const item = WishListItem.create({
        "name": "Chronicles of Narnia Box Set - C.S Lewis",
        "price": 28.73,
        "image": "http://t3.gstatic.com/images?q=tbn:ANd9GcRR8RtvlbILZwwijAbdrE8oo4wfpoC3gSFGxcoT9LvuHE6AlX5M"
    })

    expect(item.price).toBe(28.73);
})