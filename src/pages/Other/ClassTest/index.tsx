const ClassTest = () => {
  class Parent {
    _width: number
    set width(width: number) {
      this._width = width
    }
    get width() {
      return this._width
    }
  }

  class Child extends Parent {
    constructor() {
      super()
      console.log(this.width)
    }
  }

  return <></>
}

export default ClassTest
