const request = require("request");

describe('calc', () => {
    it('should multiply 2 by 2', () => {
        expect(2*2).toBe(4);
    })
})

describe('get messages should return 200 OK', () => {
    it('should return 200', () => {
        request.get('http://localhost:3000/messages', (err, res) => {
            console.log(res.body);
            expect(res.statusCode).toEqual(200);
        })
    })
})

describe('get messages should return messages', () => {
    it('should return more than one message', () => {
        request.get('http://localhost:3000/messages', (err, res) => {
            console.log('Begin');
            console.log(res.body.length);
            expect(res.body.length).toBeGreaterThan(1);
        })
    })
})