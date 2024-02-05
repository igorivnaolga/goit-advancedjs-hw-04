import{a as y,S as h,i as u}from"./assets/vendor-b52d9f5e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const b="https://pixabay.com/api",v="39768210-58261750239bfb23b413c7964";async function f(o,r){const s=`${b}/?key=${v}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${40}`,{data:e}=await y.get(s);return e}const c={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),jsGuard:document.querySelector(".js-guard")};let d=new h(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),i=1,l="",$={root:null,rootMargin:"700px",threshold:1};const L=new IntersectionObserver(q,$);c.searchForm.addEventListener("submit",S);async function S(o){if(o.preventDefault(),i=1,c.gallery.innerHTML="",l=o.target.elements.searchQuery.value.trim(),o.target.reset(),!l){u.error({message:"Please enter your query."});return}try{const r=await f(l,i);w(r)}catch(r){console.log(r)}}function w({hits:o,totalHits:r}){if(o.length===0){u.error({message:"Sorry, there are no images matching your search query. Please try again."});return}u.success({message:`Hooray! We found ${r} images.`}),m(o),d.refresh(),L.observe(c.jsGuard)}async function q(o,r){o.forEach(async a=>{if(a.isIntersecting)try{i+=1;const{hits:s,totalHits:e}=await f(l,i);m(s),d.refresh();const t=Math.ceil(e/40);if(i>=t){r.unobserve(c.jsGuard),u.info({message:"We're sorry, but you've reached the end of search results."});return}}catch(s){console.log(s)}})}function m(o){const r=o.map(({largeImageURL:a,webformatURL:s,tags:e,likes:t,views:n,comments:p,downloads:g})=>`
    <div class="gallery-item">
    <a class="link" href="${a}">
            <div class="photo-card">
                 <img class="photo-img" src="${s}" alt="${e}" loading="lazy" />
                 <div class="info">
                     <p class="info-item">
                    <b>Likes:</b>  ${t}
                     </p>
                     <p class="info-item">
                    <b>Views:</b>  ${n}
                     </p>
                     <p class="info-item">
                     <b>Comments:</b> ${p}
                     </p>
                     <p class="info-item">
                     <b>Downloads:</b> ${g}
                     </p>
                </div>
             </div>
     </a>
     </div>`).join("");c.gallery.insertAdjacentHTML("beforeend",r)}
//# sourceMappingURL=commonHelpers.js.map
