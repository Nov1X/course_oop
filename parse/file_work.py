import json


class Book:
    # year - год издания
    # name - название книги
    # cat  - номер каталога
    # num  - номер книги
    # author - автор книги
    # price - цена экземпляра
    def __init__(self, book: str):
        book = book.split(',')
        self.name = book[0]
        self.author = book[1]
        self.year = int(book[2])
        self.num = int(book[3])
        self.cat = int(book[4])
        self.price = int(book[5])

    def __str__(self):
        return ','.join([self.name, self.author, str(self.year), str(self.num), str(self.cat), str(self.price)])


class FileLoader:
    data = [
        # название,автор,год,номер,каталог,цена
        # 'test_book,author,2008,3,2,500',
    ]

    def __init__(self):
        self.load()

    def load(self):
        with open('./book.dat', 'r') as f:
            r = f.read()
            self.data = json.loads(r)

    # def dump(self):
    #     with open('./book.dat', 'w') as f:
    #         f.write(
    #             json.dumps(self.data)
    #         )
    #         self.data = {}


class DataWorker(FileLoader):
    def __init__(self):
        super().__init__()
        # self.load()
        self.deserialize_books()

    # def __del__(self):
    #     self.serialize_books()
    #     self.dump()

    # класс дополняет поведение родительского класса
    def deserialize_books(self):
        for i in range(len(self.data)):
            self.data[i] = Book(self.data[i])

    # call only in del
    def serialize_books(self):
        for i in range(len(self.data)):
            self.data[i] = str(self.data[i])

    def get_by_num(self, bid: int) -> str:
        for book in self.data:
            if book.num == bid:
                return str(book)
        return ''

    def get_by_author(self, author: str) -> list[str]:
        return [str(book) for book in self.data if book.author == author]

    def get_by_year(self, year: int) -> list[str]:
        return [str(book) for book in self.data if book.year == year]

    def get_by_author_and_year(self, author: str, year: int) -> list[str]:
        return [str(book) for book in self.data if book.year == year and book.author == author]
