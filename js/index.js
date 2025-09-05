const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data));
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
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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

displayLesson = (lessons) => {
  // 1. get the container & emty

  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2get into every lessons
  for (let lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
              <button 
              onclick="loadLevelWord(${lesson.level_no})"  
              class="btn btn-outline btn-primary">
              <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
                </button>
  `;
    //4. append child add
    levelContainer.appendChild(btnDiv);
  }
};
loadLessons();
