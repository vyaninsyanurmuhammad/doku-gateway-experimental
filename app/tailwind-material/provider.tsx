'use client'

import { ThemeProvider } from "@material-tailwind/react"
import React, { ReactNode } from 'react'

export default function TailwindMaterialProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </>
    )
}
