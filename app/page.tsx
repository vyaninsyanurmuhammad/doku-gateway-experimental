'use client'

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import Image from 'next/image'
import { useState } from "react";
import { DokuCheckOut } from "./model/doku-checkout-model";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DokuCheckOut | null>(null);

  const handleOpen = () => setOpen(!open);

  const payHandler = async () => {
    try {
      const response = await fetch("/api/doku-checkout", {
        method: 'POST',
      })

      if (response) {
        const result = await response.json()

        console.log("Success : ", result)
        setData(result)
        handleOpen()
      }
    } catch (error) {
      console.log("Error :", error)
    }
  }

  const checkpayHandler = async () => {
    try {
      const response = await fetch("/api/doku-payment-status", {
        method: 'POST',
      })

      if (response) {
        const result = await response.json()

        console.log("Success : ", result)
        // setData(result)
        // handleOpen()
      }
    } catch (error) {
      console.log("Error :", error)
    }
  }

  return (

    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Button onClick={payHandler} placeholder={undefined}>
          Checkout !
        </Button>
        <Button onClick={checkpayHandler} placeholder={undefined}>
          Check Payment
        </Button>
        <Dialog open={open} handler={handleOpen} placeholder={undefined}>
          {/* <DialogHeader placeholder={undefined} children={undefined}>
          </DialogHeader> */}
          <DialogBody placeholder={undefined}>
           
            {data ? (
              <>
               <iframe className="w-full h-[500px]" src={data.response.payment.url}></iframe>
              </>
            ) : "Kosong"}
          </DialogBody>
          {/* <DialogFooter placeholder={undefined} children={undefined} > */}
            {/* <div className="flex gap-3">
              <Button variant="text" onClick={handleOpen} placeholder={undefined}>
                Cancel
              </Button>
              <Button onClick={payHandler} placeholder={undefined}>
                Pay Now !
              </Button>
            </div> */}
          {/* </DialogFooter> */}
        </Dialog>
      </div>
    </>
  )
}
