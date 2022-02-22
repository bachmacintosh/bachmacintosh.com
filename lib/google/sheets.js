import { google, } from "googleapis";

export async function getGtaSheets () {
  const content = {
    summary: [],
    wishList: [],
    earnings: [],
    properties: [],
    vehicles: [],
    safes: [],
  };

  const sheets = getSheets();
  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: process.env.GOOGLE_SHEETS_GTA_SHEET_ID,
    ranges: [
      "Summary!A2:D",
      "Wish List!A2:H",
      "Earnings!F2:H",
      "Properties!A2:F",
      "Vehicles!A2:F",
      "Safes!A2:E",
    ],
  },);

  // Summary
  response.data.valueRanges[0].values.forEach((col,) => {
    content.summary.push({
      title: col[0],
      summaryType: col[1],
      gtaDollars: col[2],
      sharkCardUsd: col[3] ?? null,
    },);
  },);

  // Wish List
  response.data.valueRanges[1].values.forEach((col,) => {
    content.wishList.push({
      item: col[0],
      buyAt: col[1],
      cost: col[2],
      totalGrindDays: col[3],
      moneyToGrind: col[4],
      daysToGrind: col[5],
      readyToBuy: col[6],
      earliestBuyDate: col[7],
    },);
  },);

  // Earnings
  response.data.valueRanges[2].values.forEach((col,) => {
    content.earnings.push({
      balanceDate: col[0],
      balance: col[1],
      earnings: col[2],
    },);
  },);

  // Properties
  response.data.valueRanges[3].values.forEach((col,) => {
    if (content.properties.length === 0) {
      content.properties.push({
        propertyType: col[0],
        items: [
          {
            propertyName: col[1],
            location: col[2],
            cost: col[3],
            gtaWikiLink: col[4],
            gtaBaseLink: col[5],
          },
        ],
      },);
    } else {
      const exists = content.properties.find((object, index,) => {
        if (object.propertyType === col[0]) {
          content.properties[index].items.push({
            propertyName: col[1],
            location: col[2],
            cost: col[3],
            gtaWikiLink: col[4],
            gtaBaseLink: col[5],
          },);
          return true;
        } else {
          return null;
        }
      },);
      if (typeof exists === "undefined") {
        content.properties.push({
          propertyType: col[0],
          items: [
            {
              propertyName: col[1],
              location: col[2],
              cost: col[3],
              gtaWikiLink: col[4],
              gtaBaseLink: col[5],
            },
          ],
        },);
      }
    }
  },);

  // Vehicles
  response.data.valueRanges[4].values.forEach((col,) => {
    if (content.vehicles.length === 0) {
      content.vehicles.push({
        location: col[0],
        items: [
          {
            floor: col[1],
            vehicleName: col[2],
            cost: col[3],
            gtaWikiLink: col[4],
            gtaBaseLink: col[5],
          },
        ],
      },);
    } else {
      const exists = content.vehicles.find((object, index,) => {
        if (object.location === col[0]) {
          content.vehicles[index].items.push({
            floor: col[1],
            vehicleName: col[2],
            cost: col[3],
            gtaWikiLink: col[4],
            gtaBaseLink: col[5],
          },);
          return true;
        } else {
          return null;
        }
      },);
      if (typeof exists === "undefined") {
        content.vehicles.push({
          location: col[0],
          items: [
            {
              floor: col[1],
              vehicleName: col[2],
              cost: col[3],
              gtaWikiLink: col[4],
              gtaBaseLink: col[5],
            },
          ],
        },);
      }
    }
  },);

  // Safes
  response.data.valueRanges[5].values.forEach((col,) => {
    content.safes.push({
      location: col[0],
      safeCapacity: col[1],
      moneyPerIgDay: col[2],
      moneyPer24Hours: col[3],
      daysToFill: col[4],
    },);
  },);
  return content;
}

export async function getWkSheets () {
  const content = {
    username: "",
    profileUrl: "",
    level: 0,
    recentUnlocks: [],
    criticalCondition: [],
    recentlyBurned: [],
    srsDistribution: [],
    studyQueue: {
      lessons: [],
      reviews: {
        "12:00 AM": [],
        "1:00 AM": [],
        "2:00 AM": [],
        "3:00 AM": [],
        "4:00 AM": [],
        "5:00 AM": [],
        "6:00 AM": [],
        "7:00 AM": [],
        "8:00 AM": [],
        "9:00 AM": [],
        "10:00 AM": [],
        "11:00 AM": [],
        "12:00 PM": [],
        "1:00 PM": [],
        "2:00 PM": [],
        "3:00 PM": [],
        "4:00 PM": [],
        "5:00 PM": [],
        "6:00 PM": [],
        "7:00 PM": [],
        "8:00 PM": [],
        "9:00 PM": [],
        "10:00 PM": [],
        "11:00 PM": [],
      },
    },
    details: [],
  };

  const itemFactory = {
    characters: "",
    characterImage: "",
    meanings: "",
    url: "",
    stage: 0,
  };

  const sheets = getSheets();
  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: process.env.GOOGLE_SHEETS_WK_SHEET_ID,
    ranges: [
      "User!B2:B4",
      "Recent Unlocks!B2:G",
      "Critical Condition!B2:G",
      "Recently Burned!B2:G",
      "SRS Distribution!A2:E",
      "Study Queue!A2:J",
      "Details!A2:L",
    ],
  },);

  // User
  [
    content.username,
    content.profileUrl,
    content.level,
  ] = response.data.valueRanges[0].values;

  // Recent Unlocks
  if (typeof response.data.valueRanges[1].values === "undefined") {
    content.recentUnlocks = null;
  } else {
    response.data.valueRanges[1].values.forEach((col,) => {
      if (content.recentUnlocks.length === 0) {
        const collectionFactory = getCollectionFactory();
        prepCollectionFactory(col, collectionFactory, itemFactory,);
        content.recentUnlocks.push(collectionFactory,);
      } else {
        itemFactory.characters = col[2];
        itemFactory.characterImage = col[3];
        itemFactory.meanings = col[4];
        itemFactory.url = col[5];
        const exists = content.recentUnlocks
          .find((object,) => {
            if (object.level === col[0]) {
              if (col[1] === "Radical") {
                object.radicals.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else if (col[1] === "Kanji") {
                object.kanji.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else if (col[1] === "Vocabulary") {
                object.vocabulary.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else {
                throw Error(`Unexpected WaniKani Subject type ${col[1]}`,);
              }
              return true;
            } else {
              return null;
            }
          },);
        if (typeof exists === "undefined") {
          const collectionFactory = getCollectionFactory();
          prepCollectionFactory(col, collectionFactory, itemFactory,);
          content.recentUnlocks.push(collectionFactory,);
        }
      }
    },);
    content.recentUnlocks.sort((itemA, itemB,) => {
      return itemA.level - itemB.level;
    },);
  }

  // Critical Condition
  if (typeof response.data.valueRanges[2].values === "undefined") {
    content.criticalCondition = null;
  } else {
    response.data.valueRanges[2].values.forEach((col,) => {
      if (content.criticalCondition.length === 0) {
        const collectionFactory = getCollectionFactory();
        prepCollectionFactory(col, collectionFactory, itemFactory,);
        content.criticalCondition.push(collectionFactory,);
      } else {
        itemFactory.characters = col[2];
        itemFactory.characterImage = col[3];
        itemFactory.meanings = col[4];
        itemFactory.url = col[5];
        const exists = content.criticalCondition
          .find((object,) => {
            if (object.level === col[0]) {
              if (col[1] === "Radical") {
                object.radicals.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else if (col[1] === "Kanji") {
                object.kanji.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else if (col[1] === "Vocabulary") {
                object.vocabulary.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else {
                throw Error(`Unexpected WaniKani Subject type ${col[1]}`,);
              }
              return true;
            } else {
              return null;
            }
          },);
        if (typeof exists === "undefined") {
          const collectionFactory = getCollectionFactory();
          prepCollectionFactory(col, collectionFactory, itemFactory,);
          content.criticalCondition.push(collectionFactory,);
        }
      }
    },);
    content.criticalCondition.sort((itemA, itemB,) => {
      return itemA.level - itemB.level;
    },);
  }

  // Recently Burned
  if (typeof response.data.valueRanges[3].values === "undefined") {
    content.recentlyBurned = null;
  } else {
    response.data.valueRanges[3].values.forEach((col,) => {
      if (content.recentlyBurned.length === 0) {
        const collectionFactory = getCollectionFactory();
        prepCollectionFactory(col, collectionFactory, itemFactory,);
        content.recentlyBurned.push(collectionFactory,);
      } else {
        itemFactory.characters = col[2];
        itemFactory.characterImage = col[3];
        itemFactory.meanings = col[4];
        itemFactory.url = col[5];
        const exists = content.recentlyBurned
          .find((object,) => {
            if (object.level === col[0]) {
              if (col[1] === "Radical") {
                object.radicals.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else if (col[1] === "Kanji") {
                object.kanji.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else if (col[1] === "Vocabulary") {
                object.vocabulary.push({
                  characters: itemFactory.characters,
                  characterImage: itemFactory.characterImage,
                  meanings: itemFactory.meanings,
                  url: itemFactory.url,
                },);
              } else {
                throw Error(`Unexpected WaniKani Subject type ${col[1]}`,);
              }
              return true;
            } else {
              return null;
            }
          },);
        if (typeof exists === "undefined") {
          const collectionFactory = getCollectionFactory();
          prepCollectionFactory(col, collectionFactory, itemFactory,);
          content.recentlyBurned.push(collectionFactory,);
        }
      }
    },);
    content.recentlyBurned.sort((itemA, itemB,) => {
      return itemA.level - itemB.level;
    },);
  }

  // SRS Distribution
  response.data.valueRanges[4].values.forEach((col,) => {
    content.srsDistribution.push({
      name: col[0],
      radicals: col[1],
      kanji: col[2],
      vocabulary: col[3],
      total: col[4],
    },);
  },);

  // Study Queue -- Lessons
  if (typeof response.data.valueRanges[5].values === "undefined") {
    content.studyQueue.lessons = null;
  } else {
    response.data.valueRanges[5].values.forEach((col,) => {
      if (col[0] === "Lessons") {
        if (content.studyQueue.lessons.length === 0) {
          const collectionFactory = getCollectionFactory();
          prepStudyQueueCollectionFactory(col, collectionFactory, itemFactory,);
          content.studyQueue.lessons.push(collectionFactory,);
        } else {
          itemFactory.characters = col[6];
          itemFactory.characterImage = col[7];
          itemFactory.meanings = col[8];
          itemFactory.url = col[9];
          const exists = content.studyQueue.lessons
            .find((object,) => {
              if (object.level === col[4]) {
                if (col[5] === "Radical") {
                  object.radicals.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                  },);
                } else if (col[5] === "Kanji") {
                  object.kanji.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                  },);
                } else if (col[5] === "Vocabulary") {
                  object.vocabulary.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                  },);
                } else {
                  throw Error(`Unexpected WaniKani Subject type ${col[5]}`,);
                }
                return true;
              } else {
                return null;
              }
            },);
          if (typeof exists === "undefined") {
            const collectionFactory = getCollectionFactory();
            prepStudyQueueCollectionFactory(col,
              collectionFactory,
              itemFactory,);
            content.studyQueue.lessons.push(collectionFactory,);
          }
        }
      }
    },);
    if (content.studyQueue.lessons.length === 0) {
      content.studyQueue.lessons = null;
    } else {
      content.studyQueue.lessons.sort((itemA, itemB,) => {
        return itemA.level - itemB.level;
      },);
    }
  }

  // Study Queue -- Reviews
  if (typeof response.data.valueRanges[5].values === "undefined") {
    content.studyQueue.reviews = null;
  } else {
    response.data.valueRanges[5].values.forEach((col,) => {
      if (col[0] === "Reviews") {
        if (content.studyQueue.reviews[col[2]].length === 0) {
          const collectionFactory = getCollectionFactory();
          prepStudyQueueCollectionFactory(col, collectionFactory, itemFactory,);
          content.studyQueue.reviews[col[2]].push(collectionFactory,);
        } else {
          itemFactory.characters = col[6];
          itemFactory.characterImage = col[7];
          itemFactory.meanings = col[8];
          itemFactory.url = col[9];
          const exists = content.studyQueue.reviews[col[2]]
            .find((object,) => {
              if (object.level === col[4]) {
                if (col[5] === "Radical") {
                  object.radicals.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                  },);
                } else if (col[5] === "Kanji") {
                  object.kanji.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                  },);
                } else if (col[5] === "Vocabulary") {
                  object.vocabulary.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                  },);
                } else {
                  throw Error(`Unexpected WaniKani Subject type ${col[5]}`,);
                }
                return true;
              } else {
                return null;
              }
            },);
          if (typeof exists === "undefined") {
            const collectionFactory = getCollectionFactory();
            prepStudyQueueCollectionFactory(col,
              collectionFactory,
              itemFactory,);
            content.studyQueue.reviews[col[2]].push(collectionFactory,);
          }
        }
      }
    },);
    Object.keys(content.studyQueue.reviews,).forEach((key,) => {
      if (content.studyQueue.reviews[key].length === 0) {
        content.studyQueue.reviews[key] = null;
      } else {
        content.studyQueue.reviews[key].sort((itemA, itemB,) => {
          return itemA.level - itemB.level;
        },);
      }
    },);
  }

  // Details
  if (typeof response.data.valueRanges[6].values === "undefined") {
    content.details = null;
  } else {
    response.data.valueRanges[6].values.forEach((col,) => {
      if (parseInt(col[0], 10,) <= parseInt(content.level, 10,)) {
        if (content.details.length === 0) {
          const collectionFactory = getCollectionFactory();
          prepDetailCollectionFactory(col, collectionFactory, itemFactory,);
          content.details.push(collectionFactory,);
        } else {
          itemFactory.characters = col[2];
          itemFactory.characterImage = col[3];
          itemFactory.meanings = col[4];
          itemFactory.url = col[5];
          itemFactory.stage = col[7] ?? null;
          const exists = content.details
            .find((object,) => {
              if (object.level === col[0]) {
                if (col[1] === "Radical") {
                  object.radicals.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                    stage: itemFactory.stage,
                  },);
                } else if (col[1] === "Kanji") {
                  object.kanji.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                    stage: itemFactory.stage,
                  },);
                } else if (col[1] === "Vocabulary") {
                  object.vocabulary.push({
                    characters: itemFactory.characters,
                    characterImage: itemFactory.characterImage,
                    meanings: itemFactory.meanings,
                    url: itemFactory.url,
                    stage: itemFactory.stage,
                  },);
                } else {
                  throw Error(`Unexpected WaniKani Subject type ${col[1]}`,);
                }
                return true;
              } else {
                return null;
              }
            },);
          if (typeof exists === "undefined") {
            const collectionFactory = getCollectionFactory();
            prepDetailCollectionFactory(col, collectionFactory, itemFactory,);
            content.details.push(collectionFactory,);
          }
        }
      }
    },);
    content.details.sort((itemA, itemB,) => {
      return itemA.level - itemB.level;
    },);
  }

  return content;
}

function getCollectionFactory () {
  return {
    level: 0,
    radicals: [],
    kanji: [],
    vocabulary: [],
  };
}

function prepCollectionFactory (col, collectionFactory, itemFactory,) {
  itemFactory.characters = col[2];
  itemFactory.characterImage = col[3];
  itemFactory.meanings = col[4];
  itemFactory.url = col[5];
  collectionFactory.level = col[0];
  if (col[1] === "Radical") {
    collectionFactory.radicals.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
    },);
  } else if (col[1] === "Kanji") {
    collectionFactory.kanji.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
    },);
  } else if (col[1] === "Vocabulary") {
    collectionFactory.vocabulary.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
    },);
  } else {
    throw Error(`Unexpected WaniKani Subject type ${col[1]}`,);
  }
}

function prepDetailCollectionFactory (col, collectionFactory, itemFactory,) {
  itemFactory.characters = col[2];
  itemFactory.characterImage = col[3];
  itemFactory.meanings = col[4];
  itemFactory.url = col[5];
  collectionFactory.level = col[0];
  itemFactory.stage = col[7] ?? null;
  if (col[1] === "Radical") {
    collectionFactory.radicals.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
      stage: itemFactory.stage,
    },);
  } else if (col[1] === "Kanji") {
    collectionFactory.kanji.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
      stage: itemFactory.stage,
    },);
  } else if (col[1] === "Vocabulary") {
    collectionFactory.vocabulary.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
      stage: itemFactory.stage,
    },);
  } else {
    throw Error(`Unexpected WaniKani Subject type ${col[1]}`,);
  }
}

function prepStudyQueueCollectionFactory (
  col, collectionFactory, itemFactory,) {
  itemFactory.characters = col[6];
  itemFactory.characterImage = col[7];
  itemFactory.meanings = col[8];
  itemFactory.url = col[9];
  collectionFactory.level = col[4];
  if (col[5] === "Radical") {
    collectionFactory.radicals.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
    },);
  } else if (col[5] === "Kanji") {
    collectionFactory.kanji.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
    },);
  } else if (col[5] === "Vocabulary") {
    collectionFactory.vocabulary.push({
      characters: itemFactory.characters,
      characterImage: itemFactory.characterImage,
      meanings: itemFactory.meanings,
      url: itemFactory.url,
    },);
  } else {
    throw Error(`Unexpected WaniKani Subject type ${col[1]}`,);
  }
}

function getSheets () {
  const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly",];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/gu, "\n",),
    scopes,
  );
  return google.sheets({ version: "v4", auth: jwt, },);
}
