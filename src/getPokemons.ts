import axios from "axios";

export const getPokemons = async () => {
  return (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
};
