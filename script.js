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

document.getElementById("bookForm").addEventListener("submit", function(e){
    e.preventDefault();

    const title=document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("hasRead").checked;

    addBookToLibrary(title,author,pages,hasRead);
    this.reset(); 
    document.getElementById("bookModel").close();
});