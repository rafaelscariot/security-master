const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (tokenJwt) => {
    let userId = undefined;
    let validToken = false;

    if (!tokenJwt)
        return ({ error: true, status: 'Expect to receive a token' });

    const parts = tokenJwt.split(' ');

    if (!parts.length === 2)
        return ({ error: true, status: 'Invalid token' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return ({ error: true, status: 'Invalid token' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return ({ error: true, status: 'Invalid token' });

        userId = decoded.id;

        validToken = true;
    });

    if (validToken) {
        return { error: false, status: userId };
    } else {
        return { error: true, status: 'Invalid token' };
    }
}