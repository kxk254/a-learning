//savacript
const tok = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john',
    password: 'pass',
  }),
});

const token = await tok.json();
console.log(token.access_token);

const res = await fetch('http://localhost:3000/cats/1', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const response = await res.json();
console.log(response);
