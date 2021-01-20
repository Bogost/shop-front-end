export class Message {
    visible: boolean = false;
    content: string = "";
    kind: string = "error";//use bootstrap classes

    get class() {
        return "alert alert-" + this.kind;
    }

    show(content: string, kind: string) {
        this.visible = true;
        this.content = content;
        this.kind = kind;
    }

    hide() {
        this.visible = false;
    }
}