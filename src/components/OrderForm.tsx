import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Clock, Image, DollarSign, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  activityDescription: z.string().min(10, {
    message: "Activity description must be at least 10 characters.",
  }),
  duration: z.string(),
  style: z.string(),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  onSubmit?: (values: FormValues) => void;
  onProceedToPayment?: (orderSummary: OrderSummary) => void;
}

interface OrderSummary {
  activityDescription: string;
  duration: string;
  style: string;
  additionalNotes?: string;
  price: number;
  referenceImages: File[];
}

const OrderForm = ({
  onSubmit,
  onProceedToPayment = () => {},
}: OrderFormProps) => {
  const [step, setStep] = useState(1);
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [price, setPrice] = useState(5);
  const [activeTab, setActiveTab] = useState("details");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityDescription: "",
      duration: "15",
      style: "realistic",
      additionalNotes: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setReferenceImages([...referenceImages, ...newFiles]);

      // Adjust price based on number of reference images
      if (referenceImages.length + newFiles.length > 2) {
        setPrice(7);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...referenceImages];
    newImages.splice(index, 1);
    setReferenceImages(newImages);

    // Adjust price based on remaining reference images
    if (newImages.length <= 2) {
      setPrice(5);
    }
  };

  const handleDurationChange = (value: number[]) => {
    const duration = value[0].toString();
    form.setValue("duration", duration);

    // Adjust price based on duration
    if (parseInt(duration) > 20) {
      setPrice((prev) => Math.max(prev, 7));
    } else if (parseInt(duration) > 30) {
      setPrice(10);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      form.trigger(["activityDescription", "duration", "style"]);
      if (form.formState.isValid) {
        setStep(2);
        setActiveTab("images");
      }
    } else if (step === 2) {
      setStep(3);
      setActiveTab("summary");
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(1);
      setActiveTab("details");
    } else if (step === 3) {
      setStep(2);
      setActiveTab("images");
    }
  };

  const handleSubmit = (values: FormValues) => {
    if (onSubmit) {
      onSubmit(values);
    }

    const orderSummary: OrderSummary = {
      ...values,
      price,
      referenceImages,
    };

    onProceedToPayment(orderSummary);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create Your Custom AI Video
        </CardTitle>
        <CardDescription className="text-center">
          Tell us what you want to see, and we'll make it happen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="details"
              disabled={step !== 1 && step !== 4}
              className={
                step >= 1
                  ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  : ""
              }
            >
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                {step > 1 ? <Check className="h-4 w-4" /> : "1"}
              </span>
              Details
            </TabsTrigger>
            <TabsTrigger
              value="images"
              disabled={step !== 2 && step !== 4}
              className={
                step >= 2
                  ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  : ""
              }
            >
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                {step > 2 ? <Check className="h-4 w-4" /> : "2"}
              </span>
              Reference Images
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              disabled={step !== 3 && step !== 4}
              className={
                step >= 3
                  ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  : ""
              }
            >
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                {step > 3 ? <Check className="h-4 w-4" /> : "3"}
              </span>
              Order Summary
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <TabsContent value="details" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="activityDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What activity would you like to see in your video?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the activity in detail (e.g., 'Me surfing big waves in Hawaii')"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Be specific about what you want to see. The more
                          details, the better the result.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Duration (seconds)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                defaultValue={[15]}
                                max={45}
                                min={10}
                                step={5}
                                onValueChange={handleDurationChange}
                              />
                            </FormControl>
                            <span className="w-12 text-center font-medium">
                              {field.value}s
                            </span>
                          </div>
                          <FormDescription>
                            Longer videos cost more. 10-20s: $5, 25-30s: $7,
                            35-45s: $10
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="realistic">
                                Realistic
                              </SelectItem>
                              <SelectItem value="cinematic">
                                Cinematic
                              </SelectItem>
                              <SelectItem value="animated">Animated</SelectItem>
                              <SelectItem value="stylized">Stylized</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the visual style for your AI-generated video.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other details or preferences you'd like us to know"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include any specific details about lighting, camera
                          angles, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                        >
                          <span>Upload reference images</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600 mt-2">
                        PNG, JPG, GIF up to 5MB each. Adding more than 2 images
                        increases the price.
                      </p>
                    </div>

                    {referenceImages.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">
                          Uploaded Images
                        </h3>
                        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                          {referenceImages.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Reference ${index + 1}`}
                                  className="object-cover h-32 w-full"
                                />
                              </div>
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Activity:</span>
                        <span className="font-medium">
                          {form.getValues().activityDescription}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">
                          {form.getValues().duration} seconds
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Style:</span>
                        <span className="font-medium capitalize">
                          {form.getValues().style}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference Images:</span>
                        <span className="font-medium">
                          {referenceImages.length}
                        </span>
                      </div>

                      {form.getValues().additionalNotes && (
                        <div className="pt-2">
                          <span className="text-gray-600 block mb-1">
                            Additional Notes:
                          </span>
                          <p className="text-sm bg-white p-3 rounded">
                            {form.getValues().additionalNotes}
                          </p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">
                            Total Price:
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            ${price}.00
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Price based on video duration and number of reference
                          images.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <DollarSign className="mr-2 h-4 w-4" /> Proceed to Payment
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Estimated delivery: 24-48 hours after payment</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderForm;
