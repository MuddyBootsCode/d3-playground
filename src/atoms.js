import { atom, selector } from 'recoil';

export const itemWithID = id => {
    return (
        atom({
            key: `item${id}`,
            default: {
                id,
            }
        })
    )
}

export const itemList = atom({
    key: 'itemList',
    default: []
})

export const selectedItems = selector({
    key: 'selectedItems',
    get: ({get}) => {
        const items = get(itemList).map(i  => get(itemWithID(i)))
        return items.filter((item) => item.selected)
    }
});