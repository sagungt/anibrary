import './detail-item.js'

class ListItem extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    set data(data) {
        this._data = data.data
        this._type = data.type
        this.render()
    }

    render() {
        this.innerHTML = ``
        const rowContainer = document.createElement('div')
        rowContainer.classList.add("row", "row-cols-2", "row-cols-md-4", "g-4", "h-100")
        this._data.forEach(data => {
            const itemElement = document.createElement('detail-item')
            itemElement.data = {
                type: this._type,
                data: data
            }
            rowContainer.appendChild(itemElement)
        })
        this.appendChild(rowContainer)
    }
}

customElements.define('list-item', ListItem)