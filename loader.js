window.addEventListener("load", function finishPreload() {
    this.setTimeout(()=>{
      //hiding the loader
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    //stoping the  bounce loading animation
    const bounce = document.querySelectorAll(".spinner div");
    bounce.forEach((bubble) => {
        bubble.classList.remove("loading-active");
    });
    },300)

    // add spotify styles
    const playlist = document.querySelector('.playlist')
    playlist.innerHTML='<iframe style="border-radius: 12px" src="https://open.spotify.com/embed/playlist/4hzJm43Xdr3MG8NwIOdmbJ?utm_source=generator&theme=0" width="100%" height="100%" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" ></iframe>'





});
// const loader = document.querySelector(".loader");
//     loader.classList.add("loader-hidden");
//     //stoping the  bounce loading animation
//     const bounce = document.querySelectorAll(".spinner div");
//     bounce.forEach((bubble) => {
//         bubble.classList.remove("loading-active");
//     });

// document
//     .querySelector(".clickable")
//     .addEventListener("click", function preload() {
//         //bringing back the loader
//         const loader = document.querySelector(".loader");
//         loader.classList.remove("loader-hidden");
//         //adding bounce loading animation
//         const bounce = document.querySelectorAll(".spinner div");
//         bounce.forEach((bubble) => {
//             bubble.classList.add("loading-active");
//         });
//     });