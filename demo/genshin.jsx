import { render } from "./dom";
import { getDataOs, getData } from "./utils";
import { loadResinIcon } from "./icons";
import { Header } from "./components/header";

const resinIcon = await loadResinIcon();

let resin = {};
try {
  if (config[1].startsWith("os")) {
    resin = await getDataOs();
  } else {
    resin = await getData();
  }
  resin = resin || {};
} catch (error) {
  console.error(error);
}

let widget = await createWidget();
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();

async function createWidget() {
  const widget = new ListWidget();
  const ThemeConfig = Device.isPad()
    ? {
        titleSize: 7,
        coinSize: 10,
        iconSize: 24,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 2,
        textSize: 8,
        infoSize: 14,
        info2Size: 11,
        tipSize: 6,
        avatarSize: 24,
        topSpacer: 30,
        bottomSpacer: 15,
      }
    : {
        titleSize: 7,
        coinSize: 10,
        iconSize: 24,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 2,
        textSize: 8,
        infoSize: 14,
        info2Size: 11,
        tipSize: 6,
        avatarSize: 24,
        topSpacer: 30,
        bottomSpacer: 15,
      };

  const ThemeColor = Device.isUsingDarkAppearance()
    ? {
        textColor1: new Color("C6BBAD"),
        textColor2: new Color("C6BBAD"),
        LabelColor: new Color("31D154"),
        titleColor: new Color("283346"),
        stackColor: new Color("3D4657"),
      }
    : {
        textColor1: new Color("4B5566"),
        textColor2: new Color("5F6776"),
        LabelColor: new Color("FF794A"),
        titleColor: new Color("CEBD98"),
        stackColor: new Color("E0D6C7"),
      };

  const contentStack = (
    <stack size={new Size(322, 125)} centerAlignContent>
      {/* contentLeftStack */}
      <stack size={new Size(140, 118)} centerAlignContent layoutVertically>
        {/* LeftRow1 */}
        <stack
          centerAlignContent
          size={new Size(140, 34)}
          backgroundColor={ThemeColor.stackColor}
          cornerRadius={5}
        >
          <spacer size={2}></spacer>
          {/* LeftStack1 */}
          <stack layoutVertically>
            <image
              source={resinIcon}
              size={new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)}
            ></image>
          </stack>
          <spacer size={2}></spacer>
          {/* LeftStack11 */}
          <stack layoutVertically>
            {/* resinStack */}
            <stack centerAlignContent>
              <text
                textColor={ThemeColor.textColor2}
                font={Font.mediumSystemFont(ThemeConfig.textSize)}
              >
                树脂：
              </text>
              <text
                textColor={ThemeColor.textColor1}
                font={
                  new Font(
                    "AvenirNextCondensed-BoldItalic",
                    ThemeConfig.infoSize
                  )
                }
              >{`${resin.current_resin}`}</text>
              <text
                textColor={ThemeColor.textColor1}
                font={
                  new Font(
                    "AvenirNextCondensed-MediumItalic",
                    ThemeConfig.info2Size
                  )
                }
              >{` / ${resin.max_resin}`}</text>
            </stack>
            {/* resinTipStack */}
            <stack></stack>
          </stack>
          <spacer></spacer>
          {/* LeftStack111 */}
          <stack layoutVertically></stack>
          <spacer size={3}></spacer>
        </stack>
        <spacer size={6}></spacer>
        {/* LeftRow2 */}
        <stack
          centerAlignContent
          size={new Size(140, 34)}
          backgroundColor={ThemeColor.stackColor}
          cornerRadius={5}
        >
          <spacer size={2}></spacer>
          {/* LeftStack2 */}
          <stack layoutVertically></stack>
          <spacer size={2}></spacer>
          {/* LeftStack22 */}
          <stack layoutVertically></stack>
          <spacer></spacer>
          {/* LeftStack222 */}
          <stack layoutVertically></stack>
          <spacer size={3}></spacer>
        </stack>
        <spacer size={6}></spacer>
        {/* LeftRow3 */}
        <stack
          centerAlignContent
          size={new Size(140, 34)}
          backgroundColor={ThemeColor.stackColor}
          cornerRadius={5}
        >
          <spacer size={2}></spacer>
          {/* LeftStack3 */}
          <stack layoutVertically></stack>
          <spacer size={2}></spacer>
          {/* LeftStack33 */}
          <stack layoutVertically></stack>
          <spacer></spacer>
          {/* LeftStack333 */}
          <stack layoutVertically></stack>
          <spacer size={3}></spacer>
        </stack>
        <spacer size={6}></spacer>
      </stack>
      {/* contentRightStack */}
      <stack size={new Size(159, 118)} layoutVertically centerAlignContent>
        {/* RightRow1 */}
        <stack size={new Size(159, 55)}>
          {/* RightStack1 */}
          <stack
            size={new Size(49, 55)}
            backgroundColor={ThemeColor.stackColor}
            cornerRadius={5}
            layoutVertically
          ></stack>
          <spacer size={6}></spacer>
          {/* RightStack2 */}
          <stack
            size={new Size(49, 55)}
            backgroundColor={ThemeColor.stackColor}
            cornerRadius={5}
            layoutVertically
          ></stack>
          <spacer size={6}></spacer>
          {/* RightStack3 */}
          <stack
            size={new Size(49, 55)}
            backgroundColor={ThemeColor.stackColor}
            cornerRadius={5}
          ></stack>
        </stack>
        <spacer size={6}></spacer>
        {/* RightRow2 */}
        <stack
          size={new Size(159, 55)}
          layoutVertically
          cornerRadius={5}
        ></stack>
      </stack>
    </stack>
  );

  render(
    <>
      <Header
        ThemeConfig={ThemeConfig}
        ThemeColor={ThemeColor}
        config={config}
      />
      {contentStack}
    </>,
    widget
  );

  return widget;
}
