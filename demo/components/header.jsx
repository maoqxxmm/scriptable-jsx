export const Header = (props) => {
  const { ThemeColor, ThemeConfig, config } = props;

  const myDate = new Date();

  const stackTime = (
    <stack
      backgroundColor={ThemeColor.titleColor}
      size={new Size(88, 13)}
      cornerRadius={7}
      centerAlignContent
    >
      <text
        font={Font.boldRoundedSystemFont(ThemeConfig.titleSize)}
        textColor={ThemeColor.textColor1}
      >{`最近${myDate.getHours().toString().padStart(2, "0")}:${myDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}更新`}</text>
    </stack>
  );

  const stackHeader = (
    <stack size={new Size(158, 13)} centerAlignContent>
      <text
        font={Font.boldRoundedSystemFont(ThemeConfig.titleSize)}
        textColor={ThemeColor.textColor1}
      >{` UID：${config[0]}`}</text>
    </stack>
  );

  const stackServer = (
    <stack
      backgroundColor={ThemeColor.titleColor}
      size={new Size(50, 13)}
      cornerRadius={7}
      centerAlignContent
    >
      <text
        textColor={ThemeColor.textColor1}
        font={Font.boldSystemFont(ThemeConfig.titleSize)}
      >
        {config[1] === "cn_qd01" ? "世界树" : "天空岛"}
      </text>
    </stack>
  );

  return (
    <stack size={new Size(322, 15)} centerAlignContent>
      {/* 标题 */}
      {stackTime}
      <spacer size={3} />
      {stackHeader}
      <spacer size={3} />
      {stackServer}
    </stack>
  );
};
