const rimraf = require("rimraf");
const imageCompressor = require("./compress-imgs");
const { readdirSync, rename, renameSync } = require("fs");
const { resolve, join } = require("path");
const { lstatSync } = require("fs");
const imgPath = resolve(process.cwd(), "ishak/assets/img/");
const chalk = require("chalk");

const imgs = readdirSync(imgPath);

console.log(chalk.yellow("Renaming..."));
imgs.forEach((img, index) => {
  const stat = lstatSync(join(imgPath, img));
  if (!stat.isDirectory()) {
    renameSync(imgPath + `/${img}`, imgPath + `/img${index}.jpg`);
  }
});
console.log(chalk.green("Renaming Complete!"));

rimraf("ishak/assets/img/lowres/", async () => {
  console.log(chalk.red("Low res folder cleared and deleted!"));
  //imageCompressor.compress();
  const changedFiles = await imageCompressor.minify();
  console.log(chalk.greenBright("Images optimised"));
  console.log(changedFiles);
});
