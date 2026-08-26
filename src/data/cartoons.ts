// Lista central dos desenhos do acervo.
import barbie from "@/assets/BARBIE.jpg.asset.json";
import superpoderosas from "@/assets/MENINASUPERPODEROSAS.jpg.asset.json";
import frozen from "@/assets/FROZEN.jpg.asset.json";
import espias from "@/assets/3ESPIAS.jpg.asset.json";
import bratz from "@/assets/BRATZ.jpg.asset.json";
import dora from "@/assets/DORA.jpg.asset.json";
import everafter from "@/assets/EVER.jpg.asset.json";
import hellokitty from "@/assets/HELLO_KITTY.jpg.asset.json";
import kim from "@/assets/KIM_POSSIBLE.jpg.asset.json";
import lilo from "@/assets/LILLO.jpg.asset.json";

export type Cartoon = {
  id: string;
  name: string;
  short?: string;
  grad: string;
  image?: string;
  top?: boolean;
};

export const CARTOONS: Cartoon[] = [
  { id: "princesas", name: "Princesas Disney", short: "Ariel, Bela, Cinderela, Rapunzel, Jasmine, Aurora e Branca de Neve", grad: "linear-gradient(160deg,#F9A8D4,#7C3AED)", top: true },
  { id: "barbie", name: "Barbie", grad: "linear-gradient(160deg,#FF7BC0,#D6167E)", image: barbie.url, top: true },
  { id: "winx", name: "Winx Club", grad: "linear-gradient(160deg,#F65BAE,#8A46D6)", top: true },
  { id: "superpoderosas", name: "As Meninas Superpoderosas", grad: "linear-gradient(160deg,#7FD4F5,#2563EB)", image: superpoderosas.url, top: true },
  { id: "frozen", name: "Frozen", grad: "linear-gradient(160deg,#A5E8FF,#3B82F6)", image: frozen.url, top: true },
  { id: "espias", name: "Três Espiãs Demais", grad: "linear-gradient(160deg,#FFB27A,#EF4444)", image: espias.url, top: true },
  { id: "pony", name: "My Little Pony", grad: "linear-gradient(160deg,#C4B5FD,#EC4899)", top: true },
  { id: "moranguinho", name: "Moranguinho", grad: "linear-gradient(160deg,#FF9EBB,#E11D48)", top: true },
  { id: "sailor", name: "Sailor Moon", grad: "linear-gradient(160deg,#FDE68A,#9333EA)", top: true },
  { id: "ladybug", name: "Miraculous: Ladybug", grad: "linear-gradient(160deg,#FCA5A5,#B91C1C)", top: true },
  { id: "hellokitty", name: "Hello Kitty", grad: "linear-gradient(160deg,#FFC2DA,#DB2777)", image: hellokitty.url },
  { id: "polly", name: "Polly Pocket", grad: "linear-gradient(160deg,#FBCFE8,#A21CAF)" },
  { id: "monsterhigh", name: "Monster High", grad: "linear-gradient(160deg,#D8B4FE,#4C1D95)" },
  { id: "bratz", name: "Bratz", grad: "linear-gradient(160deg,#FDA4AF,#9D174D)", image: bratz.url },
  { id: "kim", name: "Kim Possible", grad: "linear-gradient(160deg,#FDBA74,#C2410C)", image: kim.url },
  { id: "everafter", name: "Ever After High", grad: "linear-gradient(160deg,#E9D5FF,#6D28D9)", image: everafter.url },
  { id: "lilo", name: "Lilo & Stitch", grad: "linear-gradient(160deg,#A5E8FF,#0EA5E9)", image: lilo.url },
  { id: "dora", name: "Dora, a Aventureira", grad: "linear-gradient(160deg,#BBF7D0,#15803D)", image: dora.url },
  { id: "peppa", name: "Peppa Pig", grad: "linear-gradient(160deg,#FBCFE8,#DB2777)" },
  { id: "pucca", name: "Pucca", grad: "linear-gradient(160deg,#FCA5A5,#7F1D1D)" },
  { id: "shera", name: "She-Ra", grad: "linear-gradient(160deg,#FDE68A,#B45309)" },
  { id: "witch", name: "W.I.T.C.H.", grad: "linear-gradient(160deg,#A7F3D0,#7C3AED)" },
];

export const TOP_CARTOONS = CARTOONS.filter((c) => c.top);
