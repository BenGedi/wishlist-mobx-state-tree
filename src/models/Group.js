import { types } from 'mobx-state-tree';
import { WishList } from './WishList';

const User = types.model({
    id: types.string,
    name: types.string,
    gender: types.enumeration('gender', ['m', 'f']),  //types.union(types.literal('m'), types.literal('f'))
    wishList: types.optional(WishList, {}),
})
.actions(self => ({
    getSuggestions() {
        window.fetch(`http://localhost:3001/suggestions_${self.gender}`)
            .then(response => response.json())
            .then(suggestions => {
                // will not work because this is an async prosses and self is will not be in the right context will the then will complete
                // self.wishList.items.push(...suggestions);
                
                // an action will fix this issue
                self.addSuggestions(suggestions);
            })
    },
    addSuggestions(suggestions) {
        self.wishList.items.push(...suggestions);
    }
}));

export const Group = types.model({
    users: types.map(User),
})
