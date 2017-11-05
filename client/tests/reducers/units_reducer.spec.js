import { units } from '../../src/store/reducers/units_reducer';

describe('Testing Unit Reducer', () => {
    it('Should set units to the state', () => {
        const state = [
            {
                capacity: 18,
                census: 2,
                highAlarm: null,
                id: '1',
                lowAlarm: 4,
                name: 'Intermediate',
            },
        ];

        const action = {
            type: 'SAVE_UNITS',
            units: state,
        };

        const result = units(state, action);

        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual('Intermediate');
        expect(result[0].capacity).toEqual(18);
        expect(result[0].lowAlarm).toEqual(4);
    });
});
