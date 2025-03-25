const myLibrary=[];

function Book(title,author,pages,hasRead){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.hasRead=hasRead;
}

Book.prototype.toggleRead=function(){
    this.hasRead=!this.hasRead;
};

function addBookToLibrary(title,author,pages,hasRead){
    const newBook=new Book(title,author,pages,hasRead);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks(){
    const librarydiv=document.getElementById("library");
    librarydiv.innerHTML="";

    myLibrary.forEach(book=>{
        const bookcard=document.createElement("div");
        bookcard.classList.add("card");
        bookcard.setAttribute("data-id",book.id);


        bookcard.innerHTML=`
        <div class="cardInfo">
            <p>Title : <strong> ${book.title}</strong></p>
            <p>Author :  ${book.author}</p>
            <p>Pages : ${book.pages}</p>
            <p>${book.hasRead? "✅ Read": "❌ Not read"}</p>
        </div>
        <div class="cardButton">
            <button class="toggleRead">Toggle Read</button>
            <button class="removeBook">Remove</button>
        </div>
        `;

        librarydiv.appendChild(bookcard);
    });


 

}
document.getElementById("library").addEventListener("click",function(e){

    if(e.target.classList.contains("toggleRead")){
        const bookId=e.target.closest(".card").getAttribute("data-id");
        const book=myLibrary.find(book=>book.id === bookId);

        if(book){
            book.toggleRead();
            displayBooks();
        }
    }

    if(e.target.classList.contains("removeBook")){
        const bookId=e.target.closest(".card").getAttribute("data-id");
        const index=myLibrary.findIndex(book=>book.id===bookId);
        if(index!==-1)
        {
            myLibrary.splice(index,1);
        }
        displayBooks();
    }
})


document.getElementById("newBookBtn").addEventListener("click",()=>{
    document.getElementById("bookModel").showModal();
});

document.getElementById("closeModel").addEventListener("click", ()=>{
    document.getElementById("bookForm").reset();
    document.getElementById("bookModel").close();
});


function showError(input,message){
    const errorSpan=document.getElementById(`${input.id}Error`);
    errorSpan.textContent=message;
    input.classList.add("invalid");

}

function clearError(input){
    const errorSpan=document.getElementById(`${input.id}Error`);
    errorSpan.textContent="";
    input.classList.remove("invalid");
}


function validateField(input){
    if(input.validity.valueMissing){
        showError(input,`${input.name} is required`);
        return false;
    }
    if(input.id==="pages" && input.value<1){
        showError(input,`page must be atleast 1`);
        return false;
    }

    clearError(input);
    return true;
    
}

const inputs=document.querySelectorAll("#bookForm input[type='text'] , #bookForm input[type='number']");
inputs.forEach((input)=>{
    input.addEventListener("input",()=>validateField(input));

    input.addEventListener("blur",()=>validateField(input));
});



document.getElementById("bookForm").addEventListener("submit", function(e){
    e.preventDefault();

    const isTitleValid=validateField(document.getElementById("title"));
    const isAuthorValid = validateField(document.getElementById("author"));
    const isPagesValid = validateField(document.getElementById("pages"));

    if(!isTitleValid||!isPagesValid||!isAuthorValid){
        return;
    }

    const title=document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("hasRead").checked;

    addBookToLibrary(title,author,pages,hasRead);
    this.reset(); 
    document.getElementById("bookModel").close();
});