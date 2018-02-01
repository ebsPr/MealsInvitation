export interface Day {
    key$:string,
    date:Date,
    lunch: {
        activated:boolean,
        people:string[]
    },
    dinner:{
        activated:boolean,
        people:string[]
    }
}