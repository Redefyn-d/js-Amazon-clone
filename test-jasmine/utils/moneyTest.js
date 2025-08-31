import {moneyCal} from '../../scripts/utils/money.js';

describe('test suite: Format Currency',()=>{
    it('converts cents into dollars',()=>{
         expect(moneyCal(2095)).toEqual('20.95');
    });

    it('Checks edge case for 0',()=>{
        expect(moneyCal(0)).toEqual('0.00');
    });

    it('Checks round off',()=>{
        expect(moneyCal(2000.5)).toEqual('20.01');
    })
});
