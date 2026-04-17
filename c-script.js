const wrap = (i, l) => ((i % l) + l) % l;

const createImage = () => {
  const id = Math.floor(Math.random() * 100);
  const base = `https://picsum.photos/seed/${id}`;
  return {
    id,
    thumb: `${base}/320/180`,
    full: `${base}/1024/576`,
  };
};

class Carousel {
  #root;
  #track;
  #buttons;
  #images = [];
  #indexMap = new WeakMap();
  #prev;
  #next;
  #displayImg;
  #currentIndex = 0;
  #prevButton;
  #controller = new AbortController();

  #keyActions = {
    ArrowLeft: () => this.#set(this.#currentIndex - 1),
    ArrowRight: () => this.#set(this.#currentIndex + 1),
    Home: () => this.#set(0),
    End: () => this.#set(this.#buttons.length - 1),
  };

  constructor(root) {
    this.#root = root;
    this.#track = root.querySelector(".carousel__track");
    this.#buttons = [...(this.#track?.querySelectorAll("button") || [])];
    this.#prev = root.querySelector(".prev");
    this.#next = root.querySelector(".next");
    this.#displayImg = root.querySelector(".carousel__display img");

    if (!this.#track || !this.#displayImg || !this.#buttons.length) return;

    this.#createSlides();
    this.#init();
    this.#render();
  }

  #createSlides() {
    this.#buttons.forEach((btn, i) => {
      const image = createImage();

      btn.replaceChildren(
        Object.assign(new Image(), {
          src: image.thumb,
          alt: `Thumbnail ${image.id}`,
          loading: "lazy",
          className: "thumbnail",
        }),
      );

      this.#images[i] = image;
      this.#indexMap.set(btn, i);
    });
  }

  #set(index) {
    if (!this.#buttons.length) return;
    const next = wrap(index, this.#buttons.length);
    if (next === this.#currentIndex) return;
    this.#currentIndex = next;
    this.#render();
  }

  #scroll(btn) {
    const { clientWidth } = this.#track;
    const left = btn.offsetLeft - (clientWidth / 2 - btn.offsetWidth / 2);
    this.#track.scrollTo({ left, behavior: "smooth" });
  }

  #updateDisplayImage(image) {
    if (!this.#displayImg) return;

    const { full, id } = image;

    if (this.#displayImg.src !== full) {
      this.#displayImg.src = full;
      this.#displayImg.alt = `Image ${id}`;
    }

    const nextIndex = wrap(this.#currentIndex + 1, this.#images.length);
    const nextImage = this.#images[nextIndex];
    if (nextImage) new Image().src = nextImage.full;
  }

  #render() {
    const btn = this.#buttons[this.#currentIndex];
    const image = this.#images[this.#currentIndex];

    if (!btn || !image) return;

    this.#prevButton?.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-pressed", "true");

    this.#updateDisplayImage(image);
    this.#scroll(btn);

    this.#prevButton = btn;
  }

  #handleTrackClick = ({ target }) => {
    const btn = target.closest("button");
    if (!btn) return;
    const index = this.#indexMap.get(btn);
    if (index !== undefined) this.#set(index);
  };

  #handleKeyDown = (e) => {
    const action = this.#keyActions[e.key];
    if (!action) return;
    e.preventDefault();
    action();
  };

  #init() {
    const { signal } = this.#controller;

    this.#track.addEventListener("click", this.#handleTrackClick, {
      signal,
    });
    this.#prev?.addEventListener(
      "click",
      () => this.#set(this.#currentIndex - 1),
      { signal },
    );
    this.#next?.addEventListener(
      "click",
      () => this.#set(this.#currentIndex + 1),
      { signal },
    );
    this.#root.addEventListener("keydown", this.#handleKeyDown, { signal });
  }

  destroy() {
    this.#controller.abort();
  }
}

document
  .querySelectorAll(".carousel-wrapper")
  .forEach((el) => new Carousel(el));
