import { WidgetSizeCenter } from ".";

// reference: https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/widgets
export const initDefaultData = () => {
  // you can add custom data like this
  // --- iOS ---
  WidgetSizeCenter.register("428x926", [170, 170], [364, 170], [364, 382]);
  WidgetSizeCenter.register("414x896", [169, 169], [360, 169], [360, 379]);
  WidgetSizeCenter.register("414x736", [159, 159], [348, 157], [348, 357]);
  WidgetSizeCenter.register("390x844", [158, 158], [338, 158], [338, 354]);
  WidgetSizeCenter.register("375x812", [155, 155], [329, 155], [329, 345]);
  WidgetSizeCenter.register("375x667", [148, 148], [321, 148], [321, 324]);
  WidgetSizeCenter.register("360x780", [155, 155], [329, 155], [329, 345]);
  WidgetSizeCenter.register("320x568", [141, 141], [292, 141], [292, 311]);
  // --- iPadOS ---
  WidgetSizeCenter.register(
    "768x1024",
    [141, 141],
    [305.5, 141],
    [305.5, 305.5],
    [634.5, 305.5]
  );
  WidgetSizeCenter.register(
    "1024x768",
    [141, 141],
    [305.5, 141],
    [305.5, 305.5],
    [634.5, 305.5]
  );
  WidgetSizeCenter.register(
    "810x1080",
    [146, 146],
    [320.5, 146],
    [320.5, 320.5],
    [669, 320.5]
  );
  WidgetSizeCenter.register(
    "1080x810",
    [146, 146],
    [320.5, 146],
    [320.5, 320.5],
    [669, 320.5]
  );
  WidgetSizeCenter.register(
    "834x1112",
    [150, 150],
    [327.5, 150],
    [327.5, 327.5],
    [682, 327.5]
  );
  WidgetSizeCenter.register(
    "1112x834",
    [150, 150],
    [327.5, 150],
    [327.5, 327.5],
    [682, 327.5]
  );
  WidgetSizeCenter.register(
    "820x1180",
    [155, 155],
    [342, 155],
    [342, 342],
    [715.5, 342]
  );
  WidgetSizeCenter.register(
    "1180x820",
    [155, 155],
    [342, 155],
    [342, 342],
    [715.5, 342]
  );
  WidgetSizeCenter.register(
    "834x1194",
    [155, 155],
    [342, 155],
    [342, 342],
    [715.5, 342]
  );
  WidgetSizeCenter.register(
    "1194x834",
    [155, 155],
    [342, 155],
    [342, 342],
    [715.5, 342]
  );
  WidgetSizeCenter.register(
    "1024x1366",
    [170, 170],
    [378.5, 170],
    [378.5, 378.5],
    [795, 378.5]
  );
  WidgetSizeCenter.register(
    "1366x1024",
    [170, 170],
    [378.5, 170],
    [378.5, 378.5],
    [795, 378.5]
  );
  // --- macOS ---
  // I cannot find the specifications for macOS...Use size for iPhone instead...
  WidgetSizeCenter.register("1440x900", [170, 170], [364, 170], [364, 382]);
};
