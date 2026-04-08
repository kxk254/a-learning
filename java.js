function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Did something');
      resolve('https://example.com');
    }, 200);
  });
}

doSomething()
  .then(function (result) {
    return doSomething(result);
  })
  .then(function (newResult) {
    console.log(newResult);
    return doSomethingElse(newResult);
  })
  .then(function (finalresult) {
    console.log(`got the final result:${finalresult}`);
  });
