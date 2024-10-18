export interface Trip{
    _id: string, // Internal primar key in MongoDB
    code: string,
    name: string,
    length: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    descripton: string
}