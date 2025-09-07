const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'replace_this_with_secure_value';


function authAdmin(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ error: 'No token provided' });
const token = auth.replace('Bearer ', '');
try {
const payload = jwt.verify(token, secret);
if (payload.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ error: 'Invalid token' });
}
}


module.exports = { authAdmin };
