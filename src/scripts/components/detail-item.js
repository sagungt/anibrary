import moment from 'moment'

class DetailItem extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    set data(data) {
        this._data = data.data
        this._type = data.type
        this.render()
    }

    render() {
        let data = {
            image_url: this._data.image_url,
            mal_id: this._data.mal_id,
            url: this._data.url,
            title: this._data.title,
            name: this._data.name
        }
        switch (this._type) {
            case 'anime':
                data.type = this._data.type
                data.score = this._data.score
                data.start_date = this._data.start_date
                data.episodes = this._data.episodes
                data.members = this._data.members
                data.rank = this._data.rank
                data.synopsis = this._data.synopsis
                data.source = this._data.source
                data.genres = this._data.genres
                break;
            case 'manga':
                data.type = this._data.type
                data.volumes = this._data.volumes
                data.start_date = this._data.start_date
                data.score = this._data.score
                data.members = this._data.members
                data.rank = this._data.rank
                break;
            case 'people':
                data.name_kanji = this._data.name_kanji
                data.favorites = this._data.favorites
                data.birthday = this._data.birthday
                data.rank = this._data.rank
                break;
            case 'characters':
                data.name_kanji = this._data.name_kanji
                data.anime = this._data.animeography
                data.manga = this._data.mangaography
                data.favorites = this._data.favorites
                data.rank = this._data.rank
                break;
            case 'schedule':
                data.synopsis = this._data.synopsis
                data.type = this._data.type
                data.episodes = this._data.episodes
                data.source = this._data.source
                data.score = this._data.score
                data.members = this._data.members
                break;
            default:
                break;
        }
        console.log(this._type)
        this.innerHTML = `
        <div class="col h-100">
            <div class="card shadow h-100" data-toggle="modal" data-target="#content${data.mal_id}">
                <img src="${data.image_url}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title ? data.title : data.name}</h5>
                    <ul class="list-group list-group-flush">
                        ${data.birthday
                ? `<li class="list-group-item">Birthday: ${moment(data.birthday).format("LL")}</li>`
                : data.start_date
                    ? `<li class="list-group-item">Date: ${moment(data.start_date).format("LL")}</li>`
                    : ''}
                        ${data.score
                ? `<li class="list-group-item">&#9733;: ${data.score}</li>`
                : data.rank
                    ? `<li class="list-group-item">Rank: ${data.rank}</li>`
                    : ''}
                        ${data.type
                ? `<li class="list-group-item">Type: ${data.type}</li>`
                : ''}
                    </ul>
                </div>
            </div>
        </div>
        <div class="modal fade" id="content${data.mal_id}" tabindex="-1" aria-labelledby="${data.title
                ? data.title
                : data.name}" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${data.title
                ? data.title
                : data.name}">${data.title
                    ? data.title
                    : data.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div class="modal-body">
                <div class="row">
                    <div class="col-md-4 col-sm-12 col-12">
                        <img class="img-fluid img-responsive" src="${data.image_url}">
                    </div>
                    <div class="col-md-8 col-sm-12 col-12">
                    <h5 class="display-6">${data.title
                ? data.title
                : data.name}${data.name_kanji
                    ? ` | ${data.name_kanji}`
                    : ''}</h5>
                    <p>${data.synopsis
                ? data.synopsis
                : ''}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> MAL ID: <a href="${data.url}">${data.mal_id}</a></li>
                        ${data.rank
                ? `<li class="list-group-item">Rank: ${data.rank}</a></li>`
                : ''}
                        ${data.episodes
                ? `<li class="list-group-item">Episodes: ${data.episodes}</li>`
                : data.volumes
                    ? `<li class="list-group-item">Volumes: ${data.volumes}</li>`
                    : ''}
                        ${data.score
                ? `<li class="list-group-item">&#9733;: ${data.score}</li>`
                : data.favorites
                    ? `<li class="list-group-item">Favorites: ${data.favorites}</li>`
                    : ''}
                        ${data.birthday
                ? `<li class="list-group-item">Birthday: ${moment(data.birthday).format('LL')}</li>`
                : data.start_date
                    ? `<li class="list-group-item">Date: ${moment(data.start_date).format('LL')}</li>`
                    : ''}
                        ${data.type
                ? `<li class="list-group-item">Type: ${data.type}</li>`
                : ''}
                        ${data.members
                ? `<li class="list-group-item">Members: ${data.members}</li>`
                : ''}
                        ${data.anime
                ? `<li class="list-group-item">Animeography: ${data.anime.map(item => `<a href="${item.url}">${item.name}</a>`).join(' | ')}</li>`
                : ``}
                        ${data.manga
                ? `<li class="list-group-item">Mangaography: ${data.manga.map(item => `<a href="${item.url}">${item.name}</a>`).join(', ')}</li>`
                : ``}
                        ${data.genres
                ? `<li class="list-group-item">Genres: ${data.genres.map(item => `<a href="${item.url}">${item.name}</a>`).join(', ')}</li>`
                : ``}
                    </ul>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        `
    }
}

customElements.define('detail-item', DetailItem)