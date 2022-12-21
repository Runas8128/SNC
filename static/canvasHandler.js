class handler {
  init() {
    this.canvas = this.build_canvas();
    this.context = this.canvas.getContext("2d");

    this.flag = false;
    this.isDot = false;

    this.pos = {
      prev: [0, 0],
      curr: [0, 0],
    };
    this.pen = {
      stroke: 'black',
      width: 2
    };
  }

  build_canvas() {
    const canvas = document.getElementById('canvas');

    canvas.addEventListener("mousemove", e => this.findMove(e), false);
    canvas.addEventListener("mousedown", e => this.findDown(e), false);
    canvas.addEventListener("mouseup", _ => this.findUpOrOut(), false);
    canvas.addEventListener("mouseout", _ => this.findUpOrOut(), false);

    return canvas;
  }

  setPen(obj) {
    this.pen = {
      stroke: obj.id,
      width: obj.id === 'white' ? 14 : 2,
    }
  }

  draw() {
    this.context.beginPath();

    this.context.moveTo(...this.pos.prev);
    this.context.lineTo(...this.pos.curr);

    this.context.strokeStyle = this.pen.stroke;
    this.context.lineWidth = this.pen.width;
    this.context.stroke();

    this.context.closePath();
  }

  erase() {
    if (confirm("Want to clear")) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  setPos({ clientX, clientY }) {
    this.pos = {
      prev: [...this.pos.curr],
      curr: [clientX - this.canvas.offsetLeft, clientY - this.canvas.offsetTop],
    };
  }

  findDown(e) {
    this.setPos(e);

    this.flag = true;
    this.isDot = true;

    if (this.isDot) {
      this.context.beginPath();
      this.context.fillStyle = this.pen.stroke;
      this.context.fillRect(...this.pos.curr, 2, 2);
      this.context.closePath();

      this.isDot = false;
    }
  }

  findUpOrOut() {
    this.flag = false;
  }

  findMove(e) {
    if (this.flag) {
      this.setPos(e);
      this.draw();
    }
  }
}

const canvas = new handler();
