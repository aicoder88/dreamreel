import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoGallery from "./VideoGallery";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Play className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold">AI Video Creator</h1>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#gallery"
                className="text-sm font-medium hover:text-primary"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-sm font-medium hover:text-primary"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary"
              >
                How It Works
              </a>
            </li>
            <li>
              <Button asChild>
                <Link to="/order">Create Video</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                YOU, STARRING IN YOUR WILDEST DREAMS
              </motion.h1>
              <motion.p
                className="mt-4 text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Custom AI Videos That Put YOU in the Spotlight - Starting at Just $5!
              </motion.p>
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button size="lg" asChild>
                  <Link to="/order">
                    Create Your Video <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#gallery">View Examples</a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=800&q=80"
                alt="AI Video Example"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-16 w-16 rounded-full"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              IMAGINE YOURSELF ANYWHERE, DOING ANYTHING
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's be honest... We've all had those moments. Scrolling through social media, seeing incredible adventures, jaw-dropping stunts, and once-in-a-lifetime experiences that seem forever out of reach.
              <br /><br />
              <strong>But what if they weren't?</strong>
              <br /><br />
              What if YOU could be the star of any scenario your mind can conjure – without the danger, expense, or impossibility standing in your way?
              <br /><br />
              Our breakthrough AI video technology makes the impossible... <strong>instantly possible</strong>.
            </p>
          </div>
          <VideoGallery />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              PRICING THAT MAKES SENSE
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              High-quality AI videos at affordable prices. 100% satisfaction guarantee - if your video doesn't make your jaw drop, we'll remake it or refund you. No questions asked.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">BASIC ADVENTURE</h3>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold">$5</span>
                    <span className="ml-1 text-xl text-muted-foreground">
                      /video
                    </span>
                  </div>
                  <ul className="mt-8 space-y-4 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>15-second custom video</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Standard quality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Delivery within 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>1 person in video</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full" asChild>
                    <Link to="/order?plan=basic">Choose Basic</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Standard Plan */}
            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">PREMIUM EXPERIENCE</h3>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold">$10</span>
                    <span className="ml-1 text-xl text-muted-foreground">
                      /video
                    </span>
                  </div>
                  <ul className="mt-8 space-y-4 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>30-second custom video</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Enhanced quality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Priority processing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>1 person in video</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full" asChild>
                    <Link to="/order?plan=standard">Choose Standard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">GROUP PACKAGE</h3>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold">$15</span>
                    <span className="ml-1 text-xl text-muted-foreground">
                      /video
                    </span>
                  </div>
                  <ul className="mt-8 space-y-4 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>30-second custom video</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Enhanced quality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Include up to 4 people</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Priority processing</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full" asChild>
                    <Link to="/order?plan=premium">Choose Premium</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">HOW IT WORKS: 3 SIMPLE STEPS</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Creating your custom AI video is simple and takes just minutes to order.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">
                    CHOOSE YOUR ADVENTURE
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Tell us exactly what you want to be doing in your video. Surfing a giant wave? Giving a TED talk? Flying through space? You decide!
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">
                    SEND A PHOTO
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    We need just one clear image of you (or whoever you want in the video). That's all we need to create your custom experience.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">RECEIVE YOUR VIDEO</h3>
                  <p className="mt-2 text-muted-foreground">
                    Within 24 hours, you'll get your custom AI video ready to share, save, and treasure. Watch your friends' jaws drop!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/order">Create Your Video Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              REAL CUSTOMERS, REAL REACTIONS
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what people are saying about their custom AI videos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="John D."
                    className="h-16 w-16 rounded-full mb-4"
                  />
                  <h3 className="text-lg font-bold">Jake M.</h3>
                  <div className="flex items-center mt-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-center">
                    "I sent this to my girlfriend – me singing with her favorite band – and she literally screamed! Best $10 I've ever spent on a gift."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    alt="Sarah M."
                    className="h-16 w-16 rounded-full mb-4"
                  />
                  <h3 className="text-lg font-bold">Sarah T.</h3>
                  <div className="flex items-center mt-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-center">
                    "My son's face when he saw himself 'flying' like his favorite superhero was PRICELESS. I've ordered five more videos already!"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                    alt="Michael T."
                    className="h-16 w-16 rounded-full mb-4"
                  />
                  <h3 className="text-lg font-bold">David K.</h3>
                  <div className="flex items-center mt-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-center">
                    "Used this for our company social media and engagement went up 300%. Everyone thought we had some massive production budget!"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            DON'T JUST DREAM IT. BE IT.
          </h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto opacity-90">
            While everyone else is posting the same boring selfies...
            <br /><br />
            <strong>You'll be sharing the impossible.</strong>
            <br /><br />
            The only limit is your imagination.
            <br /><br />
            <em>Special Launch Offer: Use code "FIRSTADVENTURE" for 20% off your first order!</em>
          </p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <Link to="/order">CREATE YOUR VIDEO NOW</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <Play className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold">AI Video Creator</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Creating high-quality AI videos that bring your imagination to
                life.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#gallery"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-primary"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  support@aivideomaker.com
                </li>
                <li className="text-muted-foreground">1-800-AI-VIDEO</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} AI Video Creator. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
