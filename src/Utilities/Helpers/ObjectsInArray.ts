export const objectInArray = (items: any, itemsId: any, objectPropName: any, newObjectProps: any ) => {
    return items.map((u: any) => {
        if (u[objectPropName] === itemsId) {
            return { ...u, ...newObjectProps }
        }
        return u;
    })
}