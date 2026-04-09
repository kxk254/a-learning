async function main() {
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

  const get = await fetch('http://localhost:3000/cats/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  const response = await get.text();
  console.log(response);

  const post = await fetch('http://localhost:3000/cats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
    body: JSON.stringify({
      id: 1,
      name: 'cat',
      age: 30,
      breed: 'white',
    }),
  });

  const postResponse = await post.text();
  console.log(postResponse);
}

main();
