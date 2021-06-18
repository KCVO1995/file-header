const fs = require("fs");
const path = require("path");

const fileDir = process.argv[2];
const fileName = process.argv[3];
const fileEncode = process.argv[4];
const fileExt = process.argv[5];
const user = process.argv[6];
const filePath = path.join(fileDir, fileName);
console.log(filePath);

const isLess = (num) => (num < 10 ? "0" + num : num);

const timeFormat = (now) => {
  return `${now.getFullYear()}-${isLess(now.getMonth() + 1)}-${isLess(
    now.getDate()
  )} ${isLess(now.getHours())}:${isLess(now.getMinutes())}:${isLess(
    now.getSeconds()
  )}`;
};

try {
  const source = fs.readFileSync(filePath, {
    encoding: fileEncode,
  });
  let sourceStr = source.toString();

  const editor = sourceStr.match(/(:last editor:)(.*)/)
    ? sourceStr.match(/(:last editor:)(.*)/)[0]
    : false;

  const time = sourceStr.match(/(:date last edited: )(.*)/)
    ? sourceStr.match(/(:date last edited: )(.*)/)[0]
    : false;

  const date = timeFormat(new Date());

  if (!editor || !time) {
    const header = `/*\n * :file description: \n * :name: ${filePath.replace(
      `D:\\tungee\\project`,
      ""
    )}\n * :author: ${user}\n * :copyright: (c) ${new Date().getFullYear()}, Tungee\n * :date created: ${date}\n * :last editor: ${user}\n * :date last edited: ${date}\n */\n`;

    sourceStr = header + sourceStr;
  } else {
    sourceStr = sourceStr.replace(editor, `:last editor: ${user}`);
    sourceStr = sourceStr.replace(time, `:date last edited: ${date}`);
  }

  fs.writeFileSync(filePath, sourceStr, { encoding: fileEncode });
} catch (e) {
  console.log(e);
}
