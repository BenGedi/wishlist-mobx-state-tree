import { onSnapshot, getSnapshot, onPatch } from 'mobx-state-tree';
import { WishList, WishListItem } from './WishList';
import { reaction } from 'mobx';

it('can create instance of a model', () => {
    const item = WishListItem.create({
        "name": "Chronicles of Narnia Box Set - C.S Lewis",
        "price": 28.73
    })

    expect(item.price).toBe(28.73);
    expect(item.image).toBe('');
    item.changeName('Narnia');
    expect(item.name).toBe('Narnia');
});

it('can create a wishlist', () => {
    const wishList = WishList.create({
        items: [
            {
                "name": "Chronicles of Narnia Box Set - C.S Lewis",
                "price": 28.73
            }
        ]
    })

    expect(wishList.items.length).toBe(1);
    expect(wishList.items[0].price).toBe(28.73);
});

it('can add new items', () => {
    const list = WishList.create();
    const state = [];

    // lister event to changes on state
    onSnapshot(list, snapshot => {
        state.push(snapshot);
    })

    list.add({
        name: 'Ben',
        price: 10
    });

    expect(list.items.length).toBe(1);
    expect(list.items[0].name).toBe('Ben');
    expect(list.items[0].price).toBe(10);

    list.items[0].changeName('new Ben');
    expect(list.items[0].name).toBe('new Ben');

    // expect(getSnapshot(list)).toEqual({
    //     items: [{
    //         name: 'new Ben',
    //         price: 10,
    //         image: ''
    //     }]
    // });
    
    expect(getSnapshot(list)).toMatchSnapshot();

    // when ever the state is change we can see how snaphot evolve over time over time
    expect(state).toMatchSnapshot();
})

// record mutation
it('can add new items - 2', () => {
    const list = WishList.create();
    const patches = [];

    // lister event to changes on state
    onPatch(list, patch => {
        patches.push(patch);
    })

    list.add({
        name: 'Ben',
        price: 10
    });

    list.items[0].changeName('new Ben');

    // when ever the state is change we can see how snaphot evolve over time over time
    expect(patches).toMatchSnapshot();
})

it('can calculate the total price of wishlist', () => {
    const list = WishList.create();

    list.add({
        name: 'puppy',
        price: 500
    })

    list.add({
        name: 'gedi',
        price: 121
    });

    expect(list.totalPrice).toBe(621);

    let changed = 0;
    // reaction listen to a data and calling a callback when ever the data changes
    reaction(() => list.totalPrice, () => changed++);

    expect(changed).toBe(0);
    console.log('TOTAL PRICE: ', list.totalPrice);

    list.items[0].changeName('good puppy');
    expect(changed).toBe(0);
    list.items[0].changePrice(1000);
    expect(changed).toBe(1);
})