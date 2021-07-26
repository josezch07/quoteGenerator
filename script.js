
const quoteConstainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')



let apiQuotes = []

//show loading
function loading(){
    loader.hidden = false;
    quoteConstainer.hidden = true;
}

//Hide loading
function complete(){
    loader.hidden = true;
    quoteConstainer.hidden = false;
}

//show new quote

function newQuote(){
    loading()
    //Pick a random quote 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //check if authorField is null
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;  
    }
    //Check Quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete()
}


//Get quotes from API
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error
        console.log(error);
    }
}


//Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)



//on Load
getQuotes();

