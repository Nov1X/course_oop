
get_table_body = () => document.getElementById('maintable_body');
get_table = () => document.getElementById('maintable');


class Book {
    constructor(raw, btype=1) {
        raw = raw.split(',');
        if (btype === 1) {
            this.name = raw[0];
            this.author = raw[1];
            this.year = raw[2];
            this.num = raw[3];
            this.cat = raw[4];
            this.price = raw[5];
        } else {
            this.name = raw[0];
            this.author = raw[1];
        }
    }
}

let tabletype = 1;
// 1 - классическая таблица, 2 - таблица только с названием и автором

function set_classic_table() {
    if (tabletype === 1) {
        return;
    }
    tabletype = 1;
    get_table().innerHTML = "<thead>\
    <tr>\
        <th>Название</th>\
        <th>Автор</th>\
        <th>Год издания</th>\
        <th>Номер книги</th>\
        <th>Каталог</th>\
        <th>Цена</th>\
    </tr>\
</thead>\
<tbody id=\"maintable_body\">\
    <tr>\
    </tr>\
</tbody>"
}

function set_na_table() {
    if (tabletype === 2) {
        return;
    }
    tabletype = 2;
    get_table().innerHTML = "<thead>\
    <tr>\
        <th>Название</th>\
        <th>Автор</th>\
    </tr>\
</thead>\
<tbody id=\"maintable_body\">\
    <tr>\
    </tr>\
</tbody>"
}



function generate_table(books) {
    for (let i = 0; i < books.length; i++) {
        books[i] = new Book(books[i]);
    }
    console.log(books)

    let insertion = '';

    books.forEach(
        function (book) {
            insertion += `<tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>${book.num}</td>
        <td>${book.cat}</td>
        <td>${book.price}</td>
        `;
            insertion += '</td>'
    }
    )

    get_table_body().innerHTML = insertion
}

async function generate_by_author() {
    set_classic_table();
    let author = window.prompt('Введите автора');

    let books = await eel.get_by_author(author)();
    generate_table(books);
}

async function generate_by_num() {
    // table only with name/author
    set_na_table();

    let num = window.prompt('Введите номер книги');

    num = parseInt(num)
    if (isNaN(num)) {
        alert('Год введён неправильно')
        return;
    }

    let book = await eel.get_by_num(num)();

    if (book === '') {
        book = new Book(',,,,,')
    } else {
        book = new Book(book, 2);
    }

    get_table_body().innerHTML = `
    <tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    </tr>
    `
}

async function generate_by_year() {
    set_classic_table();
    let year = window.prompt('Введите год');

    year = parseInt(year)
    if (isNaN(year)) {
        alert('Год введён неправильно')
        return;
    }


    let books = await eel.get_by_year(year)();

    generate_table(books);
}

async function generate_by_author_and_year() {
    set_classic_table();
    let author = window.prompt('Введите автора');
    let year = window.prompt('Введите год');

    year = parseInt(year)
    if (isNaN(year)) {
        alert('Год введён неправильно')
        return;
    }

    let books = await eel.get_by_author_and_year(year, author)();

    generate_table(books);
}

async function get_all() {
    set_classic_table();
    generate_table(await eel.get_all()());
}