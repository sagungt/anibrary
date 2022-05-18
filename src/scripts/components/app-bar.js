class AppBar extends HTMLElement {

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
        <nav class="shadow navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div class="container-xl">
                <a class="navbar-brand" href="#home">Anibrary</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#anime">Anime</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#manga">Manga</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#people">People</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#characters">Character</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#seasons">Seasons</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `
    }
}

customElements.define('app-bar', AppBar)