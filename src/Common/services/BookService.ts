import Book from '../Class/Book';
import Client from '../Class/Client';
import BaseService from './BaseService';

export default class BookService extends BaseService {

    public books:Book[];

    constructor(client: Client) {
        super(client);
        this.books = new Array<Book>();
    }

    public async fetchBooks(){
        const res = await fetch("http://"+this.getIp()+":9000/api/book/all");
        
        if(res.ok) {
            const books: Book[] = await res.json();
            this.setBooks([...books]);
            return this.books;
        }
    
        return [];
    }
    
    public async createBook(book: Book) {
        const data = book.toJSON();
        await fetch("http://"+this.getIp()+":9000/api/addBook", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        this.addBook(book);
        await this.client.tagService.setTags([...this.client.tagService.tags])
        return this.books;
    }

    public addBook(b:Book){
        const book = new Book(this.client, b.title, b.author, b.numberOP, b.notePerso, b.releaseYear, b.summary, b.readings, b.tags, b.idBook);
        this.books.push(book);
    }

    public setBooks(value:Book[]){
        this.books = value;

        return this.books;
    }
}