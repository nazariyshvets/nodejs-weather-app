const weatherForm = document.querySelector("form");
const weatherLocationInput = document.querySelector("input");
const clfBtn = document.querySelector("#clf-btn");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const fetchAndDisplayForecast = async (qs) => {
  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  try {
    const response = await fetch(`http://localhost:8000/weather?${qs}`);
    const data = await response.json();

    messageTwo.innerHTML =
      data.error || `${data.location}<br/>${data.forecast}`;
  } catch (error) {
    messageTwo.textContent = error;
  } finally {
    messageOne.textContent = "";
  }
};

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetchAndDisplayForecast(`address=${weatherLocationInput.value}`);
});

clfBtn.addEventListener("click", async () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by the browser");
  }

  navigator.geolocation.getCurrentPosition((position) =>
    fetchAndDisplayForecast(
      `latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
    ),
  );
});
