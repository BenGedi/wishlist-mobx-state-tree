import { types, getParent, destroy } from 'mobx-state-tree';

// define the model types 
export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: '', // equval to: types.optional(types.string, '')
    })
    .actions(self => ({
        changeName(newName) {
            self.name = newName;
        },
        changePrice(newPrice) {
            self.price = newPrice;
        },
        changeImage(newImage) {
            self.image = newImage;
        },
        remove() {
            // 2 is the defth of the child in the tree, so it needs to go 2 parents up
            getParent(self, 2).remove(self);
        }
    }));

export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), []),
    })
    .views(self => ({
        get totalPrice() {
            return self.items.reduce((sum, entry) => sum + entry.price, 0) // /* hot reloading example  => */ * 1.2;
        }
    }))
    .actions(self => ({
        add(item) {
            self.items.push(item);
        },
        remove(item) {
            destroy(item); // ==> self.items.splice(self.items.indexOf(item), 1);
        }
    }));
