/**
 * 返回原神便笺信息
 *
 * @return {Promise<ResinResponse>} 便笺数据
 */
export async function getData() {
  let randomStr = randomIntFromInterval(100000, 200000);
  let timestamp = Math.floor(Date.now() / 1000);
  let sign = md5(
    "salt=xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs&t=" +
      timestamp +
      "&r=" +
      randomStr +
      "&b=&q=role_id=" +
      config[0] +
      "&server=" +
      config[1]
  );
  let req = new Request(
    "https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?server=" +
      config[1] +
      "&role_id=" +
      config[0]
  );
  req.method = "get";
  req.headers = {
    DS: timestamp + "," + randomStr + "," + sign,
    "x-rpc-app_version": "2.19.1",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.11.1",
    "x-rpc-client_type": "5",
    Referer: "https://webstatic.mihoyo.com/",
    Cookie: config[2],
  };

  let resp = await req.loadJSON();
  let data = resp.data;

  return data;
}

/**
 * 返回原神便笺信息(国际服)
 *
 * @return {Promise<ResinResponse>} 便笺数据
 */
export async function getDataOs() {
  let randomStr = randomStrGen(6);
  let timestamp = Math.floor(Date.now() / 1000);
  let sign = md5(
    "salt=6s25p5ox5y14umn1p61aqyyvbvvl3lrt&t=" + timestamp + "&r=" + randomStr
  );

  let req = new Request(
    "https://bbs-api-os.hoyolab.com/game_record/genshin/api/dailyNote?server=" +
      config[1] +
      "&role_id=" +
      config[0]
  );
  req.method = "GET";
  req.headers = {
    DS: timestamp + "," + randomStr + "," + sign,
    "x-rpc-client_type": "5",
    "x-rpc-app_version": "2.9.1",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBSOversea/2.9.1",
    Origin: "https://act.hoyolab.com",
    Referer: "https://act.hoyolab.com/",
    Cookie: config[2],
  };

  let resp = await req.loadJSON();
  let data = resp.data;

  return data;
}

function randomStrGen(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function getTime(time) {
  let hh = ~~(time / 3600);
  let mm = ~~((time % 3600) / 60);

  return hh + ":" + mm;
}

export async function getClock(time) {
  let timeNow = Date.now();
  let now = new Date(timeNow);
  let hoursNow = now.getHours();
  let minutesNow = now.getMinutes() * 60 * 1000;
  let secondsNow = now.getSeconds() * 1000;
  let timeRecovery = new Date(timeNow + time * 1000);

  let tillTommorow = (24 - hoursNow) * 3600 * 1000;
  let tommorow = timeNow + tillTommorow - minutesNow - secondsNow;

  let str = "";
  if (timeRecovery < tommorow) {
    str = "今日";
  } else if (timeRecovery - tommorow > 86400000) {
    str = `周${"日一二三四五六".charAt(timeRecovery.getDay())}`;
  } else {
    str = "明日";
  }

  return (
    " " +
    str +
    timeRecovery.getHours() +
    "点" +
    timeRecovery.getMinutes() +
    "分"
  );
}

// 获取每日素材信息
export async function getWeeklyMaterialData() {
  const RegionAbbr = { MD: "蒙德", LY: "璃月", DQ: "稻妻" };
  const AvatarMaterial = new Map([
    ["自由", { day: [1, 4], loc: "MD", icon: ziyouIcon }],
    ["繁荣", { day: [1, 4], loc: "LY", icon: fanrongIcon }],
    ["浮世", { day: [1, 4], loc: "DQ", icon: fushiIcon }],
    ["抗争", { day: [2, 5], loc: "MD", icon: kangzhengIcon }],
    ["勤劳", { day: [2, 5], loc: "LY", icon: qinlaoIcon }],
    ["风雅", { day: [2, 5], loc: "DQ", icon: fengyaIcon }],
    ["诗文", { day: [3, 6], loc: "MD", icon: shiwenIcon }],
    ["黄金", { day: [3, 6], loc: "LY", icon: huangjinIcon }],
    ["天光", { day: [3, 6], loc: "DQ", icon: tianguangIcon }],
  ]); // Start from 1: monday

  const WeaponsMaterial = new Map([
    ["高塔孤王", { day: [1, 4], loc: "MD", icon: gaotaIcon }],
    ["孤云寒林", { day: [1, 4], loc: "LY", icon: guyunIcon }],
    ["远海夷地", { day: [1, 4], loc: "DQ", icon: yuanhaiIcon }],
    ["凛风奔狼", { day: [2, 5], loc: "MD", icon: lingfengIcon }],
    ["雾海云间", { day: [2, 5], loc: "LY", icon: wuhaiIcon }],
    ["鸣神御灵", { day: [2, 5], loc: "DQ", icon: mingshenIcon }],
    ["狮牙斗士", { day: [3, 6], loc: "MD", icon: shiyaIcon }],
    ["漆黑陨铁", { day: [3, 6], loc: "LY", icon: qiheiIcon }],
    ["今昔剧画", { day: [3, 6], loc: "DQ", icon: jinxiIcon }],
  ]);

  for (let [key, value] of AvatarMaterial.entries()) {
    value.loc = RegionAbbr[value.loc];
  }

  for (let [key, value] of WeaponsMaterial.entries()) {
    value.loc = RegionAbbr[value.loc];
  }

  return [AvatarMaterial, WeaponsMaterial];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function md5(string) {
  function md5_RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function md5_AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      }
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }
  function md5_F(x, y, z) {
    return (x & y) | (~x & z);
  }
  function md5_G(x, y, z) {
    return (x & z) | (y & ~z);
  }
  function md5_H(x, y, z) {
    return x ^ y ^ z;
  }
  function md5_I(x, y, z) {
    return y ^ (x | ~z);
  }
  function md5_FF(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_GG(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_HH(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_II(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 =
      (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] =
        lWordArray[lWordCount] |
        (string.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function md5_WordToHex(lValue) {
    var WordToHexValue = "",
      WordToHexValue_temp = "",
      lByte,
      lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue =
        WordToHexValue +
        WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  function md5_Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
  string = md5_Utf8Encode(string);
  x = md5_ConvertToWordArray(string);
  a = 0x67452301;
  b = 0xefcdab89;
  c = 0x98badcfe;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
    a = md5_II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
    a = md5_AddUnsigned(a, AA);
    b = md5_AddUnsigned(b, BB);
    c = md5_AddUnsigned(c, CC);
    d = md5_AddUnsigned(d, DD);
  }
  return (
    md5_WordToHex(a) +
    md5_WordToHex(b) +
    md5_WordToHex(c) +
    md5_WordToHex(d)
  ).toLowerCase();
}
