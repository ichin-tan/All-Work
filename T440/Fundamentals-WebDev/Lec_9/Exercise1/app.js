const book = {
    title: "One piece volume 1",
    author: "Eichiro Oda",
    pages: 216,
}

const readButton = document.querySelector("button");
const result = document.querySelector("p");

readButton.addEventListener("click", () => {
    result.innerText = `${book.title} by ${book.author} has ${book.pages} pages and will take an estimated ${book.pages / 3} minutes to complete.`;
})

