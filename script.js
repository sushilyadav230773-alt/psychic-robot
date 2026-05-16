const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("[data-page]");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navLinks");

const properties = [
  {
    title: "Skyline Apartment",
    city: "Pune",
    type: "Apartment",
    availability: "Buy",
    priceRange: "low",
    price: "₹92 Lakh",
    location: "Koregaon Park, Pune",
    beds: 3,
    baths: 2,
    area: "1,450 sq.ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
  },
  {
    title: "Luxury Villa",
    city: "Mumbai",
    type: "Villa",
    availability: "Buy",
    priceRange: "high",
    price: "₹3.2 Cr",
    location: "Bandra West, Mumbai",
    beds: 4,
    baths: 4,
    area: "3,200 sq.ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    title: "Corporate Office Space",
    city: "Bengaluru",
    type: "Office",
    availability: "Rent",
    priceRange: "mid",
    price: "₹1.5 Lakh / month",
    location: "Whitefield, Bengaluru",
    beds: 0,
    baths: 2,
    area: "2,000 sq.ft",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
  },
  {
    title: "Premium Bungalow",
    city: "Ahmedabad",
    type: "Villa",
    availability: "Buy",
    priceRange: "mid",
    price: "₹1.8 Cr",
    location: "Satellite, Ahmedabad",
    beds: 4,
    baths: 3,
    area: "2,600 sq.ft",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
  }
];

function showPage(pageId) {
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  navMenu.classList.remove("show");
}

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showPage(link.dataset.page);
  });
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

function renderListings() {
  const grid = document.getElementById("listingGrid");
  const city = document.getElementById("cityFilter").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;
  const availability = document.getElementById("availabilityFilter").value;
  const price = document.getElementById("priceFilter").value;

  const filtered = properties.filter(property => {
    return (
      (!city || property.city.toLowerCase().includes(city)) &&
      (!type || property.type === type) &&
      (!availability || property.availability === availability) &&
      (!price || property.priceRange === price)
    );
  });

  grid.innerHTML = filtered.map(property => `
    <article class="property-card">
      <img src="${property.image}" alt="${property.title}">
      <div>
        <h3>${property.title}</h3>
        <p>${property.location}</p>
        <strong>${property.price}</strong>
        <div class="features">
          ${property.beds ? property.beds + " Beds · " : ""}
          ${property.baths} Baths · ${property.area}
        </div>
        <button data-page="details">View Details</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("#listingGrid [data-page]").forEach(button => {
    button.addEventListener("click", () => showPage("details"));
  });
}

["cityFilter", "typeFilter", "availabilityFilter", "priceFilter"].forEach(id => {
  document.getElementById(id).addEventListener("input", renderListings);
});

document.querySelectorAll(".lead-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    alert("Thank you! RajRatan will contact you shortly.");
    form.reset();
  });
});

document.querySelector(".search-box").addEventListener("submit", event => {
  event.preventDefault();
  showPage("listings");
});

renderListings();