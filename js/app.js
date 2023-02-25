"use strict";

// Get elements
const showAllSection = document.getElementById("section-show-all");

const toggleSpinner = (isLoading) => {
  const sectionSpinnerEl = document.getElementById("section-spinner");
  if (isLoading) {
    sectionSpinnerEl.classList.remove("d-none");
  } else {
    sectionSpinnerEl.classList.add("d-none");
  }
};

const processSearch = (dataLimit) => {
  const searchField = document.getElementById("search-field");
  const value = searchField.value;
  if (value.length < 3) {
    alert("At last need 3 char for search");
    toggleSpinner(false);
  } else {
    toggleSpinner(true);
    loadPhone(value, dataLimit);
  }
};

const loadPhone = async (brand, dataLimit) => {
  const apiUrl = `https://openapi.programming-hero.com/api/phones?search=${brand}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const cardContainer = document.getElementById("card-container");
  const errorMessage = document.getElementById("error-message");
  if (phones.length === 0) {
    errorMessage.classList.remove("d-none");
    toggleSpinner(false);
    cardContainer.innerHTML = "";
    showAllSection.classList.add("d-none");
  } else {
    errorMessage.classList.add("d-none");
    cardContainer.innerHTML = "";

    // Display 9 phone only
    if (dataLimit && phones.length > 9) {
      phones = phones.slice(0, 9);
      showAllSection.classList.remove("d-none");
    } else {
      showAllSection.classList.add("d-none");
    }

    phones.forEach((phone) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("col", "mb-3");
      cardDiv.innerHTML = `
        <div class="card h-100">
            <div class="text-center p-3">
                <img src="${phone.image}" class="card-img-top phone-img" alt="${phone.phone_name}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <!-- Button trigger modal -->
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">
                    Details
                </button>
            </div>
        </div>
      `;
      cardContainer.appendChild(cardDiv);
      // Stop loader
    });
  }
  toggleSpinner(false);
};

const loadPhoneDetails = async (slug) => {
  const apiSearchUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
  const apiResponse = await fetch(apiSearchUrl);
  const phoneDetails = await apiResponse.json();
  displayPhoneDetails(phoneDetails.data);
};

const displayPhoneDetails = (info) => {
  console.log(info);
  document.getElementById("phoneModalLabel").innerText = info.name;
  document.getElementById("phone-img").src = info.image;
  document.getElementById("phone-img").alt = info.name;
  document.getElementById("storage").innerText = info.mainFeatures.storage;
  document.getElementById("displaySize").innerText =
    info.mainFeatures.displaySize;
  document.getElementById("memory").innerText = info.mainFeatures.memory;
  document.getElementById("chipSet").innerText = info.mainFeatures.chipSet;
};

// Search Button
const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", function () {
  processSearch(10);
});

// Search field enter event
document.getElementById("search-field").addEventListener("keyup", function (e) {
  if ((e.key === "Enter")) {
    processSearch(10);
  }
});

// Show All btn
const btnShowAll = document.getElementById("btn-show-all");
btnShowAll.addEventListener("click", function () {
  processSearch();
});

// loadPhone("iphone");
