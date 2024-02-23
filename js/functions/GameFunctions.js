export async function loadImage(context, url) {
    new Promise(
        response => {
            let image = new Image();
            image.onload = (() => response(image));
            image.src = url;
        }
    )
        .then(response => context.putImage(url, response))
        .catch(e => console.error(e));
}