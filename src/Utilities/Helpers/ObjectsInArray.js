export const objectInArray = (items, itemsId, objectPropName, newObjectProps ) => {
    return items.map(u => {
        if (u[objectPropName] === itemsId) {
            return { ...u, ...newObjectProps }
        }
        return u;
    })
}