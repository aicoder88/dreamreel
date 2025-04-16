import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
}

interface VideoGalleryProps {
  videos?: Video[];
  title?: string;
  description?: string;
}

const VideoGallery = ({
  videos = [
    {
      id: "1",
      title: "Mountain Climbing Adventure",
      description:
        "Experience the thrill of scaling a mountain peak with stunning views.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80",
      videoUrl: "https://example.com/videos/mountain-climbing.mp4",
      category: "Adventure",
    },
    {
      id: "2",
      title: "Scuba Diving with Dolphins",
      description: "Swim alongside dolphins in crystal clear waters.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      videoUrl: "https://example.com/videos/scuba-diving.mp4",
      category: "Water Sports",
    },
    {
      id: "3",
      title: "Skydiving Experience",
      description: "Feel the adrenaline rush of free-falling from 15,000 feet.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1521673252667-e05da380b252?w=800&q=80",
      videoUrl: "https://example.com/videos/skydiving.mp4",
      category: "Extreme Sports",
    },
    {
      id: "4",
      title: "Concert Performance",
      description: "Rock out on stage in front of thousands of fans.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
      videoUrl: "https://example.com/videos/concert.mp4",
      category: "Entertainment",
    },
    {
      id: "5",
      title: "Safari Adventure",
      description: "Get up close with wild animals in their natural habitat.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      videoUrl: "https://example.com/videos/safari.mp4",
      category: "Travel",
    },
    {
      id: "6",
      title: "Space Exploration",
      description:
        "Experience what it's like to be an astronaut in outer space.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
      videoUrl: "https://example.com/videos/space.mp4",
      category: "Science Fiction",
    },
  ],
  title = "Explore AI-Generated Videos",
  description = "Browse our gallery of high-quality AI-generated videos. Get inspired for your own custom creation!",
}: VideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<string>("All");

  // Get unique categories for filter
  const categories = ["All", ...new Set(videos.map((video) => video.category))];

  // Filter videos based on selected category
  const filteredVideos =
    filter === "All"
      ? videos
      : videos.filter((video) => video.category === filter);

  return (
    <div className="w-full bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Dialog key={video.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {video.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {video.description}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        {video.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl">
                <div className="aspect-video w-full bg-black">
                  {/* In a real implementation, this would be a video player */}
                  <div className="w-full h-full flex items-center justify-center bg-black text-white">
                    <p>Video Player: {video.title}</p>
                    {/* This would be replaced with an actual video player component */}
                    {/* <video src={video.videoUrl} controls className="w-full h-full" /> */}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold">{video.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {video.description}
                  </p>
                  <div className="mt-4">
                    <Button>Create Similar Video</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No videos found in this category.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to create your own AI video?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get a high-quality AI-generated video of yourself doing any activity
            for just $5-$10.
          </p>
          <Button size="lg">Create Your Video Now</Button>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
