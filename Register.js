
function toggleText(e) {
    e.preventDefault(); // stop page reload

    let moreText = document.getElementById("moreText");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        e.target.innerText = "Show less";
    } else {
        moreText.style.display = "none";
        e.target.innerText = "Learn more.";
    }
}
