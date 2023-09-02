const loadData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  displayData(data.data);
};

const displayData = (data) => {
  const tabContainer = document.getElementById("tab-container");
  data.forEach((data) => {
    const div = document.createElement("div");

    div.innerHTML = ` 
           <a onclick='handleloadNewsData(${data.category_id})' class="tab  bg-[#25252526] mr-3 " >${data.category}</a> 
           
           `;
    tabContainer.appendChild(div);
  });
};

const handleloadNewsData = async (id) => {
  console.log("clicked", id);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await response.json();
  console.log(typeof data);
  if (data.data.length === 0) {
    const errorCardContainer = document.getElementById("error-card-container");
    errorCardContainer.innerHTML = "";

    const div = document.createElement("div");
    //  this img and sm show in all page thats a problem
    div.innerHTML = `   
          <div class="flex justify-center -mt-40">  <img class=' w-[204px] h-[9rem]' src="../Icon.png" alt="" /> </div>
          <h2 class='text-3xl font-bold text-center'>  
          Oops!! Sorry, There is no content here
          </h2>
          
          
          `;
    errorCardContainer.appendChild(div);
  } else {
    const errorCardContainer = document.getElementById("error-card-container");
    errorCardContainer.innerHTML = "";
  }

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  data.data.forEach((data) => {
    // second to time
    const seconds = data.others.posted_date;

    const hour = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minute = Math.floor(remainingSeconds / 60);

    const times = hour > 0 || minute > 0 ? `${hour} hr ${minute} min ago` : "";

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card  bg-base-100 shadow-xl">
      <figure>
      
      <img class="w-100 h-52 lg:h-[206px] w-full" src=${
        data.thumbnail
      } alt="Shoes" />



      
      <p class="absolute bottom-44 left-[243px] md:bottom-48 lg:bottom-[183px]  md:left-[106px] lg:left-44 bg-black text-white">${times}</p>
      





      
      </figure>
      <div class="card-body">
             <div class="flex gap-x-2">
              <img class="w-7 h-7 rounded-full" src=${
                data.authors[0].profile_picture
              } alt="">


              <h2 class="card-title font-bold">
                 ${data.title}
                
                </h2>
            


             </div>
         <div class="flex gap-0">
         <p class="text-[#171717B3]" id="creator">${
           data.authors[0].profile_name
         }</p>
         <p>${
           data.authors[0].verified
             ? '<img class="w-4 relative top-1 -left-6" src="../star.svg"/>'
             : ""
         } <p>
         </div>
        <p class="views">${data.others.views} views</p>
      
      </div>
    </div>
      
      
      
      `;

    cardContainer.appendChild(div);
  });
};

const sortByView = () => {
  const cardContainer = document.getElementById("card-container");
  const cards = Array.from(cardContainer.getElementsByClassName("card"));

  cards.sort((a, b) => {
    const viewCountA = parseInt(a.querySelector(".views").textContent, 10);
    const viewCountB = parseInt(b.querySelector(".views").textContent, 10);
    return viewCountB - viewCountA;
  });

  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    cardContainer.appendChild(card);
  });
};

loadData();
handleloadNewsData("1000");
handleloadNewsData("1001");
handleloadNewsData("1003");
