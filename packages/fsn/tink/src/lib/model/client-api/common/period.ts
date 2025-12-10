export type Period = 
    | { type: "year", year: number }
    | { type: "month", year: number, month: number }
    | { type: "day", year: number, month: number, day: number }