
class ContentsWriter {

    #element;

    #stored_elements;

    #contents = {};

    #gallery_data;

    constructor(target_element, stored_elements=[]) {
        this.#element = target_element;
        this.#stored_elements = stored_elements;
    }

    async getContent(name) {
        return (await fetch(`https://godlandsby.github.io/assets/html/${name}.html`)).text();
    }

    setContent(name, element) {
        this.#contents[name] = element;
    }

    async write(name) {
        if(name in this.#contents) {
            this.#element.innerHTML = "";
            for(let child of this.#contents[name]) this.#element.appendChild(child.cloneNode(true));
            window.scroll({top: 0, behavior: 'instant'});
            if(name == "gallery") await setupGallery(document.getElementById("gallery_box"), this.#gallery_data);
            return;
        }
        const content = await this.getContent(name);
        this.#element.innerHTML = content;
        if(name == "menu") await setupMenu(document.getElementById("menu_box"));
        else if(name == "gallery") this.#gallery_data = await setupGallery(document.getElementById("gallery_box"));
        if(this.#stored_elements.includes(name)) this.#contents[name] = this.#element.cloneNode(true).children;
        window.scroll({top: 0, behavior: 'instant'});
    }
}