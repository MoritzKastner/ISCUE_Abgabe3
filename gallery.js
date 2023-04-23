"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    const div = document.getElementById("pictures");
    const links = div.querySelectorAll('a[href]');
    const hrefs = [];
    links.forEach(link => {
        hrefs.push(link.href);
    });
    // TODO: Select a random entry out of these 6.
    console.log("linklenght= " + links.length)
    const randomIndex = getRandomInt(0, links.length-1);
    console.log(randomIndex)
    // TODO: Implement switchFullImage() below.
    //const randomLink = links[randomIndex];
    console.log(links[randomIndex])
    const imageUrl = links[randomIndex].href;
    const imageDescription = links[randomIndex].querySelector('img').alt;

    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    switchFullImage(imageUrl, imageDescription)
// TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    let randomLink = links[randomIndex];
    const Link = randomLink.parentElement.nextElementSibling;
    Link.classList.add('bg-dark', 'text-white');
    document.getElementById('bigpicture').innerHTML = imageUrl;

}


/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // TODO: Select all the 6 links (<a>) in the thumbnail section.
    let links = document.querySelector('#thumbnails a')

    // TODO: Set an event listener for the click event on every <a> element.
    //  (or advanced: think of a way to do it with one single handler)

    // TODO: The callback of the listener should do the following things:
    //  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
    //  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
    //  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
    //  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
    //  - Prevent the default action for the link (we don't want to follow it).
    links.forEach(link=>{
        link.addEventListener("click", function(event){
            event.preventDefault();
        let cardBody = this.parentElement.nextElementSibling;
        let clickedLink = document.querySelector('.bg-dark');
        if (clickedLink!== null){
            clickedLink.classList.remove('bg-dark','text-white');
            clickedLink.parentElement.nextElementSibling.classList.remove('bg-dark','text-white');
        }
        this.classList.add('bg-dark','text-white');
        cardBody.classList.add('bg-dark','text-white')

        let imgUrl = this.href
        let imageDescription = this.querySelector('img').alt;
        switchFullImage(imgUrl, imageDescription);
        
        let key = imageUrl;
        loadNotes(key);
        storeNotes(key);
        event.preventDefault();
        });
    });  
}
//try switching const for let
/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    // TODO: Select the notes field and add a blur listener.
    const Notes = document.getElementById("notes"); 
   
        const key = document.querySelector('figure img').src;
       // console.log(figure img)
        //const notes = Notes.innerHTML;
        if (localStorage.getItem ("content")){
           Notes.innerHTML = localStorage.getItem("content");
        } else {
            Notes.innerHTML = "Enter your Notes here!";
        }
        Notes.addEventListener('blur',function(){
        if(this.textContent===""){
            localStorage.removeItem("content");
        } else{
            localStorage.setItem("content",this.innerHTML);
        }
    })
    // TODO: When the notes field loses focus, store the notes for the current image in the local storage.
    // TODO: If the notes field is empty, remove the local storage entry.
    // TODO: Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // TODO: Get the <img> element for the full image. Select it by its class or tag name.
    const img = document.querySelector("figure > img");
    console.log(img)
    // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    img.src = imageUrl;
    img.alt = imageDescription;
    // TODO: Select the <figcaption> element.
    const caption = document.querySelector("figure > figcaption");
    // TODO: Set the description (the one you used for the alt attribute) as its text content.
    caption.textContent = imageDescription;
    console.log(imageDescription)
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // TODO: Select the notes field.
    let Notes = document.querySelector('#notes');
    // TODO: Check the local storage at the provided key.
    let storedValue = localStorage.getItem(key);
if (storedValue !== null && storedValue !== "") {
    Notes.innerHTML = storedValue;
} else {
    Notes.innerHTML = "Enter your notes here!";
}
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
console.log(Notes);
   
    //  - If there's no entry, set the default text "Enter your notes here!".
}
/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
