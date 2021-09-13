const baseUrl = "http://numbersapi.com/";
const favNumForm = document.querySelector("#fav-num-form");
const otherNumsForm = document.querySelector("#other-nums-form");
const favNumUl = document.querySelector("#fav-num-facts");
const otherNumsUl = document.querySelector("#other-nums-facts");

favNumForm.addEventListener("submit", async e => {
    e.preventDefault();
    const favNum = favNumForm.querySelector("input").value;
    const promises = [];
    for (let i = 0; i < 4; i++) {
        promises.push(axios.get(baseUrl + favNum + "?json"));
    }
    try {
        const resps = await Promise.all(promises);
        favNumUl.innerHTML = "";
        for (const res of resps) {
            favNumUl.innerHTML += `<li>${res.data.text}</li>`;
        }
    } catch (err) {
        console.error(err);
    }
});

otherNumsForm.addEventListener("submit", async e => {
    e.preventDefault();
    const startNum = otherNumsForm.querySelector("#start-num").value;
    const endNum = otherNumsForm.querySelector("#end-num").value;
    const otherNum = otherNumsForm.querySelector("#other-num").value;
    try {
        const res = await axios.get(`${baseUrl}${startNum}..${endNum},${otherNum}?json`);
        otherNumsUl.innerHTML = "";
        for (const k in res.data) {
            otherNumsUl.innerHTML += `<li>${res.data[k]}</li>`;
        }
    } catch (err) {
        console.error(err);
    }
});
