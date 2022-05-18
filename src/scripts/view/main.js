import { Dropdown } from 'bootstrap'
import '../components/app-bar.js'
import '../components/search-bar.js'
import '../components/container-list.js'
import '../components/list-item.js'
import JikanAPI from '../data/jikan-api.js'

const main = () => {
    // navbar collapse toggler handler
    const dropdownNav = document.querySelector('.navbar-toggler')
    new Dropdown(dropdownNav)
    const searchElement = document.querySelector('search-bar')
    const containerListElement = document.querySelector('container-list')
    const containerElements = []

    // search button function
    const searchingButton = () => {
        const type = searchElement.page.toLowerCase()
        console.log(type)
        if (type !== 'seasons') {
            JikanAPI.search(type, searchElement.value)
                .then(result => {
                    console.log(result)
                    containerListElement.title = `Result of: ${searchElement.value}`
                    containerListElement.renderSearch(type, result)
                })
                .catch(fallbackResult)
        } else {
            const [year, season] = searchElement.value
            renderSeason(year, season)
        }
    }

    // handle change type page content to search
    const handleChange = (event) => {
        let type = event.target.innerText.toLowerCase()
        searchElement.page = type
        const links = document.querySelectorAll('.nav-item a')
        links.forEach(link => {
            if (link.classList.contains('active')) {
                link.classList.toggle('active')
            }
        })
        containerListElement.isHome = false
        event.target.classList.toggle('active')
        type === 'seasons'
            ? renderSeasonLater()
            : renderTop(type === 'character'
                ? type += 's'
                : type)
        containerElements.forEach(element => {
            element.remove()
        })
    }

    searchElement.clickEvent = searchingButton

    const capitalize = string => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // handle listeners for links in appbar
    const links = document.querySelectorAll('.nav-item a')
    links.forEach(link => {
        link.addEventListener('click', handleChange)
    })

    // handle home link listener
    const homeLink = document.querySelector('.navbar-brand')
    homeLink.addEventListener('click', function (event) {
        event.preventDefault()
        searchElement.page = event.target.hash.substr(1)
        containerListElement.isHome = true
        renderHome()
    })

    // handle error
    const fallbackResult = (message) => {
        containerListElement.renderError = message
    }

    // render top list all category
    const renderTop = type => {
        JikanAPI.top(type)
            .then(result => {
                containerListElement.title = `Top ${capitalize(type)}`
                containerListElement.renderTop(type, result)
            })
            .catch(fallbackResult)
    }

    // render upcoming season
    const renderSeasonLater = () => {
        JikanAPI.seasonLater()
            .then(result => {
                containerListElement.title = `Upcoming Anime`
                containerListElement.renderSeason('anime', result)
            })
            .catch(fallbackResult)
    }

    // render selected season
    const renderSeason = (year, season) => {
        JikanAPI.season(year, season)
            .then(result => {
                containerListElement.title = `${capitalize(season)}, ${year}`
                containerListElement.renderSeason('anime', result)
            })
            .catch(fallbackResult)
    }

    // render scheduled airing anime in home
    const renderHome = () => {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        days.forEach(day => {
            const container = document.createElement('container-list')
            JikanAPI.schedule(day)
                .then(result => {
                    container.title = capitalize(day)
                    container.renderHome('schedule', result, day)
                })
                .catch(fallbackResult)
            containerElements.push(container)
        })
        containerElements.forEach(element => {
            containerListElement.parentElement.appendChild(element)
        })
    }

    if (containerListElement.isHome) {
        renderHome()
    }
}

export default main