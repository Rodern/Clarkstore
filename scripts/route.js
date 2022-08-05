export class Route {
    constructor(name, path, handler){
        this.name = name;
        this.path = path;
        this.handler = handler;
    }
    
    get name() {
        return this.name;
    }
    set name(name) {
        this.name = name;
    }

    get path() {
        this.path;
    }
    set path(path) {
        this.path = path;
    }

    get handler() {
        this.handler;
    }
    set handler(handler) {
        this.handler = handler;
    }
}