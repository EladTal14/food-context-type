export const getMealsFromDb = async () => {
    const res = await fetch(process.env.REACT_APP_API_KEY_MEALS as string);
    if (!res.ok) {
        throw new Error('something went horribly wrong!');
    }
    const data = await res.json();
    return data;
}

export const postOrderDataToDb = async <T, G>(user: T, items: G) => {
    const res = await fetch(process.env.REACT_APP_API_KEY_ORDER as string, {
        method: 'POST',
        body: JSON.stringify({
            user,
            items
        })
    });
    if (!res.ok) {
        throw new Error('something went horribly wrong!');
    }
}