class JikanAPI {
    static send(url) {
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson)
                } else {
                    return Promise.reject(`${keyword} is not found`)
                }
            })
    }

    static top(type) {
        return this.send(`https://api.jikan.moe/v3/top/${type}`)
    }
    static search(type, keyword) {
        return this.send(`https://api.jikan.moe/v3/search/${type}?q=${keyword}`)
    }
    static season(year, season) {
        return this.send(`https://api.jikan.moe/v3/season/${year}/${season}`)
    }
    static seasonArchive() {
        return this.send(`https://api.jikan.moe/v3/season/archive`)
    }
    static seasonLater() {
        return this.send(`https://api.jikan.moe/v3/season/later`)
    }
    static schedule(day) {
        return this.send(`https://api.jikan.moe/v3/schedule/${day}`)
    }
}

export default JikanAPI