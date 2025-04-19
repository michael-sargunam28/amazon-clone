import { formattedCurrency } from "../../scripts/utils/money.js";

describe('test suite:formattedCurrency',() => {
    it('converts cents into pounds',() => {
        expect(formattedCurrency(2095)).toEqual('20.95');
    })

    it ('round up to the nearest cent ',()=> {
        expect(formattedCurrency(2095.5)).toEqual('20.96');
    })
})