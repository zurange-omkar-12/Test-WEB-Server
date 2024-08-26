var inputB = document.getElementById("inputB");
var inputA = document.getElementById("inputA");
var inputC = document.getElementById("inputC");

document.addEventListener("DOMContentLoaded", function () {
  const dropdownA = document.getElementById("dropdownA");
  let selectedLocations = [];

  // Function to filter and sort the dropdown list
  function filterAndSortList(query) {
    const listItems = Array.from(dropdownA.querySelectorAll("li"));

    let hasVisibleItems = false;

    listItems.forEach((li) => {
      const text = li.textContent.toLowerCase();
      if (text.includes(query) && !selectedLocations.includes(li.textContent)) {
        li.style.display = "block";
        hasVisibleItems = true;
      } else {
        li.style.display = "none";
      }
    });

    if (!hasVisibleItems) {
      dropdownA.style.display = "none";
    } else {
      // Sort the items: first those that start with the query, then those that contain it
      const visibleItems = listItems.filter(
        (li) => li.style.display === "block"
      );
      visibleItems.sort((a, b) => {
        const aStartsWith = a.textContent.toLowerCase().startsWith(query);
        const bStartsWith = b.textContent.toLowerCase().startsWith(query);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return a.textContent.localeCompare(b.textContent);
      });

      // Append sorted items back to the dropdown
      visibleItems.forEach((li) => dropdownA.appendChild(li));
    }
  }

  // Event listener for input field
  inputA.addEventListener("input", function () {
    const query = inputA.value.split(",").pop().trim().toLowerCase();
    filterAndSortList(query);

    if (query && dropdownA.querySelector('li[style*="block"]')) {
      dropdownA.style.display = "block";
    } else {
      dropdownA.style.display = "none";
    }
  });

  // Event listener for backspace to remove selected items
  inputA.addEventListener("keydown", function (e) {
    if (e.key === "Backspace" && inputA.value.endsWith(",")) {
      e.preventDefault();
      selectedLocations.pop();
      inputA.value =
        selectedLocations.join(",") + (selectedLocations.length > 0 ? "," : "");
      filterAndSortList("");
    }
  });

  // Event listener for dropdown items
  dropdownA.addEventListener("click", function (e) {
    if (e.target.tagName === "LI" && selectedLocations.length < 2) {
      const selectedValue = e.target.textContent.trim();

      if (!selectedLocations.includes(selectedValue)) {
        selectedLocations.push(selectedValue);
        inputA.value = selectedLocations.join(",") + ",";
      }

      dropdownA.style.display = "none";
      inputA.focus();
    }
  });

  // Prevent dropdown from hiding on input focus
  inputA.addEventListener("focus", function () {
    const query = inputA.value.split(",").pop().trim().toLowerCase();
    filterAndSortList(query);

    if (query && dropdownA.querySelector('li[style*="block"]')) {
      dropdownA.style.display = "block";
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown-container")) {
      dropdownA.style.display = "none";
    }
  });

  // Prevent the dropdown from closing when interacting with it
  dropdownA.addEventListener("mousedown", function (e) {
    e.preventDefault(); // Prevents input from losing focus when clicking on the dropdown
  });

  // --------------------------------------------------------------------//

  // For Experience Dropdown

  var dropdownB = document.getElementById("dropdownB");

  // Toggle dropdown on input click
  inputB.addEventListener("click", function () {
    dropdownB.style.display =
      dropdownB.style.display === "block" ? "none" : "block";
  });

  // Hide dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("#dropdown-container1")) {
      dropdownB.style.display = "none";
    }
  });

  // Set input value and hide dropdown when an option is clicked
  var dropdownItemsB = dropdownB.getElementsByTagName("li");
  for (var i = 0; i < dropdownItemsB.length; i++) {
    dropdownItemsB[i].addEventListener("click", function () {
      console.log(this.textContent);

      inputB.value = this.textContent;
      dropdownB.style.display = "none";
    });
  }

  //--------------------------------------------------------------------------------//

  // For Location Dropdown

  var dropdownC = document.getElementById("dropdownC");

  // Toggle dropdown on input click
  inputC.addEventListener("click", function () {
    dropdownC.style.display =
      dropdownC.style.display === "block" ? "none" : "block";
  });

  // Hide dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("#dropdown-container2")) {
      dropdownC.style.display = "none";
    }
  });

  // Set input value and hide dropdown when an option is clicked
  var dropdownItemsLocation = dropdownC.getElementsByTagName("li");
  for (var i = 0; i < dropdownItemsLocation.length; i++) {
    dropdownItemsLocation[i].addEventListener("click", function () {
      console.log(this.textContent);

      inputC.value = this.textContent;
      dropdownC.style.display = "none";
    });
  }

  //   function checkInputs() {
  //     if (inputA.value && inputB.value && inputC.value) {
  //         submitBtn.disabled = false;
  //     } else {
  //         submitBtn.disabled = true;
  //     }
  // }

  // --------------------------------------------------------------//
});

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$//

function redirectToFilter() {
  console.log("Clicked Submit");

  // const selectedinputBValue = parseInt(
  //   document.getElementById("inputB").value
  // );
  const selectedinputA = inputA.value || "";
  const selectedinputB = inputB.value || "";
  const selectedinputC = inputC.value || "";

  //console.log(selectedinputA);
  //debugger;
  console.log(selectedinputB);
  debugger;
  //console.log(selectedinputC);
  //debugger;

  window.location.href = `/filter?jobSkills=${selectedinputA}&jobExperience=${selectedinputB}&jobLocation=${selectedinputC}`;

  // //For experience
  // if (!isNaN(selectedinputC)) {
  //   window.location.href = "/filter?jobLocation=" + selectedinputC;
  // } else {
  //   window.location.href = "/filter?jobLocation=" + selectedinputC;
  // }
}

function getRequiredPage(reqPage, curPage) {
  console.log("reqpage");

  //console.log(window.location.href);

  currentURL = window.location.href;
  const urlIndexofPage = currentURL.indexOf("page=");
  const urlIndexofjobLocation = currentURL.indexOf("jobLocation=");

  if (urlIndexofjobLocation !== -1) {
    if (urlIndexofPage !== -1) {
      const urlUpToPage = currentURL.substring(0, urlIndexofPage + 5);
      window.location.href = urlUpToPage + reqPage;
    } else {
      window.location.href = window.location.href + "&page=" + reqPage;
    }
  } else {
    if (currentURL.indexOf("page=") !== -1) {
      const urlUpToPageA = currentURL.substring(0, urlIndexofPage + 5);
      window.location.href = urlUpToPageA + reqPage;
    } else {
      window.location.href = window.location.href + "?page=" + reqPage;
    }
  }

  // if (
  //   inputB.value === "" &&
  //   inputA.value === "" &&
  //   inputLoction.value === ""
  // ) {
  //   console.log("reqpage2");
  //   window.location.href = window.location.href+"&page=" + reqPage;
  // }
}

function handleSubmit() {
  let isValid = true;

  console.log(isValid);

  if (!inputB.value) {
    inputB.classList.remove("inputB");
    inputB.style.borderColor = "red";
    inputB.placeholder = "Please select experience";
    isValid = false;
  } else {
    inputA.style.borderColor = ""; // Reset border color
  }

  if (!inputC.value) {
    inputC.classList.remove("inputC");
    inputC.style.borderColor = "red";
    inputC.placeholder = "Please enter location";
    isValid = false;
  } else {
    inputA.style.borderColor = ""; // Reset border color
  }

  // If all inputs are filled, call redirectToFilter()
  if (isValid) {
    redirectToFilter();
  }

  console.log(isValid);
}

inputB.addEventListener("input", () => {
  inputB.style.borderColor = "";
  inputB.placeholder = "Select experience";
});

inputC.addEventListener("input", () => {
  inputC.style.borderColor = "";
  inputC.placeholder = "Enter location";
});
