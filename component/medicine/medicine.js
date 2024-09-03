let medicinesData = [];

// Check localStorage for medicines data
if (localStorage.getItem("medicinesData")) {
  medicinesData = JSON.parse(localStorage.getItem("medicinesData"));
  insertMedicines("medicines-container", medicinesData);
} else {
  fetch("medicines.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      medicinesData = data;
      localStorage.setItem("medicinesData", JSON.stringify(medicinesData));
      insertMedicines("medicines-container", medicinesData);
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });
}

// Function to generate HTML for each medicine
// Function to generate HTML for each medicine
function generateMedicines(medicines) {
  return medicines
    .map(
      (medicine) => `
            <div class="medi">
                <img src="${medicine["Image URL"]}" alt="${medicine.Name}" />
                <div class="details">
                    <p class="mediname">${medicine.Name} <span>${medicine.Dosage}</span></p>
                    <div class="priceAndButton">
                        <p class="price">Rs.${medicine["Price (NPR)"]}</p>
                        <button class="add" id="add">Add</button>
                    </div>
                </div>
            </div>
        `
    )
    .join("");
}

// Function to insert generated HTML into the container
function insertMedicines(containerId, medicinesData) {
  document.getElementById(containerId).innerHTML =
    generateMedicines(medicinesData);
}
