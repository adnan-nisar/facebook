
function toggleText(e) {
    e.preventDefault();

    let moreText = document.getElementById("moreText");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        e.target.innerText = "Show less";
    } else {
        moreText.style.display = "none";
        e.target.innerText = "Learn more.";
    }
}

function validateSignup(e) {
    const requiredInputs = document.querySelectorAll('.inputs input, .passwords input');
    for (let input of requiredInputs) {
        if (!input.value.trim()) {
            alert('All fields are required');
            return false;
        }
    }

    const gender = document.querySelector('input[name="sex"]:checked');
    if (!gender) {
        alert('All fields are required');
        return false;
    }

    return true;
}

const signupBtn = document.querySelector('.signupbtn');
if (signupBtn) {
    signupBtn.addEventListener('click', function (e) {
        if (!validateSignup()) {
            e.preventDefault();
        }
    });
}

