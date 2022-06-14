import { FlexibleSize, render } from "../src";

const widget = new ListWidget();

const fetchRecentHoliday = async () => {
  // open api from https://www.mxnzp.com/doc/detail?id=1
  // app_id and app_secret here are just for demo purpose and expired. You should apply for it from https://www.mxnzp.com/
  const req = new Request(
    "https://www.mxnzp.com/api/holiday/recent/list?app_id=khtmpjqxrnifmdle&app_secret=RkpScHN0alg2RldnSHJieDFCd2FIZz09"
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

const BaseTextComp = ({ children, ...otherProps }) => {
  return (
    <text textColor={textColor} {...otherProps}>
      {children}
    </text>
  );
};

const BaseRow = ({ children, ...otherProps }) => {
  return (
    <stack centerAlignContent size={new FlexibleSize(100, 33)} {...otherProps}>
      {children}
    </stack>
  );
};

render(
  <stack
    size={new FlexibleSize(100, 100)}
    backgroundGradient={bg}
    layoutVertically
  >
    <BaseRow>
      <BaseTextComp>距离下一个节日</BaseTextComp>
    </BaseRow>
    <BaseRow>
      <BaseTextComp>{nextHoliday.holidayName}</BaseTextComp>
    </BaseRow>
    <BaseRow>
      <BaseTextComp>还有</BaseTextComp>
      <spacer length={5} />
      <BaseTextComp font={font}>{nextHoliday.residueDays}</BaseTextComp>
      <spacer length={5} />
      <BaseTextComp>天</BaseTextComp>
    </BaseRow>
  </stack>,
  widget
);

widget.presentMedium();
