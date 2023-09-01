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
      console.log(data.data);
    
   const cardContainer=document.getElementById('card-container')
    cardContainer.innerHTML='';
  
    data.data.forEach((data)=>{
        console.log(data);
     const div= document.createElement('div')
      div.innerHTML= `
      <div class="card  bg-base-100 shadow-xl">
      <figure><img class="w-100  lg:h-[206px] w-full" src=${data.thumbnail} alt="Shoes" /></figure>
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
        <p id="views">${data.others.views}</p>
      
      </div>
    </div>
      
      
      
      `  
      
       cardContainer.appendChild(div)



     })



}











loadData()
handleloadNewsData("1000")