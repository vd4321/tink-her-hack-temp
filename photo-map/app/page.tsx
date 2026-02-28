/*"use client";

import dynamic from "next/dynamic";

const Map = dynamic(
 () => import("@/components/Map"),
 { ssr:false }
);

export default function Home(){

return(

<main>

<Map />

</main>

);

}*/
"use client";

import dynamic from "next/dynamic";

import Layout from "@/components/Layout";

const Map = dynamic(
 () => import("@/components/Map"),
 { ssr:false }
);

export default function Home(){

return(

<Layout>

<Map/>

</Layout>

);

}