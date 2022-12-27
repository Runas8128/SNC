class NavManager {
  constructor(box, maxLoc) {
    this.loc = 0;
    this.maxLoc = maxLoc;
    this.box = box;
  }

  left() {
    this.loc -= 1;
    if (this.loc < 0) this.loc = this.maxLoc - 1;
    this.box.style.transform = `translate(-${this.loc * 370}px)`;
  }

  right() {
    this.loc += 1;
    if (this.loc > this.maxLoc - 1) this.loc = 0;
    this.box.style.transform = `translate(-${this.loc * 370}px)`;
  }
}