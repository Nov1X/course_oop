import eel
from parse import dw


@eel.expose
def get_by_author(author: str) -> list[str]:
    return dw.get_by_author(author)


@eel.expose
def get_by_num(num: int) -> str:
    return dw.get_by_num(num)


@eel.expose
def get_by_year(year: int) -> list[str]:
    return dw.get_by_year(year)


@eel.expose
def get_by_author_and_year(year: int, author: str) -> list[str]:
    return dw.get_by_author_and_year(author, year)


@eel.expose
def get_all() -> list[str]:
    return [*map(str, dw.data)]
