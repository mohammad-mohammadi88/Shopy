export default function capitalize(text:string){
    const capitalizedText = text[0].toUpperCase() + text.slice(1).toLowerCase()
    return capitalizedText
}