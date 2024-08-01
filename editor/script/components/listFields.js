export default class ListFields {
    list = []

    addField(field) {
        this.list.push(field)
    }

    removeField(field) {
        field.remove()
        this.list = this.list.filter(f => f !== field)
    }

    moveFieldUp(field) {
        const index = this.list.indexOf(field)
        if(index > 0){
            [this.list[index], this.list[index - 1]] = [this.list[index - 1], this.list[index]];
        }
    }

    moveFieldDown(field) {
        const index = this.list.indexOf(field);
        if (index < this.list.length - 1) {
            [this.list[index], this.list[index + 1]] = [this.list[index + 1], this.list[index]];
        }
    }

    getList() {
        return this.list
    }
}