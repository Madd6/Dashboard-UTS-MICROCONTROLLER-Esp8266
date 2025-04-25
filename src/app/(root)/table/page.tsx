import { createClient } from "@/app/utils/supabase/server";
import MyTable from "@/components/mytable";
import {TotalData} from "@/components/mytable";
import Squares from "@/components/squaresmove";
import { Card } from "@/components/ui/card";
import LetterGlitch from "@/components/ui/letterglitch";

export default async function Page() {
    const supabase = await createClient();
    const { data,count } = await supabase.from("tinggi_air").select('*', { count: 'exact', head: false })
    .order('id', { ascending: false })
    .limit(8);
  return (
    <div className="w-[90%] h-[95vh] m-auto rounded-xl flex flex-col items-center justify-around bg-accent text-accent-foreground">
        <div className="w-full h-[24%] flex items-center justify-around">
            <Card className="w-[32%] h-full rounded-md flex flex-row justify-center items-center gap-2">
                <TotalData data={count ?? ""} />
                <h1 className="text-md font-extralight">data</h1>
            </Card>
            <div className="w-[66%] h-full rounded-md overflow-hidden">
                <LetterGlitch
                    glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
                    glitchSpeed={0}
                    centerVignette={false}
                    outerVignette={true}
                    smooth={true}
                />
            </div>
        </div>
        <div className="w-full h-[73%] flex items-center justify-around">
            <div className="w-[39%] h-full rounded-md">
                <Card className="h-full">
                    <MyTable data={data ?? []} />
                </Card>
            </div>
            <div className="w-[59%] h-full rounded-md overflow-hidden ">
                    <Squares 
                        speed={0.5} 
                        squareSize={40}
                        direction='diagonal' // up, down, left, right, diagonal
                        borderColor='#2b4539'
                        hoverFillColor='#61dca3'
                    />
            </div>
        </div>
        {/* <div className="w-[99%] h-[24%] flex items-center justify-around">
            <div className="w-full h-full bg-red-500 rounded-md"></div>
        </div> */}
    </div>
  )
}
