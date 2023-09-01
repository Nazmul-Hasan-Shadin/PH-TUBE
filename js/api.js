const loadData= async ()=>{
 const response= await fetch('https://openapi.programming-hero.com/api/videos/categories')
 const data=await response.json();
 displayData(data.data)
}

const displayData=(data)=>{

       const cardContainer= document.getElementById('card-container');
       data.forEach((data)=>{
       
        const div= document.createElement('div');
        
           div.innerHTML= ` 
           <a class="tab">Tab 1</a> 
           
           `
           cardContainer.appendChild(div)



       })

    
}











loadData()