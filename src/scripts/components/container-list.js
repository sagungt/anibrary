import './list-item.js'

class ContainerList extends HTMLElement {
    connectedCallback() {
        this._isHome = true
    }

    set title(title) {
        this._title = title
        this.render()
    }

    set isHome(param) {
        this._isHome = param
        this._title = ''
        this.render()
    }

    get isHome() {
        return this._isHome
    }

    render() {
        this.innerHTML = `
        <h1 class="display-6 mt-5">${this._title}</div>
        `
    }

    renderSearch(type, data) {
        const listElement = document.createElement('list-item')
        listElement.data = {
            type: type,
            data: data.results
        }
        this.appendChild(listElement)
    }

    renderTop(type, data) {
        const listElement = document.createElement('list-item')
        listElement.data = {
            type: type,
            data: data.top
        }
        this.appendChild(listElement)
    }

    renderHome(type, data, day) {
        const listElement = document.createElement('list-item')
        listElement.data = {
            type: type,
            data: data[day]
        }
        this.appendChild(listElement)
    }

    renderSeason(type, data) {
        const listElement = document.createElement('list-item')
        listElement.data = {
            type: type,
            data: data.anime
        }
        this.appendChild(listElement)
    }

    renderError(message) {
        this.innerHTML = `
        <h2>Oopss.. Something Wrong</h2>
        <span>${message}</span>
        `
    }
}

customElements.define('container-list', ContainerList)