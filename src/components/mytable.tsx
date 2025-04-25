"use client";
import { useRealtimeData,tinggi_air } from "@/app/utils/realtimedata"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
 
 function TotalData({data} : {data:tinggi_air[]}) {
    return (
        <h1 className="text-5xl font-bold">{data?.length}</h1>
    )
 }
 function MyTable({data} : {data:tinggi_air[]}) {
   useRealtimeData("tinggi_air");
   return (
        <Table>
            <TableCaption>data tinggi air.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Tinggi</TableHead>
                    <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell className="text-right">{item.timestamp}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
   )
 }
 
 export default MyTable
 export { MyTable, TotalData };
