/**
 * A webpage to check status on completeting your gear collection.
 *
 * @author ranidspace
 * @since 1.3.0
 */

async function submit() {
  //clear all data on the page
  document.getElementById("output").innerHTML = "";
  // Constants
  const info = await getData();

  // get data from the provided geardata file
  new Response(document.getElementById("geardata").files[0]).json().then(
    (userGear) => {
      const output = document.getElementById("output");

      //prepping html for missing gear
      let misDiv = document.createElement("details");
      let misTitle = document.createElement("summary");
      let misContainer = document.createElement("div");

      misDiv.className = "toggle";
      misDiv.open = true;

      misTitle.className = "lbl-toggle";
      misTitle.textContent = "Missing Gear";

      misContainer.className = "gear-container";

      misDiv.appendChild(misTitle);
      misDiv.appendChild(misContainer);
      output.appendChild(misDiv);

      // Print version to console
      console.log(
        "The current splatoon version is " +
          info.ver.substr(0, 1) +
          "." +
          info.ver.substr(1, 1) +
          "." +
          info.ver.substr(2, 1)
      );

      // Display all missing gear
      let missing = missingGear(info, userGear);
      displayGear(info, missing, misContainer);

      output.appendChild(document.createElement("hr"));

      // Loop through 0-5 stars and find the gear for each
      for (let i = 0; i <= 5; i++) {
        let starDiv = document.createElement("details");
        let starTitle = document.createElement("summary");
        let starContainer = document.createElement("div");

        starDiv.className = "toggle";
        starDiv.open = true;

        starTitle.className = "lbl-toggle";
        starTitle.textContent = i + " Star Gear";

        starContainer.className = "gear-container collapsible-content";

        starCount(info, userGear, i, starContainer);

        starDiv.appendChild(starTitle);
        starDiv.appendChild(starContainer);
        output.appendChild(starDiv);

        if (i != 5) {
          output.appendChild(document.createElement("hr"));
        }
      }
    },
    (err) => {
      console.log(err);
    }
  );
}
/**
 * Return info from Lean's Database
 */
async function getData() {
  const BASE_URL = "https://raw.githubusercontent.com/Leanny/splat3/main/";
  const verPromise = await jfetch(BASE_URL + "versions.json");
  const ver = await verPromise.at(-1);

  const links = await Promise.all([
    jfetch(BASE_URL + `data/mush/${ver}/GearInfoHead.json`),
    jfetch(BASE_URL + `data/mush/${ver}/GearInfoClothes.json`),
    jfetch(BASE_URL + `data/mush/${ver}/GearInfoShoes.json`),
    jfetch(BASE_URL + "data/language/USen.json"),
  ]);
  const gearInfo = [links[0], links[1], links[2]];
  const lang = links[3];
  return { ver: ver, gear: gearInfo, lang: lang };
}

/**
 * @param {string} url - The url the json is fetched from.
 * @returns {Object} The fetched json data.
 */
async function jfetch(url) {
  const response = await fetch(url);
  return response.json();
}

/**
 * Finds which gear is missing.
 *
 * @param {Object} info - Info downloaded from database
 * @param {Object} gearList - User's gear list
 *
 * @returns {Object[]}
 */
function missingGear(info, gearList) {
  const gear = ["head", "clothing", "shoes"];
  let output = new Array();

  for (let i = 0; i < 3; i++) {
    const path = gearList.gear.data[gear[i] + "Gears"].nodes;
    const jsonlistunfiltered = info.gear[i];

    let jsonlist = [];
    // TODO: improve performace. apparently for loops are faster than filtering.
    // idk, nothing seems to work
    jsonlist = jsonlistunfiltered.filter(
      (x) =>
        !(
          x.HowToGet === "Impossible" ||
          x.Season > info.ver.substring(0, 1) ||
          x.__RowId === "Clt_HAP001"
        )
    );
    output.push(
      jsonlist.filter(
        (entry1) =>
          !path.some((entry2) => entry1.Id === entry2[gear[i] + "GearId"])
      )
    );
  }
  return output;
}

/**
 * Creates the divs which the missing gear is shown
 *
 * @param info - Info downloaded from database.
 * @param {Object[]} missing - Array of missing gear by type.
 * @param {HTMLElement} div - Div that the gear will be appended to.
 */
function displayGear(info, missing, div) {
  const BASE_URL = "https://raw.githubusercontent.com/Leanny/splat3/main/";
  const gearTypes = ["Head", "Clothes", "Shoes"];

  for (j = 0; j < 3; j++) {
    // loop over every item
    const gearType = gearTypes[j];
    const diff = missing[j];

    // Each loop creates a single entry
    for (i = 0; i < diff.length; i++) {
      const image = BASE_URL + `/images/gear/${diff[i].__RowId}.png`;
      const name =
        info.lang["CommonMsg/Gear/GearName_" + gearType][
          diff[i].__RowId.substr(4)
        ];

      let item = makeItem(image, name);

      // Add classes based on what kind of item
      if (
        diff[i].__RowId.substr(4, 3) === "AMB" ||
        (diff[i].__RowId.substr(4, 3) === "MSN" &&
          diff[i].HowToGet === "Other")
      ) {
        item.classList.add("amiiboitem");
      }

      if (diff[i].HowToGet === "Uroko") {
        item.classList.add("urokoitem");
      }

      div.appendChild(item);
    }
  }
}

/**
 * Displays the owned gear at each star level
 *
 * @param info - Info downloaded from database.
 * @param gearlist
 * @param {number} stars - The number of stars the gear has.
 * @param {HTMLElement} div - The container the gear will be appended to
 */
async function starCount(gearlist, stars, div) {
  const gearTypes = ["head", "clothing", "shoes"];

  // loop for each type of gear
  for (let j = 0; j < 3; j++) {
    const userGear = gearlist.gear.data[gearTypes[j] + "Gears"].nodes;

    // loop over all items
    for (let i = 0; i < userGear.length; i++) {
      if (userGear[i].rarity === stars) {
        const image = userGear[i].image.url;
        const name = userGear[i].name;

        let item = makeItem(image, name);
        div.appendChild(item);
      }
    }
  }
}

/**
 * Creates an item with an image and label
 *
 * @param {string} image - URL of the image.
 * @param {string} name - Name of the item.
 */
function makeItem(image, name) {
  let par = document.createElement("div");
  let img = document.createElement("img");
  let lbl = document.createElement("span");

  par.className = "item";

  img.src = image;
  img.alt = name;

  lbl.className = "gearname";
  lbl.textContent = name;

  par.appendChild(img);
  par.appendChild(lbl);
  return par;
}

/**
 * Toggles theme on the page.
 */
function changetheme() {
  let currentThemeSetting = document
    .querySelector("html")
    .getAttribute("data-theme");
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  document.querySelector("html").setAttribute("data-theme", newTheme);

  currentThemeSetting = newTheme;
}

/**
 * Checks if user prefers dark mode, or if they have selected dark mode before.
 */
function loadpage() {
  switch (localStorage.getItem("theme")) {
    case null:
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        changetheme();
      } else {
        break;
      }
      break;
    case "dark":
      changetheme();
      break;
    default:
      break;
  }
}
