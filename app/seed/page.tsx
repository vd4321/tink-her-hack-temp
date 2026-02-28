"use client";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const spots = [
  // ── KERALA ──
  { name:"Alleppey Backwaters", loc:"Alappuzha, Kerala", lat:9.4981, lng:76.3388, type:"Landscape", vibe:"Golden Hour", access:"Easy", crowd:3, bestHour:6, rating:4.9, emoji:"🚣", tip:"Rent a houseboat and shoot the sunrise reflection on still water — best in winter months." },
  { name:"Munnar Tea Gardens", loc:"Munnar, Kerala", lat:10.0889, lng:77.0595, type:"Landscape", vibe:"Minimal", access:"Easy", crowd:2, bestHour:7, rating:4.8, emoji:"🍃", tip:"The rolling green carpet looks best after light rain — mist clings to the valleys until 9am." },
  { name:"Varkala Cliff", loc:"Varkala, Kerala", lat:8.7334, lng:76.7163, type:"Landscape", vibe:"Golden Hour", access:"Easy", crowd:3, bestHour:18, rating:4.7, emoji:"🏖", tip:"Shoot from the northern cliff edge at sunset — the red laterite rock glows against the Arabian Sea." },
  { name:"Athirappilly Waterfall", loc:"Thrissur, Kerala", lat:10.2867, lng:76.5694, type:"Landscape", vibe:"Moody", access:"Hike", crowd:4, bestHour:8, rating:4.8, emoji:"💧", tip:"Monsoon season July-Aug gives maximum flow — use a ND filter for silky water effect." },
  { name:"Wayanad Chembra Peak", loc:"Wayanad, Kerala", lat:11.5164, lng:76.0342, type:"Landscape", vibe:"Moody", access:"Hike", crowd:2, bestHour:6, rating:4.9, emoji:"⛰", tip:"Heart-shaped lake at the top — arrive before sunrise for a cloud sea below you." },
  { name:"Kovalam Beach", loc:"Trivandrum, Kerala", lat:8.4004, lng:76.9787, type:"Street", vibe:"Golden Hour", access:"Easy", crowd:4, bestHour:18, rating:4.6, emoji:"🌊", tip:"Lighthouse beach from the lighthouse top — panoramic view of the curved coastline." },
  { name:"Padmanabhaswamy Temple", loc:"Trivandrum, Kerala", lat:8.4824, lng:76.9471, type:"Street", vibe:"Urban", access:"Easy", crowd:5, bestHour:7, rating:4.7, emoji:"🛕", tip:"Shoot the gopuram reflection in the temple pond at dawn — golden light hits perfectly at 7am." },
  { name:"Bekal Fort", loc:"Kasaragod, Kerala", lat:12.3908, lng:75.0331, type:"Landscape", vibe:"Moody", access:"Easy", crowd:2, bestHour:17, rating:4.7, emoji:"🏰", tip:"The keyhole window view of the sea is iconic — late afternoon light frames it dramatically." },
  { name:"Kumarakom Bird Sanctuary", loc:"Kottayam, Kerala", lat:9.6167, lng:76.4333, type:"Reels", vibe:"Minimal", access:"Easy", crowd:1, bestHour:6, rating:4.8, emoji:"🦢", tip:"November to February for migratory birds — canoe through the narrow channels for close shots." },
  { name:"Silent Valley National Park", loc:"Palakkad, Kerala", lat:11.0833, lng:76.4500, type:"Landscape", vibe:"Cinematic", access:"Permit", crowd:1, bestHour:7, rating:4.9, emoji:"🌿", tip:"Permit required but worth it — untouched rainforest with lion-tailed macaques in morning light." },
  { name:"Ponmudi Hills", loc:"Trivandrum, Kerala", lat:8.7500, lng:77.1333, type:"Landscape", vibe:"Moody", access:"Easy", crowd:2, bestHour:6, rating:4.7, emoji:"🌄", tip:"Winding road through mist — shoot the hairpin bends from above for a dramatic leading line." },
  { name:"Fort Kochi Streets", loc:"Kochi, Kerala", lat:9.9658, lng:76.2421, type:"Street", vibe:"Urban", access:"Easy", crowd:3, bestHour:8, rating:4.8, emoji:"⚓", tip:"Chinese fishing nets at sunrise with fishermen working — combine with the Dutch Palace architecture nearby." },
  { name:"Eravikulam National Park", loc:"Munnar, Kerala", lat:10.1667, lng:77.0667, type:"Landscape", vibe:"Minimal", access:"Easy", crowd:3, bestHour:7, rating:4.8, emoji:"🦌", tip:"Nilgiri Tahr (mountain goats) are fearless — wide angle close-ups with the rolling hills behind." },
  { name:"Poovar Island", loc:"Trivandrum, Kerala", lat:8.3167, lng:77.0833, type:"Landscape", vibe:"Golden Hour", access:"Easy", crowd:1, bestHour:6, rating:4.9, emoji:"🏝", tip:"Backwater meets the sea — the floating bridge at sunrise gives a surreal golden reflection." },
  { name:"Vagamon Meadows", loc:"Idukki, Kerala", lat:9.6833, lng:76.9000, type:"Landscape", vibe:"Minimal", access:"Easy", crowd:2, bestHour:7, rating:4.7, emoji:"🌾", tip:"Rolling pine forests and meadows — fog rolls in every morning, clearing by 9am for clean shots." },
  { name:"Thrissur Pooram Festival", loc:"Thrissur, Kerala", lat:10.5276, lng:76.2144, type:"Street", vibe:"Cinematic", access:"Easy", crowd:5, bestHour:18, rating:4.9, emoji:"🐘", tip:"April/May festival — caparisoned elephants and fireworks. Shoot from rooftops for the full spectacle." },
  { name:"Marari Beach", loc:"Alappuzha, Kerala", lat:9.5833, lng:76.3000, type:"Portrait", vibe:"Golden Hour", access:"Easy", crowd:1, bestHour:6, rating:4.8, emoji:"🌅", tip:"One of Kerala's least crowded beaches — local fishermen launch boats at dawn, perfect candid portraits." },
  { name:"Gavi Forest", loc:"Pathanamthitta, Kerala", lat:9.4167, lng:77.1500, type:"Landscape", vibe:"Moody", access:"4WD", crowd:1, bestHour:7, rating:4.9, emoji:"🌲", tip:"Ecotourism zone deep in the forest — elephants at the lake at dusk if you're patient and quiet." },
  { name:"Kappad Beach", loc:"Kozhikode, Kerala", lat:11.3167, lng:75.7167, type:"Landscape", vibe:"Moody", access:"Easy", crowd:2, bestHour:17, rating:4.6, emoji:"🪨", tip:"Rocky coastline where Vasco da Gama landed — dramatic wave crashes against the ancient rocks." },
  { name:"Neelimala Viewpoint", loc:"Wayanad, Kerala", lat:11.6167, lng:76.1833, type:"Landscape", vibe:"Minimal", access:"Hike", crowd:1, bestHour:6, rating:4.8, emoji:"🌁", tip:"2km trek at dawn — the Meenmutty waterfalls and valley below are best before the mist clears." },

  // ── REST OF INDIA ──
  { name:"Taj Mahal", loc:"Agra, India", lat:27.1751, lng:78.0421, type:"Landscape", vibe:"Minimal", access:"Easy", crowd:4, bestHour:6, rating:4.9, emoji:"🕌", tip:"Gates open at sunrise — first 20 minutes the light is pink and crowds are thin." },
  { name:"Varanasi Ghats", loc:"Varanasi, India", lat:25.3176, lng:83.0130, type:"Street", vibe:"Cinematic", access:"Easy", crowd:4, bestHour:6, rating:4.9, emoji:"🪔", tip:"Boat on the Ganges at dawn — the aarti ceremony and cremation ghats are visually overwhelming." },
  { name:"Rann of Kutch", loc:"Gujarat, India", lat:23.7337, lng:69.8597, type:"Landscape", vibe:"Minimal", access:"4WD", crowd:1, bestHour:19, rating:4.8, emoji:"🧂", tip:"Full moon nights turn the white salt desert silver — November Rann Utsav festival is magical." },
  { name:"Hampi Ruins", loc:"Karnataka, India", lat:15.3350, lng:76.4600, type:"Landscape", vibe:"Moody", access:"Easy", crowd:2, bestHour:7, rating:4.8, emoji:"🏛", tip:"Virupaksha Temple framed by boulder fields at golden hour — rent a bicycle to cover the vast site." },
];
async function seed() {
  for (const spot of spots) {
    await addDoc(collection(db, "spots"), spot);
  }
  alert("✅ Done! " + spots.length + " spots added to Firestore.");
}

export default function SeedPage() {
  return (
    <div style={{ padding: "40px", fontFamily: "monospace", background: "#090d12", minHeight: "100vh", color: "#f0f4f8" }}>
      <h1 style={{ color: "#e8ff47", marginBottom: "20px" }}>🌱 Seed Firestore</h1>
      <p style={{ color: "#6b7f92", marginBottom: "30px" }}>
        Click the button below to add {spots.length} sample spots to your Firestore database.
        <br/>Only do this <strong style={{ color: "#ff6b35" }}>once</strong> — clicking multiple times will duplicate the data.
      </p>
      <button
        onClick={seed}
        style={{ background: "#e8ff47", color: "#090d12", border: "none", padding: "14px 28px",
          borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}>
        Add {spots.length} Spots to Firestore →
      </button>
    </div>
  );
}