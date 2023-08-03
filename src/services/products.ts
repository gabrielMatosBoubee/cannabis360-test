const featchData = async () => {
  const response = await fetch("http://my-json-server.typicode.com/gabrielMatosBoubee/JSON-Serve/products")
  return response.json();
}

export default featchData