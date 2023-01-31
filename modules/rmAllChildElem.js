
const removeAllChildren = (className) => {
    const container = document.querySelector("." + className);

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
}

export { removeAllChildren };