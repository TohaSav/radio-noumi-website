import { Track } from "@/types/track";

export const getDemoTracks = (): Track[] => [
  {
    id: "1",
    title: "Midnight Dreams",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "1.2M",
    addedAt: Date.now() - 86400000,
  },
  {
    id: "2",
    title: "Electric Pulse",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "890K",
    addedAt: Date.now() - 172800000,
  },
  {
    id: "3",
    title: "Ocean Waves",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "654K",
    addedAt: Date.now() - 259200000,
  },
  // ... остальные треки сокращены для краткости
  {
    id: "10",
    title: "Velvet Moon",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "154K",
    addedAt: Date.now() - 864000000,
  },
  {
    id: "11",
    title: "Neon Lights",
    artist: "Synth Masters",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop",
    plays: "2.1M",
    addedAt: Date.now() - 432000000,
  },
  {
    id: "12",
    title: "Digital Rain",
    artist: "Cyber Phoenix",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "1.8M",
    addedAt: Date.now() - 518400000,
  },
  {
    id: "13",
    title: "Stellar Journey",
    artist: "Cosmic Drift",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "1.5M",
    addedAt: Date.now() - 604800000,
  },
  {
    id: "14",
    title: "Aurora Borealis",
    artist: "Nordic Sounds",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "987K",
    addedAt: Date.now() - 691200000,
  },
  {
    id: "15",
    title: "Urban Jungle",
    artist: "City Beats",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "743K",
    addedAt: Date.now() - 777600000,
  },
  {
    id: "16",
    title: "Desert Mirage",
    artist: "Sand Dunes",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "621K",
    addedAt: Date.now() - 864000000,
  },
  {
    id: "17",
    title: "Crystal Waters",
    artist: "Aqua Flow",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "456K",
    addedAt: Date.now() - 950400000,
  },
  {
    id: "18",
    title: "Thunder Strike",
    artist: "Storm Riders",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "892K",
    addedAt: Date.now() - 1036800000,
  },
  {
    id: "19",
    title: "Moonlight Serenade",
    artist: "Luna Echo",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "334K",
    addedAt: Date.now() - 1123200000,
  },
  {
    id: "20",
    title: "Solar Flare",
    artist: "Star Forge",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "1.1M",
    addedAt: Date.now() - 1209600000,
  },
  {
    id: "21",
    title: "Crimson Dawn",
    artist: "Ruby Sky",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "567K",
    addedAt: Date.now() - 1296000000,
  },
  {
    id: "22",
    title: "Electric Storm",
    artist: "Lightning Bolt",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "789K",
    addedAt: Date.now() - 1382400000,
  },
  {
    id: "23",
    title: "Frozen Heart",
    artist: "Ice Crystal",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "445K",
    addedAt: Date.now() - 1468800000,
  },
  {
    id: "24",
    title: "Golden Hour",
    artist: "Sunset Vibes",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "923K",
    addedAt: Date.now() - 1555200000,
  },
  {
    id: "25",
    title: "Phantom Melody",
    artist: "Ghost Rhythm",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "298K",
    addedAt: Date.now() - 1641600000,
  },
  {
    id: "26",
    title: "Infinite Loop",
    artist: "Code Symphony",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "1.3M",
    addedAt: Date.now() - 1728000000,
  },
  {
    id: "27",
    title: "Velvet Dreams",
    artist: "Silk Touch",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "676K",
    addedAt: Date.now() - 1814400000,
  },
  {
    id: "28",
    title: "Midnight Express",
    artist: "Night Train",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "812K",
    addedAt: Date.now() - 1900800000,
  },
  {
    id: "29",
    title: "Cosmic Dance",
    artist: "Galaxy Groove",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "534K",
    addedAt: Date.now() - 1987200000,
  },
  {
    id: "30",
    title: "Crystal Cave",
    artist: "Underground",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "367K",
    addedAt: Date.now() - 2073600000,
  },
  {
    id: "31",
    title: "Fire and Ice",
    artist: "Element Clash",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "1.4M",
    addedAt: Date.now() - 2160000000,
  },
  {
    id: "32",
    title: "Shadow Walker",
    artist: "Dark Path",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "723K",
    addedAt: Date.now() - 2246400000,
  },
  {
    id: "33",
    title: "Digital Horizon",
    artist: "Pixel Dreams",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "856K",
    addedAt: Date.now() - 2332800000,
  },
  {
    id: "34",
    title: "Purple Rain",
    artist: "Color Storm",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "1.6M",
    addedAt: Date.now() - 2419200000,
  },
  {
    id: "35",
    title: "Silent Echo",
    artist: "Whisper Wind",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "412K",
    addedAt: Date.now() - 2505600000,
  },
  {
    id: "36",
    title: "Binary Stars",
    artist: "Space Code",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "945K",
    addedAt: Date.now() - 2592000000,
  },
  {
    id: "37",
    title: "Ocean Deep",
    artist: "Abyss Sound",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "587K",
    addedAt: Date.now() - 2678400000,
  },
  {
    id: "38",
    title: "Mountain Peak",
    artist: "Alpine Beat",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "698K",
    addedAt: Date.now() - 2764800000,
  },
  {
    id: "39",
    title: "Neon City",
    artist: "Future Pulse",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "1.7M",
    addedAt: Date.now() - 2851200000,
  },
  {
    id: "40",
    title: "Starlight Avenue",
    artist: "Celestial Path",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "834K",
    addedAt: Date.now() - 2937600000,
  },
  {
    id: "41",
    title: "Rhythm Revolution",
    artist: "Beat Rebels",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "1.9M",
    addedAt: Date.now() - 3024000000,
  },
  {
    id: "42",
    title: "Mystic Forest",
    artist: "Nature's Call",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "523K",
    addedAt: Date.now() - 3110400000,
  },
  {
    id: "43",
    title: "Chrome Reflection",
    artist: "Metal Heart",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "756K",
    addedAt: Date.now() - 3196800000,
  },
  {
    id: "44",
    title: "Quantum Leap",
    artist: "Physics Beat",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "1.1M",
    addedAt: Date.now() - 3283200000,
  },
  {
    id: "45",
    title: "Velvet Night",
    artist: "Smooth Jazz",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "478K",
    addedAt: Date.now() - 3369600000,
  },
  {
    id: "46",
    title: "Emerald Dawn",
    artist: "Green Light",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "892K",
    addedAt: Date.now() - 3456000000,
  },
  {
    id: "47",
    title: "Digital Phantom",
    artist: "Ghost Code",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "634K",
    addedAt: Date.now() - 3542400000,
  },
  {
    id: "48",
    title: "Sapphire Sky",
    artist: "Blue Horizon",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "1.3M",
    addedAt: Date.now() - 3628800000,
  },
  {
    id: "49",
    title: "Electric Dreams",
    artist: "Volt Nation",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "765K",
    addedAt: Date.now() - 3715200000,
  },
  {
    id: "50",
    title: "Midnight Symphony",
    artist: "Orchestra X",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "1.8M",
    addedAt: Date.now() - 3801600000,
  },
  {
    id: "51",
    title: "Ruby Sunset",
    artist: "Red Wave",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "556K",
    addedAt: Date.now() - 3888000000,
  },
  {
    id: "52",
    title: "Cyber Soul",
    artist: "Digital Spirit",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "923K",
    addedAt: Date.now() - 3974400000,
  },
  {
    id: "53",
    title: "Aurora Dreams",
    artist: "Northern Lights",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "687K",
    addedAt: Date.now() - 4060800000,
  },
  {
    id: "54",
    title: "Phantom Beat",
    artist: "Invisible Sound",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "412K",
    addedAt: Date.now() - 4147200000,
  },
  {
    id: "55",
    title: "Golden Symphony",
    artist: "Brass Collective",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "1.5M",
    addedAt: Date.now() - 4233600000,
  },
  {
    id: "56",
    title: "Neon Genesis",
    artist: "Future Wave",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "1.2M",
    addedAt: Date.now() - 4320000000,
  },
  {
    id: "57",
    title: "Cosmic Whisper",
    artist: "Void Echo",
    cover:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    plays: "834K",
    addedAt: Date.now() - 4406400000,
  },
  {
    id: "58",
    title: "Silver Cascade",
    artist: "Liquid Motion",
    cover:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
    plays: "967K",
    addedAt: Date.now() - 4492800000,
  },
  {
    id: "59",
    title: "Diamond Dust",
    artist: "Crystal Matrix",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    plays: "1.4M",
    addedAt: Date.now() - 4579200000,
  },
  {
    id: "60",
    title: "Lunar Eclipse",
    artist: "Shadow Moon",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    plays: "1.1M",
    addedAt: Date.now() - 4665600000,
  },
];
