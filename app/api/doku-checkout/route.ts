import { generateSignature } from "@/app/doku-ultils/doku-utils";
import { DokuVariablesData, timeStampString } from "@/app/doku-ultils/dokuConfig";
import { DokuCheckOut } from "@/app/model/doku-checkout-model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const raw = JSON.stringify({
            "order": {
                "amount": 10500,
                "invoice_number": `INV-${timeStampString}`,
                "currency": "IDR",
                "session_id": "SU5WFDferd561dfasfasdfae123c",
                "callback_url": "https://doku.com/",
                "line_items": [
                    {
                        "name": "DOKU T-Shirt",
                        "price": 10500,
                        "quantity": 1
                    }
                ]
            },
            "payment": {
                "payment_due_date": 60
            },
            "customer": {
                "name": "Anton Budiman",
                "email": "anton@doku.com",
                "phone": "+6285694566147",
                "address": "Plaza Asia Office Park Unit 3",
                "country": "ID"
            }
        })

        const myHeaders = new Headers()
        myHeaders.append("Client-Id", DokuVariablesData.Client_Id)
        myHeaders.append("Request-Id", DokuVariablesData.Request_Id)
        myHeaders.append("Request-Timestamp", DokuVariablesData.Request_Timestamp)
        myHeaders.append("Signature", generateSignature(raw))
        myHeaders.append("Content-Type", "application/json")

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        const resultFetch = await fetch("https://api-sandbox.doku.com/checkout/v1/payment", requestOptions)

        const resultFetchString = await resultFetch.json()

        return NextResponse.json(
            resultFetchString

        )
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
