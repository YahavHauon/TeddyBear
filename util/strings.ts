export const attributes = {
  attributeArray: [
    "Aoe clear",
    "Engager",
    "TopLaner",
    "Low cd",
    "MidLaner",
    "Jungler",
    "Good Ult",
    "Support",
  ],
};

export const cardPropety = {
  tags: "tags",
  age: "age",
  imageArray: "imageArray",
  hasSeen: "hasSeen",
};

export const notificationStrings = {
  triggeredNotificationTitle: "You got a match",
  notificationTitle: (name: string) => `You matched with ${name}`,
  noNotificationsText: "You currently have no notifications",
};

export const apiDomains = {
  championPictureTemplet: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/`,
};

export const queryTag = {
  champions: "champions",
};

export const asyncStorageTags = {
  notifyArray: "notifyArray",
  unReadMsgs: "unReadMsgs",
};

export const screens = {
  modalScreen: "Modal",
  homeScreen: "Home",
  notificationsScreen: "Notification",
  modalTitle: "Pictures",
  notificationsTitle: "Notifications",
};

export const noMoreMatches = {
  part1: "No more matches in your location",
  part2: "try again later",
};
