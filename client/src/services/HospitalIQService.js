import fetch from 'isomorphic-fetch';


const getHostpitalUnits = () => {
    return fetch(`/api/units`)
        .then((response) => response.json());
};

export { getHostpitalUnits, };
