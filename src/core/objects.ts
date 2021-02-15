interface GameObjectInterface {
    x?: number
    y?: number
    update: () => void
    render: (CanvasRenderingContext2D) => void
}


class GameObject implements GameObjectInterface { }

class PlayerObject extends GameObject { }

export { GameObject, PlayerObject }
