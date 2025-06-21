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
];
