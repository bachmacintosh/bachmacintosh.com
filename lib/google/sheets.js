import { google, } from "googleapis";

export async function getGtaSheets() {
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
            'Summary!A2:D',
            'Wish List!A2:H',
            'Earnings!F2:H',
            'Properties!A2:F',
            'Vehicles!A2:F',
            'Safes!A2:E',
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
        if(content.properties.length === 0) {
            content.properties.push({
                propertyType: col[0],
                items: [{
                    propertyName: col[1],
                    location: col[2],
                    cost: col[3],
                    gtaWikiLink: col[4],
                    gtaBaseLink: col[5],
                },],
            },);
        } else {
            const exists = content.properties.find((object, index,) => {
                if(object.propertyType === col[0]) {
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
            if(exists === null) {
                content.properties.push({
                    propertyType: col[0],
                    items: [{
                        propertyName: col[1],
                        location: col[2],
                        cost: col[3],
                        gtaWikiLink: col[4],
                        gtaBaseLink: col[5],
                    },],
                },);
            }
        }
    },);

    // Vehicles
    response.data.valueRanges[4].values.forEach((col,) => {
        if(content.vehicles.length === 0) {
            content.vehicles.push({
                location: col[0],
                items: [{
                    floor: col[1],
                    vehicleName: col[2],
                    cost: col[3],
                    gtaWikiLink: col[4],
                    gtaBaseLink: col[5],
                },],
            },);
        } else {
            const exists = content.vehicles.find((object, index,) => {
                if(object.location === col[0]) {
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
            if(exists === null) {
                content.vehicles.push({
                    location: col[0],
                    items: [{
                        floor: col[1],
                        vehicleName: col[2],
                        cost: col[3],
                        gtaWikiLink: col[4],
                        gtaBaseLink: col[5],
                    },],
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

export async function getWkSheets() {
    const content = {
        username: '',
        profileUrl: '',
        level: 0,
        recentUnlocks: [],
        criticalCondition: [],
        recentlyBurned: [],
        srsDistribution: [],
        studyQueue: [],
        details: [],
    };

    const collectionFactory = {
        level: 0,
        radicals: [],
        kanji: [],
        vocabulary: [],
    };

    const itemFactory = {
        characters: '',
        characterImage: '',
        meanings: '',
        url: '',
    };

    const sheets = getSheets();
    const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.GOOGLE_SHEETS_WK_SHEET_ID,
        ranges: [
            'User!B2:B4',
            'Recent Unlocks!B2:G',
            'Critical Condition!B2:G',
            'Recently Burned!B2:G',
            'SRS Distribution!A2:E',
            'Study Queue!A2:J',
            'Details!A2:L',
        ],
    },);
    // User
    [content.username,
        content.profileUrl,
        content.level,] = response.data.valueRanges[0].values;
    return content;
}

function getSheets() {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly",];
    const jwt = new google.auth.JWT(
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        null,
        process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n",),
        scopes,
    );
    return google.sheets({ version: "v4", auth: jwt, },);
}