const compress_imgs = require("compress-images");
const imagemin = require("imagemin");
const { resolve } = require("path");
const imageminWebp = require("imagemin-webp");
const INPUT_PATH = resolve(process.cwd(), "ishak/assets/img/*.jpg").replace(
  /\\/g,
  "/"
);
const OUTPUT_PATH =
  resolve(process.cwd(), "ishak/assets/img/lowres/").replace(/\\/g, "/") + "/";
console.log(INPUT_PATH);
console.log(OUTPUT_PATH);

module.exports.op = OUTPUT_PATH;
module.exports.ip = INPUT_PATH;
module.exports.compress = () => {
  compress_imgs(
    INPUT_PATH,
    OUTPUT_PATH,
    {
      compress_force: false,
      statistic: true,
      autoupdate: false,
    },
    false,
    {
      jpg: {
        engine: "webp",
        command: ["-q", 10],
      },
    },
    { png: { engine: false, command: false } },
    { svg: { engine: false, command: false } },
    { gif: { engine: false, command: false } },
    (err, completed, stat) => {
      console.log("----------------------");
      console.log(err);
      console.log(completed);
      console.log(stat);
      console.log("----------------------");
    }
  );
};
module.exports.minify = () => {
  return imagemin([INPUT_PATH], {
    destination: OUTPUT_PATH,
    plugins: [imageminWebp({ quality: 10 })],
  });
};
