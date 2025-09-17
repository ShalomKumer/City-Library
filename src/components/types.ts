export type Book = {
    id:number
    bookName:string,
    author:{
        firstName:string,
        lastName: string,
        birthYear?: number,
    },
    year:number,
    read:boolean,
    genres:string[],
    reting:{
        average:number,
        reviews:string[]
    }
}

export type Review = {
    user: string,
    scor: 1|2|3|4|5
    comment: string,
}

export type Member = {
    id:number,
    firstName: string,
    lastName: string,
    age?: number,
    birthDay:string,
    borrowedBooks:[{
        bookId:number,
        borrowedDate:string,
    }],
    booksRead:string[]
}


