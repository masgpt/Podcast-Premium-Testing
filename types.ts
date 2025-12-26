
export interface Podcast {
  id: string;
  title: string;
  host: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
  category: string;
}

export interface PlayerState {
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
}
