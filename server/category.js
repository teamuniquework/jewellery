

export const get = async () => {
    const data = await fetch(`${process.env.APP_URL}/categories`);
    const json = await data.json();
    // console.log(json); // For debugging, remove in production
    return json; // Ensure the data is returned
};
