import getRandomImage from './nasa-api';
import { empty } from './helpers';
import { save, load } from './storage';


// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image = []; // object sem inniheldur núverandi mynd á forsíðu.
let type;


/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
  empty(document.querySelector('.apod__video'));
  image = await getRandomImage();

  const imgEl = document.querySelector('img');
  const titleEl = document.querySelector('h2');
  const textEl = document.querySelector('p');
  const videoEl = document.createElement('iframe');


  img = image.url;
  title = image.title;
  text = image.explanation;
  type = image.media_type;

  empty(textEl);
  empty(titleEl);

  titleEl.appendChild(document.createTextNode(`${title}`));
  textEl.appendChild(document.createTextNode(`${text}`));

  if (type === 'image') {
    imgEl.setAttribute('src', `${img}`);
  } else {
    imgEl.setAttribute('src', '');
    videoEl.setAttribute('src', `${img}`);
    document.querySelector('.apod__video').appendChild(videoEl);
  }
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.media_type, image.url, image.explanation, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default async function init() {
  getNewImage();

  const newImage = document.getElementById('new-image-button');
  const saveImage = document.getElementById('save-image-button');

  newImage.addEventListener('click', getNewImage);
  saveImage.addEventListener('click', saveCurrentImage);
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const memory = load();
  memory.forEach((item) => {
    const newTitle = document.createElement('h1');
    newTitle.appendChild(document.createTextNode(item.imgTitle));
    const content = document.body.querySelector('main');
    content.appendChild(newTitle);
    if (item.imgType === 'image') {
      const newImg = document.createElement('img');
      newImg.setAttribute('src', item.imgUrl);
      content.appendChild(newImg);
    } else {
      const newVid = document.createElement('iframe');
      newVid.setAttribute('src', item.imgUrl);
      content.appendChild(newVid);
    }
  });
}
