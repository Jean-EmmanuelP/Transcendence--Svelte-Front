<script>
async function fetchData() {
  const response = await fetch('http://42pong.com:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:  `
      query {
        testingConnexion
      }
      `
    }),
  });

  const { data } = await response.json();
  console.log(data);
}

fetchData();
</script>

<h1 class="text-3xl font-bold underline bg-red-500 text-center p-2 w-full h-full">Hello world!</h1>