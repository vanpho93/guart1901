const { sign, verify } = require('./jwt');

class User {
    static get users () {
        return [
            { _id: 'abcd123', email: 'teo@gmail.com', name: 'Teo Nguyen', password: '321', phone: '0987123412' },
            { _id: 'efgh456', email: 'ti@gmail.com', name: 'Ti Nguyen', password: '654', phone: '012238457838' },
            { _id: 'iklm789', email: 'tun@gmail.com', name: 'Tun Nguyen', password: '987', phone: '0909837484' },
        ];
    }

    static async signIn(email, password) {
        const user = User.users.find(u => u.email === email && u.password === password);
        if(!user) throw new Error('Invalid user info.');
        const token = await sign({ _id: user._id });
        return { ...user, token, password: undefined };
    }

    static async check(tokenForCheck) {
        const obj = await verify(tokenForCheck)
        .catch(error => { throw new Error('Invalid token.'); });
        const user = User.users.find(u => obj._id === u._id);
        if (!user) throw new Error('Invalid token.');
        const token = await sign({ _id: user._id });
        return { ...user, token, password: undefined };        
    }
}

module.exports = User;
