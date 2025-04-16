import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, RefreshCw, Share2 } from "lucide-react";

interface OrderTrackerProps {
  orderId?: string;
  status?: "processing" | "rendering" | "complete" | "failed";
  progress?: number;
  estimatedCompletionTime?: string;
  videoUrl?: string;
}

const OrderTracker = ({
  orderId = "ORD-12345",
  status = "processing",
  progress = 65,
  estimatedCompletionTime = "15 minutes",
  videoUrl = "",
}: OrderTrackerProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh action
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getStatusColor = () => {
    switch (status) {
      case "processing":
        return "bg-yellow-500";
      case "rendering":
        return "bg-blue-500";
      case "complete":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "rendering":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Rendering
          </Badge>
        );
      case "complete":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Complete
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Order Status</CardTitle>
            <CardDescription>
              Track your AI video generation progress
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Order ID</p>
              <p className="text-sm text-muted-foreground">{orderId}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <div className="mt-1">{getStatusBadge()}</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor()} mr-2`}
              ></div>
              <p className="text-sm">
                {status === "complete"
                  ? "Your video is ready to download!"
                  : status === "failed"
                    ? "There was an issue generating your video. Please contact support."
                    : `Estimated completion time: ${estimatedCompletionTime}`}
              </p>
            </div>
          </div>

          {status === "complete" && (
            <div className="pt-2">
              <Separator className="my-4" />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" /> Download Video
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;
