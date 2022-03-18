const draggables = document.querySelectorAll('.draggable');
const columns = document.querySelectorAll('.col');

draggables.forEach((item) => {
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
});
columns.forEach((cols) => {
    cols.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragginPosition(cols, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            cols.appendChild(draggable);
        }else{
            cols.insertBefore(draggable, afterElement)
        }
    });
});

const getDragginPosition = (container, y) => {
    const dragableElements = [
        ...container.querySelectorAll('.draggable:not(.dragging)'),
    ];
    return dragableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
};
