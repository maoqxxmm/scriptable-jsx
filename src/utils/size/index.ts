import { initDefaultData } from "./device-data";

export interface WidgetSize {
  width: number;
  height: number;
}

export enum WidgetFamily {
  small = "small",
  medium = "medium",
  large = "large",
  extraLarge = "extraLarge",
}

class WidgetSizeCenterClass {
  private mapper: Map<string, Record<WidgetFamily, WidgetSize>> = new Map();
  // for unregistered screen size
  private defaultSizeMap: Record<WidgetFamily, WidgetSize> = {
    small: {
      width: 170,
      height: 170,
    },
    medium: {
      width: 378.5,
      height: 170,
    },
    large: {
      width: 378.5,
      height: 378.5,
    },
    extraLarge: {
      width: 795,
      height: 378.5,
    },
  };

  register(
    screenSize: string,
    small: [number, number],
    medium: [number, number],
    large: [number, number],
    extraLarge?: [number, number]
  ) {
    this.mapper.set(screenSize, {
      small: {
        width: small[0],
        height: small[1],
      },
      medium: {
        width: medium[0],
        height: medium[1],
      },
      large: {
        width: large[0],
        height: large[1],
      },
      extraLarge: extraLarge
        ? {
            width: extraLarge[0],
            height: extraLarge[1],
          }
        : {
            width: large[0],
            height: large[1],
          },
    });
  }

  /**
   * get widget size
   * @param width screen width
   * @param height screen height
   * @param type widget family
   * @returns WidgetSize
   */
  get(width: number, height: number, type: WidgetFamily) {
    const size = `${width}x${height}`;
    const widgetSizeMapper = this.mapper.get(size);
    if (widgetSizeMapper) {
      return widgetSizeMapper[type];
    } else {
      console.warn(
        `Cannot find target size: ${size}! The FlexibleSize will use default data. It's not accurate!`
      );
      return this.defaultSizeMap[type];
    }
  }
}

export class FlexibleSize {
  /**
   * create flexible size
   * @param width percent of widget width, e.g. 50
   * @param height percent of widget height, e.g. 50
   * @returns Size
   */
  constructor(width: number, height: number) {
    const widgetSize = WidgetSizeCenter.get(
      deviceSize.width,
      deviceSize.height,
      widgetFamily || WidgetFamily.medium
    );
    return new Size(
      (width / 100) * widgetSize.width,
      (height / 100) * widgetSize.height
    );
  }
}

const deviceSize = Device.screenSize();
const widgetFamily = config.widgetFamily as WidgetFamily;

export const WidgetSizeCenter = new WidgetSizeCenterClass();
initDefaultData();
