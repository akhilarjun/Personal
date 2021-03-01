let zen = {};
zen.imgs = [];
let start = 0;
let pagination = 10;
let firstload = true;
const zenFor = {
  get elem() {
    return document.querySelector("zen-for");
  },
};

zenFor.elem.setAttribute("list", "imgs");

const paintMosaic = () => {
  const gridWrapper = document.querySelector(".gallery zen-for");
  if (gridWrapper) {
    console.info("Painting Mosaic for you!");
    const rowHeight = parseInt(
      window.getComputedStyle(gridWrapper).getPropertyValue("grid-auto-rows")
    );
    const gapHeight = parseInt(
      window.getComputedStyle(gridWrapper).getPropertyValue("gap")
    );
    document.querySelectorAll(".imgholder").forEach((item) => {
      const rowSpan = Math.ceil(
        (item.querySelector("img").getBoundingClientRect().height + gapHeight) /
          (rowHeight + gapHeight)
      );
      item.style.gridRowEnd = "span " + rowSpan;
    });
    document.querySelector(".loader").classList.add("hide");
  }
};

const getImgs = () => {
  !firstload && (start = start + pagination);
  if (start < 70) {
    document.querySelector(".loader").classList.remove("hide");

    for (let i = start; i < start + pagination && i < 62; i++) {
      zen.imgs.push({
        url: `./assets/img/lowres/img${i}.webp`,
      });
    }

    zenFor.elem.renderContent().then(() => {
      setTimeout(() => {
        paintMosaic();
      }, 200);
    });
  }
};

// getImgs();

// document.querySelector("body").onscroll = (e) => {
//   const gridWrapper = document.querySelector(".gallery zen-for");
//   console.log(
//     gridWrapper.scrollHeight,
//     document.querySelector("body").scrollTop,
//     gridWrapper.getBoundingClientRect().height
//   );
//   if (
//     gridWrapper.scrollTop + gridWrapper.clientHeight >=
//     gridWrapper.scrollHeight
//   ) {
//     console.log("reached end");
//   }
// };

ScrollOut({
  onShown: () => {
    // console.log("came");
    getImgs();
  },
});
