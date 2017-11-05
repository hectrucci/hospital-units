const fetch = require('isomorphic-fetch');

const service = {};

service.getHostpitalUnits = () => {
    const url = `https://private-66479-hospiqtest.apiary-mock.com/units`;

    return fetch(url)
        .then((response) => {
            const status = response.status;

            if (status >= 400) {
                res.status(status).send('Unexpexted Error');
            }

            return response.json();
        });
};

module.exports = service;
