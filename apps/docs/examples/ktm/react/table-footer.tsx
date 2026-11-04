"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/react/table"

export default function TableFooterDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "36rem" }}>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: "6.25rem" }}>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead align="end">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell align="end">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell align="end">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>INV003</TableCell>
            <TableCell>Unpaid</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell align="end">$350.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="end">$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
