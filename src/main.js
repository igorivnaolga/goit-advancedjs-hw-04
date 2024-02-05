import { searchImages } from './searchImages';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const selectors = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  jsGuard: document.querySelector('.js-guard'),
};

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;

// const perPage = 40;
let inputText = '';
let options = {
  root: null,
  rootMargin: '700px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoadMore, options);

selectors.searchForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(event) {
  event.preventDefault();
  page = 1;
  selectors.gallery.innerHTML = '';
  inputText = event.target.elements.searchQuery.value.trim();
  event.target.reset();
  if (!inputText) {
    iziToast.error({
      message: 'Please enter your query.',
    });
    return;
  }
  try {
    const data = await searchImages(inputText, page);

    searchGallery(data);

    // const totalPages = Math.ceil(data.totalHits / 40);

    // if (page >= totalPages) {
    //   observer.unobserve(selectors.jsGuard);
    //   iziToast.info({
    //     message: "We're sorry, but you've reached the end of search results.",
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
}

function searchGallery({ hits, totalHits }) {
  if (hits.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });
    return;
  }
  iziToast.success({
    message: `Hooray! We found ${totalHits} images.`,
  });

  renderMarkup(hits);
  gallery.refresh();
  observer.observe(selectors.jsGuard);
}
async function onLoadMore(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      try {
        page += 1;
        const { hits, totalHits } = await searchImages(inputText, page);
        renderMarkup(hits);
        gallery.refresh();

        const totalPages = Math.ceil(totalHits / 40);
        if (page >= totalPages) {
          observer.unobserve(selectors.jsGuard);
          iziToast.info({
            message:
              "We're sorry, but you've reached the end of search results.",
          });

          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function renderMarkup(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="gallery-item">
    <a class="link" href="${largeImageURL}">
            <div class="photo-card">
                 <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                 <div class="info">
                     <p class="info-item">
                    <b>Likes:</b>  ${likes}
                     </p>
                     <p class="info-item">
                    <b>Views:</b>  ${views}
                     </p>
                     <p class="info-item">
                     <b>Comments:</b> ${comments}
                     </p>
                     <p class="info-item">
                     <b>Downloads:</b> ${downloads}
                     </p>
                </div>
             </div>
     </a>
     </div>`
    )
    .join('');

  selectors.gallery.insertAdjacentHTML('beforeend', markup);
}
