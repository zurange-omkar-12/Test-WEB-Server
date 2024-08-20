document.addEventListener("DOMContentLoaded", function () {
  async function getJobLocations() {
    try {
      const response = await fetch("/getJobLocation", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  getJobLocations();

  // For Skills Dropdown

  var dropdownInputSkills = document.getElementById("inputLoction");
  var dropdownMenuSkills = document.getElementById("dropdownMenuinputLoction");

  // Toggle dropdown on input click
  dropdownInputSkills.addEventListener("click", function () {
    dropdownMenuSkills.style.display =
      dropdownMenuSkills.style.display === "block" ? "none" : "block";
  });

  // Hide dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("#dropdown-container2")) {
      dropdownMenuSkills.style.display = "none";
    }
  });

  // Set input value and hide dropdown when an option is clicked
  var dropdownItemsExperience = dropdownMenuSkills.getElementsByTagName("li");
  for (var i = 0; i < dropdownItemsExperience.length; i++) {
    dropdownItemsExperience[i].addEventListener("click", function () {
      console.log(this.textContent);

      dropdownInputSkills.value = this.textContent;
      dropdownMenuSkills.style.display = "none";
    });
  }

  // For Experience Dropdown

  var dropdownInputExperience = document.getElementById("inputExperience");
  var dropdownMenuExperience = document.getElementById("dropdownMenu");

  // Toggle dropdown on input click
  dropdownInputExperience.addEventListener("click", function () {
    dropdownMenuExperience.style.display =
      dropdownMenuExperience.style.display === "block" ? "none" : "block";
  });

  // Hide dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("#dropdown-container1")) {
      dropdownMenuExperience.style.display = "none";
    }
  });

  // Set input value and hide dropdown when an option is clicked
  var dropdownItemsExperience =
    dropdownMenuExperience.getElementsByTagName("li");
  for (var i = 0; i < dropdownItemsExperience.length; i++) {
    dropdownItemsExperience[i].addEventListener("click", function () {
      console.log(this.textContent);

      dropdownInputExperience.value = this.textContent;
      dropdownMenuExperience.style.display = "none";
    });
  }
});

function redirectToFilter() {
  console.log("Clicked Submit");

  // const selectedinputExperienceValue = parseInt(
  //   document.getElementById("inputExperience").value
  // );
  const selectedinputLoction = document.getElementById("inputLoction").value;

  //For experience
  if (!isNaN(selectedinputLoction)) {
    window.location.href = "/filter?jobLocation=" + selectedinputLoction;
  } else {
    window.location.href = "/filter?jobLocation=" + selectedinputLoction;
  }
}

function getRequiredPage(reqPage) {
  console.log("reqpage");

  var inputExperience = document.getElementById("inputExperience");
  var inputSkills = document.getElementById("inputSkills");
  var inputLoction = document.getElementById("inputLoction");

  if (
    inputExperience.value === "" &&
    inputSkills.value === "" &&
    inputLoction.value === ""
  ) {
    console.log("reqpage2");
    window.location.href = "/?page=" + reqPage;
  }
}

// async function mainFilter() {

//   console.log("working");

//   const experienceName = document.getElementById('dropdownInput').value;

//   let experienceNameInt = parseInt(experienceName);

//   console.log(parseInt(experienceName));

//   try {

//     const

//   } catch (error) {

//   }

// }
