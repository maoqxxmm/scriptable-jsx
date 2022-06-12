import { FlexibleSize, render } from "../src";

const widget = new ListWidget();

const fetchRecentHoliday = async () => {
  // open api from https://www.mxnzp.com/doc/detail?id=1
  const req = new Request(
    "https://www.mxnzp.com/api/holiday/recent/list?app_id=vrlhpgmqpivpkfjw&app_secret=S1RXWGZNa0pBWDIyQlJuRVQ5bnpTQT09"
  );

  const data = await req.loadJSON();

  if (data.code !== 1) {
    throw new Error(data.message);
  } else {
    return data.data.find((item) => item.residueDays >= 0);
  }
};

const nextHoliday = await fetchRecentHoliday();

const bg = new LinearGradient();
bg.colors = [new Color("#fad0c4"), new Color("#ffd1ff")];
bg.locations = [0, 1];

const textColor = new Color("#000000");

const font = new Font("Copperplate-Bold", 64);

render(
  <stack
    size={new FlexibleSize(100, 100)}
    backgroundGradient={bg}
    layoutVertically
  >
    <stack centerAlignContent size={new FlexibleSize(100, 33)}>
      <text textColor={textColor}>距离下一个节日</text>
    </stack>
    <stack centerAlignContent size={new FlexibleSize(100, 33)}>
      <text textColor={textColor}>{nextHoliday.holidayName}</text>
    </stack>
    <stack centerAlignContent size={new FlexibleSize(100, 33)}>
      <text textColor={textColor}>还有</text>
      <spacer length={5} />
      <text textColor={textColor} font={font}>
        {nextHoliday.residueDays}
      </text>
      <spacer length={5} />
      <text textColor={textColor}>天</text>
    </stack>
  </stack>,
  widget
);

widget.presentMedium();
