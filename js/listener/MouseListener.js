export class MouseListener {
    constructor(context) {
        this.mousePositionX = context.getWidth();

        window.addEventListener('click', e => {
            var rect = context.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            context.getScreen().onClick(x, y);
        });

        window.addEventListener('mousemove', e => {
            var rect = context.getBoundingClientRect();
            this.mousePositionX = e.clientX - rect.left;
        });

        context.setMouseListener(this);
    }
}