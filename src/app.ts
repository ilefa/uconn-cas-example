import express from 'express';
import session from 'express-session';
import Authentication from 'express-cas-authentication';

const app = express();
const cas = new Authentication({
    cas_url: 'https://login.uconn.edu/cas',
    cas_version: '2.0',
    service_url: 'http://localhost:3000',
    session_name: 'netId',
    renew: true,
})

app.use(session({
    secret: process.env.SESSION_KEY || 'super-duper-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.get('/', cas.bounce, (req, res) => {
    res.json(req.session['netId']);
});

app.get('/user', cas.block, (_req, res) => {
    res.json({ message: 'hello there' });
});

app.get('/logout', cas.logout);

app.listen(3000, () => console.log('Ready on port 3000.'));