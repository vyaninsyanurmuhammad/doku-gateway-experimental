import {
  generateSignature,
  generateSignatureCheck,
} from "@/app/doku-ultils/doku-utils";
import {
  DokuVariablesData,
  timeStampString,
} from "@/app/doku-ultils/dokuConfig";
import { DokuCheckOut } from "@/app/model/doku-checkout-model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const invoiceNumber = "INV-1717141344067";

    const myHeaders = new Headers();
    myHeaders.append("Client-Id", DokuVariablesData.Client_Id);
    myHeaders.append("Request-Id", DokuVariablesData.Request_Id);
    myHeaders.append("Request-Timestamp", DokuVariablesData.Request_Timestamp);
    myHeaders.append("Signature", generateSignatureCheck(invoiceNumber));
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };

    const resultFetch = await fetch(
      `https://api-sandbox.doku.com/orders/v1/status/${invoiceNumber}`,
      requestOptions
    );

    const resultFetchString = await resultFetch.json();

    return NextResponse.json(resultFetchString);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
