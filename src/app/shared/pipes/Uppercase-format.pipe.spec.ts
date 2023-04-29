import { UpperCaseFormatPipe } from "./Uppercase-format.pipe";


describe('UpperCaseFormatPipe', () => {
    it('create an instance', () => {
        const pipe = new UpperCaseFormatPipe();
        expect(pipe).toBeTruthy();
    });
});