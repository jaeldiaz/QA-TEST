import { test, expect } from '@playwright/test';

test('Get Pokemon moves and sort them using bubble sort', async ({ request }) => {
  const response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.name).toBe('pikachu');

  // 3️⃣ Extraer los nombres de los movimientos
  const moveNames: string[] = data.moves.map((m: any) => m.move.name);

  // 4️⃣ Definir la función Bubble Sort (tipada)
  function bubbleSort(arr: string[]): string[] {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Intercambiar elementos
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  // 5️⃣ Aplicar Bubble Sort (haciendo copia del arreglo original)
  const sortedMoves = bubbleSort([...moveNames]);

  // 6️⃣ Mostrar los movimientos ordenados en consola
  console.log('=== Sorted Pokemon Moves (Bubble Sort) ===');
  sortedMoves.forEach(m => console.log(m));

  // 7️⃣ Validación: comprobar que el resultado es igual al ordenamiento nativo de JS
  const jsSorted = [...moveNames].sort();
  expect(sortedMoves).toEqual(jsSorted);
});



//  Obtener la cadena de evolución de Bulbasaur
test('Get Bulbasaur evolution chain', async ({ request }) => {

  // Obtener los datos del Pokémon Bulbasaur
  const response = await request.get('https://pokeapi.co/api/v2/pokemon/bulbasaur');
  expect(response.status()).toBe(200);
  const pokemonData = await response.json();

  // Obtener la URL del endpoint "species"
  const speciesUrl: string = pokemonData.species.url;
  console.log('Species URL:', speciesUrl);

  // Solicitud GET al endpoint "species"
  const speciesResponse = await request.get(speciesUrl);
  expect(speciesResponse.status()).toBe(200);
  const speciesData = await speciesResponse.json();

  // Obtener la URL del endpoint "evolution_chain"
  const evolutionChainUrl: string = speciesData.evolution_chain.url;
  console.log('Evolution Chain URL:', evolutionChainUrl);

  // Hacer la solicitud GET al endpoint "evolution_chain"
  const evolutionResponse = await request.get(evolutionChainUrl);
  expect(evolutionResponse.status()).toBe(200);
  const evolutionData = await evolutionResponse.json();

  //  Extraer las dos evoluciones básicas
  const evolutionOne: string = evolutionData.chain.evolves_to[0].species.name;
  const evolutionTwo: string = evolutionData.chain.evolves_to[0].evolves_to[0].species.name;

  console.log('Primera evolución:', evolutionOne);
  console.log('Segunda evolución:', evolutionTwo);

  // Validaciones
  expect(evolutionOne).toBe('ivysaur');
  expect(evolutionTwo).toBe('venusaur');
});
