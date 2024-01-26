"use client"
import * as React from "react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function EmptySearch() {
    return (
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                No se encontraron resultados para tu búsqueda.
            </AlertDescription>
        </Alert>
    )
}