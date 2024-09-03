let userCredentials = [];

// Fetch user credentials from localStorage or JSON file
if (localStorage.getItem("userCredentials")) {
  userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
} else {
  fetch("userCredentials.json")
    .then((response) => response.json())
    .then((data) => {
      userCredentials = data.users; // Access the "users" array from the JSON data
      localStorage.setItem("userCredentials", JSON.stringify(userCredentials)); // Store it in localStorage
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });
}

// Sign in logic
if (document.getElementById("loginForm")) {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let username = document.getElementById("loginUser").value;
      let password = document.getElementById("loginPassword").value;

      const user = userCredentials.find(
        (credential) =>
          credential.username === username && credential.password === password
      );

      if (user) {
        window.location.href = "../home.html"; // Redirect to home page
      } else {
        alert("Invalid username or password.");
      }
    });
}

// Sign up logic
if (document.getElementById("signupForm")) {
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("name").value;
      let username = document.getElementById("signupUser").value;
      let password = document.getElementById("signupPassword").value;
      let address = document.getElementById("address").value;

      const existingUser = userCredentials.find(
        (user) => user.username === username
      );

      if (existingUser) {
        alert("Username already exists. Please choose a different username.");
        return;
      }

      const newUser = {
        username: username,
        password: password,
        role: "customer",
        name: name,
        address: address,
      };

      userCredentials.push(newUser);
      localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
      alert("Sign up successful! You can now sign in.");

      document.getElementById("signupForm").reset();
      window.location.href = "signin.html";
    });
}
