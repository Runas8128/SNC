class NavManager {
  constructor(topBoxClass, mainDivClass) {
    this.loc = 0;
    this.maxLoc = 1;

    this.topBoxClass = topBoxClass;
    this.mainDivClass = mainDivClass;

    this.mainBox = null;
  }

  init() {
    const topBox = document.getElementsByClassName(this.topBoxClass)[0];

    topBox.appendChild(this.initLeftBtn());
    topBox.appendChild(this.initMainDivBox());
    topBox.appendChild(this.initRightBtn());
  }

  initLeftBtn() {
    const btnLeft = document.createElement('div');
    btnLeft.classList.add('btnLeft');

    const spanLeft = document.createElement('span');
    spanLeft.classList.add('btnLeftLabel');
    spanLeft.innerHTML = '<';
    btnLeft.appendChild(spanLeft);

    btnLeft.addEventListener('click', () => {
      this.loc -= 1;
      if (this.loc < 0) this.loc = this.maxLoc - 1;
      this.mainBox.style.transform = `translate(-${this.loc * 370}px)`;
    });

    return btnLeft;
  }

  initRightBtn() {
    const btnRight = document.createElement('div');
    btnRight.classList.add('btnRight');

    const spanRight = document.createElement('span');
    spanRight.classList.add('btnRightLabel');
    spanRight.innerHTML = '>';
    btnRight.appendChild(spanRight);

    btnRight.addEventListener('click', () => {
      this.loc += 1;
      if (this.loc > this.maxLoc - 1) this.loc = 0;
      this.mainBox.style.transform = `translate(-${this.loc * 370}px)`;
    });

    return btnRight;
  }

  initMainDivBox() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    this.mainBox = document.getElementsByClassName(this.mainDivClass)[0];
    this.maxLoc = this.mainBox.childElementCount;
    wrapper.appendChild(this.mainBox);
    return wrapper;
  }

  left() {
    this.loc -= 1;
    if (this.loc < 0) this.loc = this.maxLoc - 1;
    this.mainBox.style.transform = `translate(-${this.loc * 370}px)`;
  }

  right() {
    this.loc += 1;
    if (this.loc > this.maxLoc - 1) this.loc = 0;
    this.mainBox.style.transform = `translate(-${this.loc * 370}px)`;
  }
}