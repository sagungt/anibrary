import JikanAPI from '../data/jikan-api.js'

class SearchBar extends HTMLElement {
    connectedCallback() {
        this._page = 'home'
        this.render()
        this.archiveYears = ``
        JikanAPI.seasonArchive()
            .then(res => {
                for (let year of res.archive) {
                    this.archiveYears += `<option value="${year.year}">${year.year}</option>`
                }
                this.render()
            })
    }

    render() {
        const pageName = this._page === 'anime' || this._page === 'manga' ? "Title" : "Name"
        const isHome = this._page === 'home'
        if (isHome) {
            this.innerHTML = ''
        } else {
            this.innerHTML = this._page !== 'seasons' ? `
            <div class="row justify-content-center my-5">
                <div class="col-md-2 col-sm-2 col-12 mx-auto">
                    <label for="inputPassword2"><h1 class="display-6">${pageName}</h1></label>
                </div>
                <div class="col-md-10 col-sm-10 col-12">
                    <div class="row">
                        <div class="col-md-10 col-sm-10 col-9">
                            <input type="text" class="form-control form-control-lg shadow" id="inputSearch" placeholder="Search ${this._page}">
                        </div>
                        <div class="col-md-2 col-sm-2 col-3">
                            <button type="submit" class="btn btn-lg btn-primary shadow" id="searchButton">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            ` : `
            <div class="row justify-content-center my-5">
                <div class="col-2 col-md-2 col-sm-12">
                    <label><h1 class="display-6">Seasons</h1></label>
                </div>
                <div class="col-12 col-md-10 col-sm-12">
                    <div class="row">
                        <div class="col-12 col-md-5">
                            <select class="form-select form-select-lg mb-3 shadow" aria-label=".form-select-lg" id="year">
                                <option selected>Select Year</option>
                                ${this.archiveYears}
                            </select>
                        </div>
                        <div class="col-12 col-md-5">
                            <select class="form-select form-select-lg mb-3 shadow" aria-label=".form-select-lg" id="season">
                                <option selected>Select Season</option>
                                <option value="summer">Summer</option>
                                <option value="spring">Spring</option>
                                <option value="fall">Fall</option>
                                <option value="winter">Winter</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-2">
                            <button type="submit" class="btn btn-lg btn-primary mb-3 shadow" id="searchButton">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            `
            this.querySelector('#searchButton').addEventListener('click', this._clickEvent)
        }
    }

    set page(page) {
        this._page = page
        this.render()
    }

    get page() {
        return this._page
    }

    set clickEvent(event) {
        this._clickEvent = event
    }

    get value() {
        return this._page === 'seasons' ? [this.querySelector('#year').value, this.querySelector('#season').value] : this.querySelector('#inputSearch').value
    }
}

customElements.define('search-bar', SearchBar)