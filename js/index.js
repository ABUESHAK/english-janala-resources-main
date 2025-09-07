const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
  return htmlElements.join(" ");
};
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");

  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      clickBtn.classList.add("active");
      displayLevelWord(json.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms":

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
          <div class="">
            <h2 class="text-2xl font-bold">${
              word.word
            } (<i class="fa-solid fa-microphone-lines-slash"></i> ${
    word.pronunciation
  })</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="text-2xl font-bold">Example</h2>
            <p class="font-bangla">${word.sentence}</p>
          </div>
          <div class="">
            <h2>সমার্থক শব্দগুলো</h2>
           <div class="">
           ${createElements(word.synonyms)}
           </div>
          </div>
          <div>
            <button class="btn bg-blue-800 text-white rounded-lg">Complete Learning</button>
          </div>
  `;
  document.getElementById("word_modal").showModal();
};

//display level word
const displayLevelWord = (words) => {
  const WordContainer = document.getElementById("word-container");
  WordContainer.innerHTML = "";
  if (words.length == 0) {
    WordContainer.innerHTML = `
   <div
        class=" text-center col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
        <img src="assets/alert-error.png" alt="">
        <p class="text-2xl font-medium text-gray-500">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
   `;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
  <div
        class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning/ Pronounciation</p>
        <div class="font-medium text-2xl font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "pronounciation পাওয়া যায়নি"
    }"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
  
  `;
    WordContainer.appendChild(wordCard);
  });
};

//display Lesson
displayLesson = (lessons) => {
  // 1. get the container & emty

  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2get into every lessons
  for (let lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
              <button id="lesson-btn-${lesson.level_no}"
              onclick="loadLevelWord(${lesson.level_no})"  
              class="btn btn-outline btn-primary lesson-btn">
              <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
                </button>
  `;
    //4. append child add
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
