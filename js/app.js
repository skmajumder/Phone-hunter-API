"use strict";

const loadPhone = async (brand) => {
  const apiUrl = `https://openapi.programming-hero.com/api/phones?search=${brand}`
  const res = await fetch(apiUrl);
  const data = await res.json();
  displayPhone(data.data);
};

const displayPhone = (phones) => {
  const cardContainer = document.getElementById("card-container");
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
  });
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
  document.getElementById('phone-img').src = info.image
  document.getElementById('phone-img').alt = info.name
  document.getElementById('storage').innerText = info.mainFeatures.storage
  document.getElementById('displaySize').innerText = info.mainFeatures.displaySize
  document.getElementById('memory').innerText = info.mainFeatures.memory
  document.getElementById('chipSet').innerText = info.mainFeatures.chipSet
};

loadPhone('apple');
