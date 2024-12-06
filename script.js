const apiKey = '5a631fbab06c4772ab16f4906781d63f'
  
const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input')
const searchButton = document.getElementById('search-button');
async function fetchRandomNews(){
    try{
         const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=12&apikey=${apiKey}`
        const response =  await fetch(apiUrl)
        const data = await response.json()
     return data.articles;
    } catch(error){
        console.error("Error Fetching News",error);
        return []
    }
}

 searchButton.addEventListener('click',async ()=>{
    const query = searchField.value.trim()
   if(query !== ""){
        try {
            const articles = await fetchNewsQurey(query)
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by qury",error)
        }
    }
})

async function fetchNewsQurey(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`
       const response =  await fetch(apiUrl)
       const data = await response.json()
    return data.articles;
   } catch(error){
       console.error("Error Fetching News",error);
       return []
   }

}

function displayBlogs(articles){
    blogContainer.innerHTML = ''
    articles.forEach((article) => {
         const blogCard = document.createElement("div");
         blogCard.classList.add("blog-card")
         const img = document.createElement("img");
         img.src = article.urlToImage;
         img.alt = article.title;
         const title = document.createElement("h2");
         const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + ".....": article.title;

         title.textContent = truncatedTitle;
         const description = document.createElement('p');
         const truncatedDes = article.description.length > 130 ? article.description.slice(0,130) + "....." : article.description;
         description.textContent = truncatedDes;
         description.textContent = article.description;

         blogCard.appendChild(img)
         blogCard.appendChild(title)
         blogCard.appendChild(description)
         blogCard.addEventListener('click',()=>{window.open(article.url,"_blank");
         });
         blogContainer.appendChild(blogCard);

    });

}
(async () => {
    try {
     const articles =   await fetchRandomNews()
     displayBlogs(articles)
    } catch (error) {
        console.error("Error Fetching News",error);
    }
})()