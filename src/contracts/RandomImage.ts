const game = "https://img.freepik.com/premium-vector/gamification-illustration-development-video-games-girl-write_676904-12748.jpg?w=740"
const mobile = "https://riseuplabs.com/wp-content/uploads/2021/07/mobile-application-development-guidelines-riseuplabs.jpg"
const back = "https://images.prismic.io/turing/652ec4b8fbd9a45bcec819b7_shutterstock_1689980737_adf7a3b16b.webp?auto=format%2Ccompress&fit=max&w=1920"
const front = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20201111215809/How-to-Become-a-Front-End-Developer-in-2020.png"
const AI = "https://media.licdn.com/dms/image/v2/C4E12AQGnHp7U_B1ZCw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1633424702456?e=2147483647&v=beta&t=w_SpPNi7vXDYFmmpHxww0XM3E6gpoCX6PApPibbNWSc"
const DataScience = "https://www.janets.org.uk/wp-content/uploads/2021/08/R-Programming-for-Data-Science-1.jpg"
const others = "https://www.mindinventory.com/blog/wp-content/uploads/2022/10/frontend-development-tools.png"
const RandomImage = (category:string) :string => {
    switch (category) {
        case 'Game': return game;
        case "Mobile": return mobile;
        case "AI": return AI;
        case "Data Science": return DataScience;
        case "Front-end": return front;
        case "Back-end": return back;
        default: return others
    }
}
export default RandomImage