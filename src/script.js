document.addEventListener("DOMContentLoaded", () => {
    const name = document.getElementById("name");
    const age = document.getElementById("age");
    const gender = document.getElementById("gender");
    const submitbtn = document.getElementById("submit-btn");
    const username = document.getElementById("username");
    const userIcon = document.getElementById("avatar");
    const login = document.getElementById("login");
    const maincontent = document.getElementById("content");
    const logout = document.getElementById("username");
    const randomUserGetBtn = document.getElementById("random-user-get");
    const randomUserName = document.getElementById("random-user-name");
    const randomUserAge = document.getElementById("random-user-age");
    const randomUseremail = document.getElementById("random-user-email");
    const randomUserImage = document.getElementById("random-user-image");
    const quotecontent = document.getElementById("quotes");
    const writer = document.getElementById("author");
    const motivateBtn = document.getElementById("Motivate");
    const jokes = document.getElementById("jokes");
    const jokesBtn = document.getElementById("haha-btn");
    render();
    contentrender();
    submitbtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!name.value) return;
        const user = {
            username: name.value,
            age: age.value,
            gender: gender.value,
            isloggedin : true,
        }
        localStorage.setItem("user", JSON.stringify(user));
        render();
    })
    randomUserGetBtn.addEventListener("click", async() => {
    const url = 'https://api.freeapi.app/api/v1/public/randomusers/user/random';
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
      const response = await fetch(url, options);
      const data = await response.json();
        const randomUser = {
            name: `${data.data.name.title} ${data.data.name.first} ${data.data.name.last}`,
            age: data.data.dob.age,
            email:`${data.data.email}`,
            img: data.data.picture.large,
        }
        localStorage.setItem("randomUser", JSON.stringify(randomUser));
        contentrender();
    } catch (error) {
    console.error(error);
    }
    })
    motivateBtn.addEventListener("click", async() => {
    const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const quotes = {
            quote: data.data.content,
            author:data.data.author,
        }
        localStorage.setItem("quotes", JSON.stringify(quotes));
        contentrender();
    } catch (error) {
        console.error(error);
    }
    })
    jokesBtn.addEventListener("click", async()=>{
    const url = 'https://api.freeapi.app/api/v1/public/randomjokes/joke/random';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        localStorage.setItem("jokes", JSON.stringify(data.data.content));
        contentrender();
    } catch (error) {
        console.error(error);
    }
    })
    function contentrender() {
        const user = JSON.parse(localStorage.getItem("randomUser"));
        if (!user) return;
        randomUserName.innerHTML = `Name: ${user.name}`;
        randomUserAge.innerHTML = `Age: ${user.age}`;
        randomUseremail.innerHTML = `Email: ${user.email}`;
        randomUserImage.src = user.img;
        const quotes = JSON.parse(localStorage.getItem("quotes"));
        if (!quotes) return;
        quotecontent.innerHTML = quotes.quote;
        writer.innerHTML = `-- ${quotes.author}`;
        const joke = JSON.parse(localStorage.getItem("jokes"));
        if (!joke) return;
        jokes.innerHTML = joke;
    }
    function render() {
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user) return;
        username.innerHTML = user.username;
        if (user.age == "child" && user.gender == "male") {
            userIcon.src = "./assets/boy.png";
            userIcon.alt = "Boy"
        }
        if (user.age == "adult" && user.gender == "male") {
            userIcon.src = "./assets/male.png";
            userIcon.alt = "Men";
        }
        if (user.age == "child" && user.gender == "female") {
            userIcon.src = "./assets/girl.png";
            userIcon.alt = "Girl";
        }
        if (user.age == "adult" && user.gender == "female") {
            userIcon.src = "./assets/women.png";
            userIcon.alt = "Woman";
        }
        login.classList.add("hidden");
        maincontent.classList.remove("hidden");
        randomUserGetBtn.click();
        motivateBtn.click();
        jokesBtn.click();
        name.value = "";
    }
    logout.addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
    })

})