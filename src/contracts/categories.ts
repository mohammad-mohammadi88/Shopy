export type CategoryType = "Mobile" | "Game" | "AI" | "Desktop" | "Back-end" | "Front-end" | "Data Science"
export interface Option{
    value:CategoryType
}
export const categories:Option[] = [
    {value:"Back-end"},
    {value:"Front-end"},
    {value:"Mobile"},
    {value:"Game"},
    {value:"AI"},
    {value:"Data Science"},
    {value:"Desktop"},
]