const units = (state= {}, action) => {
    switch (action.type) {
        case 'SAVE_UNITS':
            const units = action.units;
            return units;
        default:
            return state;
    }
};


export { units };
