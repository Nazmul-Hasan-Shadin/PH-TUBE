const loadData= async ()=>{
 const response= await fetch('https://openapi.programming-hero.com/api/videos/categories')
 const data=await response.json();
 displayData(data.data)
}

const displayData=(data)=>{

       const tabContainer= document.getElementById('tab-container');
       data.forEach((data)=>{
       
        const div= document.createElement('div');
        
           div.innerHTML= ` 
           <a onclick='handleloadNewsData(${data.category_id})' class="tab  bg-[#25252526] mr-3 " >${data.category}</a> 
           
           `
           tabContainer.appendChild(div)

    

       })

    
}



const handleloadNewsData= async (id)=>{
        console.log('clicked',id);
     const response= await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
     const data= await response.json();
     console.log(typeof data);
     if (data.data.length===0) {
        console.log('hi');
         const cardContainer= document.getElementById('error-card-container');
         cardContainer.innerHTML='';
          const div= document.createElement('div');
       
          div.innerHTML= 
       `   
          <div class="flex justify-center">  <img class='h-20 w-[204px] h-[9rem]' src="../Icon.png" alt="" /> </div>
          <h2 class='text-3xl font-bold text-center'>  
          Oops!! Sorry, There is no content here
          </h2>
          
          
          `
          cardContainer.appendChild(div);

       
     }
     
    
   const cardContainer=document.getElementById('card-container')
    cardContainer.innerHTML='';
  
    data.data.forEach((data)=>{
      console.log(data);
       
      // second to time
      const seconds=data.others.posted_date;

      const hour = Math.floor(seconds / 3600);
const remainingSecondsAfterHours = seconds % 3600;
const minute = Math.floor(remainingSecondsAfterHours / 60);


      const times= `${hour} hr ${minute} min ago` 

     const div= document.createElement('div')

      div.innerHTML= `
      <div class="card  bg-base-100 shadow-xl">
      <figure>
      
      <img class="w-100  lg:h-[206px] w-full" src=${data.thumbnail} alt="Shoes" />



      
      <p class="absolute bottom-48 left-48 bg-black text-white">${times}</p>
      





      
      </figure>
      <div class="card-body">
             <div class="flex gap-x-2">
              <img class="w-[13%] rounded-2xl" src=${data.authors[0].profile_picture} alt="">


              <h2 class="card-title font-bold">
                 ${data.title}
                
                </h2>
            


             </div>
         <div class="flex">
         <p class="text-[#171717B3]" id="creator">${data.authors[0].profile_name}</p>
         <p>${data.authors[0].verified ? '<img class="w-4" src="../verified.png"/>': '' } <p>
         </div>
        <p class="views">${data.others.views} views</p>
      
      </div>
    </div>
      
      
      
      `  
      
       cardContainer.appendChild(div)



     })



}


const sortByView = () => {
    const cardContainer = document.getElementById('card-container');
    const cards = Array.from(cardContainer.getElementsByClassName('card'));
  

    cards.sort((a, b) => {
       
      const viewCountA = parseInt(a.querySelector('.views').textContent, 10);
      const viewCountB = parseInt(b.querySelector('.views').textContent, 10);
      return viewCountB - viewCountA; // Sort in descending order
    });
  
    // Re-append the sorted cards to the container
    cardContainer.innerHTML = '';
    cards.forEach((card) => {
      cardContainer.appendChild(card);
    });
  }
  











loadData()
handleloadNewsData("1000")
handleloadNewsData('1001')
handleloadNewsData('1003')