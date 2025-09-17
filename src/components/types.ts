export type Review = {
    user: string,
    score: number
    comment?: string,
}

export type Book = {
    id:string
    bookName:string,
    description:string
    author:string[]
    img:string,
    alt:string,
    year:string,
    read:boolean,
    genres:string[],
    rateing:{
        average:number,
        reviews:Review[]
    }
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


