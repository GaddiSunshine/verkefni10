
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */
// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = '0Q6t3wUG7OnOUlPG4sJ7prlJxOLaz82qzELs2UKA';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod?api_key=';

let date;


function randomDate(start, end) {
  date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return formattedDate;
}


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  date = randomDate(new Date(1995, 6, 16), new Date());
  const result = await fetch(`${URL}${API_KEY}&date=${date}`);
  let data;
  if (result.status !== 200) {
    console.error('Non 200 status');
  } else {
    data = await result.json();
  }
  return data;
}
