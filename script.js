let input = document.querySelector(".search-box input")
let btn = document.querySelector(".btn button")
let images = document.querySelector(".images")
let load = document.querySelector("#load")
// let download = document.querySelector(".download")

const accessKey = "g4n-279a0iAHP8xM_cv9XaKJLID3qLo_X8GNaLjIvmw"
let page = 1;
let keyword = ""

const download = (url) => {
    // console.log(url);
    fetch(url).then(res => res.blob()).then(file => {
        let a = document.createElement("a")
        a.href = URL.createObjectURL(file)
        a.download = new Date().getTime()
        a.click()
    }).catch(() => alert("failed to download"))
}

const getResponse = async () => {
    keyword = input.value;
    let url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    let response = await fetch(url)
    let data = await response.json()
    // console.log(data);
    let results = data.results;
    if (page == 1) {
        images.innerHTML = ""
    }
    load.style.display = "block";
    results.map((elem) => {
        let li = document.createElement("li");
        li.classList.add("image")
        let html = `<img src="${elem.preview_photos[0].urls.small}" alt="image" class="photo">
        <div class = "details">
        <div class = "user">
        <img src = "camera.svg" alt = "image">
        <span>${elem.title}</span>
        </div>
        <div class="download" onclick = download('${elem.preview_photos[0].urls.small}')>
        <img src = "download.svg" alt = "img">
        </div>
        </div>`
        li.innerHTML = html;
        images.appendChild(li)
    })
}
btn.addEventListener("keyup", (e) => {
    page = 1;
    if (e.key == "Enter") {
        getResponse()
    }
})
btn.addEventListener("click", () => {
    page = 1;
    getResponse()
})
load.addEventListener("click", () => {
    page++;
    getResponse()
})