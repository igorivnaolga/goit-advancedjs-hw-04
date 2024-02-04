import{a as y,i as l,S as h}from"./assets/vendor-b52d9f5e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const b="https://pixabay.com/api",v="39768210-58261750239bfb23b413c7964";async function d(o,r){const s=`${b}/?key=${v}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${40}`,{data:e}=await y.get(s);return e}const i={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),jsGuard:document.querySelector(".js-guard")};let n=1,u="",$={root:null,rootMargin:"700px",threshold:1};const f=new IntersectionObserver(w,$);i.searchForm.addEventListener("submit",L);async function L(o){if(o.preventDefault(),n=1,i.gallery.innerHTML="",u=o.target.elements.searchQuery.value.trim(),o.target.reset(),!u){l.error({message:"Please enter your query."});return}try{const r=await d(u,n);S(r);const a=Math.ceil(r.totalHits/40);n>=a&&(f.unobserve(i.jsGuard),l.info({message:"We're sorry, but you've reached the end of search results."}))}catch(r){console.log(r)}}function S({hits:o,totalHits:r}){if(o.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again."});return}l.success({message:`Hooray! We found ${r} images.`}),m(o),f.observe(i.jsGuard)}async function w(o,r){o.forEach(async a=>{if(a.isIntersecting)try{n+=1;const{hits:s,totalHits:e}=await d(u,n);m(s);const t=Math.ceil(e/40);if(n>=t){r.unobserve(i.jsGuard),l.info({message:"We're sorry, but you've reached the end of search results."});return}}catch(s){console.log(s)}})}function m(o){const r=o.map(({largeImageURL:a,webformatURL:s,tags:e,likes:t,views:c,comments:g,downloads:p})=>`
    <div class="gallery-item">
    <a class="link" href="${a}">
            <div class="photo-card">
                 <img class="photo-img" src="${s}" alt="${e}" loading="lazy" />
                 <div class="info">
                     <p class="info-item">
                    <b>Likes:</b>  ${t}
                     </p>
                     <p class="info-item">
                    <b>Views:</b>  ${c}
                     </p>
                     <p class="info-item">
                     <b>Comments:</b> ${g}
                     </p>
                     <p class="info-item">
                     <b>Downloads:</b> ${p}
                     </p>
                </div>
             </div>
     </a>
     </div>`).join("");i.gallery.insertAdjacentHTML("beforeend",r),new h(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}
//# sourceMappingURL=commonHelpers.js.map
