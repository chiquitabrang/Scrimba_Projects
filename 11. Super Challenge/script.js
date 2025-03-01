import { propertyForSaleArr } from "./Properties/propertyForSaleArr.js";
import { placeholderPropertyObj } from "./Properties/placeholderPropertyObj.js";

function getPropertyHtml() {
  let properties = propertyForSaleArr;

  if (properties === undefined || properties.length === 0) {
    properties = [placeholderPropertyObj];
  }

  const getProperties = properties
    .map((property) => {
      const totalSquareMetres = property.roomsM2.reduce(
        (total, room) => total + room,
        0
      );

      return `
    <section class="card">
        <img src="/images/${property.image}" alt="Property Image" />
        <div class="card-right">
            <h2>${property.propertyLocation}</h2>
            <h3>${property.priceGBP}</h3>
            <p>${property.comment}</p>
            <h3>${totalSquareMetres} m&sup2;</h3>
        </div>
    </section> 
    `;
    })
    .join(" ");
  return getProperties;
}

document.getElementById("container").innerHTML = getPropertyHtml();
