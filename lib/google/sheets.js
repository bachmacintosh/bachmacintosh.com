import { google, } from "googleapis";

export async function getGtaSheets() {
    let content = {
        summary: [],
        wishList: [],
        earnings: [],
        properties: [],
        vehicles: [],
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
            'Safes!A2:G',
        ],
    });

    // Summary
    response.data.valueRanges[0].values.map(function(col) {
        content.summary.push({
            title: col[0],
            summaryType: col[1],
            gtaDollars: col[2],
            sharkCardUsd: col[3] ?? null,
        });
    });

    // Wish List
    response.data.valueRanges[1].values.map(function(col) {
        content.wishList.push({
            item: col[0],
            buyAt: col[1],
            cost: col[2],
            totalGrindDays: col[3],
            moneyToGrind: col[4],
            daysToGrind: col[5],
            readyToBuy: col[6],
            earliestBuyDate: col[7],
        });
    });

    // Earnings
    response.data.valueRanges[2].values.map(function(col) {
        content.earnings.push({
            balanceDate: col[0],
            balance: col[1],
            earnings: col[2],
        });
    });

    // Properties
    response.data.valueRanges[3].values.map(function(col) {
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
            });
        } else {
            let exists = content.properties.find(function(o, i) {
                if(o.propertyType === col[0]) {
                    content.properties[i].items.push({
                        propertyName: col[1],
                        location: col[2],
                        cost: col[3],
                        gtaWikiLink: col[4],
                        gtaBaseLink: col[5],
                    });
                    return true;
                }
            });
            if(exists === undefined) {
                content.properties.push({
                    propertyType: col[0],
                    items: [{
                        propertyName: col[1],
                        location: col[2],
                        cost: col[3],
                        gtaWikiLink: col[4],
                        gtaBaseLink: col[5],
                    },],
                });
            }
        }
    });

    // Vehicles
    response.data.valueRanges[4].values.map(function(col) {
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
            });
        } else {
            let exists = content.vehicles.find(function(o, i) {
                if(o.location === col[0]) {
                    content.vehicles[i].items.push({
                        floor: col[1],
                        vehicleName: col[2],
                        cost: col[3],
                        gtaWikiLink: col[4],
                        gtaBaseLink: col[5],
                    });
                    return true;
                }
            });
            if(exists === undefined) {
                content.vehicles.push({
                    location: col[0],
                    items: [{
                        floor: col[1],
                        vehicleName: col[2],
                        cost: col[3],
                        gtaWikiLink: col[4],
                        gtaBaseLink: col[5],
                    },],
                });
            }
        }
    });
    return content;
}

function getSheets() {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly",];
    const jwt = new google.auth.JWT(
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        null,
        process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
        scopes
    );
    return google.sheets({ version: "v4", auth: jwt, });
}