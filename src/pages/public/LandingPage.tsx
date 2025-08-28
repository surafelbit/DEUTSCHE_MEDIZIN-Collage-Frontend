import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import DarkVeil from "@/designs/DarkVeil";
import LiquidChrome from "@/designs/LiquidChrome";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import home from "../../../public/animations/home.json";
import phone from "../../../public/animations/phone.json";
import register from "../../../public/animations/register.json";
import calling from "../../../public/animations/calling.json";
import { LanguageSwitcher } from "@/components/language-switcher";
import { GraduationCap, Heart, Eye, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
//design pages
import TrueFocus from "@/designs/TrueFocus";
import GlareHover from "@/designs/GlareHover";
import CircularGallery from "../../designs/CircularGallery";
import LightRays from "@/designs/LightRays";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function LandingPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // Show after scrolling 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const videoRef = useRef(null); // points to the video element
  const [isPlaying, setIsPlaying] = useState(false); // tracks if video is playing

  const { t } = useTranslation(["common", "auth"]);
  const carouselRef = useRef(null);
  const scrollAmount = 300;

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const datas = [
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: " WHAT WE CAN KNOW",
      detail:
        " Video: Ian McEwan in conversation with Richard Ovenden, book now",
    },
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: "FEATURED PODCAST    ",
      detail: "Accelerating AI Ethics",
    },
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: "THE OUP BLOG",
      detail: "Your Indo-European beard",
    },
    {
      image:
        "https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg",
      heading: "FEATURED PODCAST",
      detail: "we have very good products",
    },
  ];
  const homeRef = useRef();

  return (
    <div className="relative min-h-screen ">
      {/* DarkVeil Background */}
      {/* <div className="fixed inset-0 w-full h-full z-0 hidden dark:block fixed inset-0 overflow-x-hidden">
        <DarkVeil className="w-full h-full object-cover" />
      </div> */}
      <div className="relative z-10">
        {show && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-600 transition"
          >
            <ChevronUpIcon className="h-6 w-6" />
          </button>
        )}
        <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
            <div className="flex items-center space-x-3">
              <div className="w-12 rounded-full   rounded-lg flex items-center justify-center">
                <img
                  src="/assets/companylogo.jpg"
                  className="h-[50px] w-full rounded-full "
                />
              </div>
            </div>

            {/* <nav className="hidden md:flex space-x-6 items-center">
            <a
              href="#mission"
              className="text-gray-700 dark:text-gray-300 hover:text-sky-500"
            >
              Mission
            </a>
            <div className="relative group">
              <button className="text-gray-700 dark:text-gray-300 hover:text-sky-500 font-semibold">
                Programs
              </button>

              <div
                className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-opacity duration-200 z-50"
              >
                <div className="relative group">
                  <button className="w-full text-left px-4 py-2 hover:bg-sky-100 dark:hover:bg-gray-700">
                    Undergraduate
                  </button>

                  <div
                    className="absolute top-0 left-full ml-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-opacity duration-200"
                  >
                    <a
                      href="#year1"
                      className="block px-4 py-2 hover:bg-sky-100 dark:hover:bg-gray-700"
                    >
                      Year 1
                    </a>
                    <a
                      href="#year2"
                      className="block px-4 py-2 hover:bg-sky-100 dark:hover:bg-gray-700"
                    >
                      Year 2
                    </a>
                    <a
                      href="#year3"
                      className="block px-4 py-2 hover:bg-sky-100 dark:hover:bg-gray-700"
                    >
                      Year 3
                    </a>
                  </div>
                </div>

                <a
                  href="#postgraduate"
                  className="block px-4 py-2 hover:bg-sky-100 dark:hover:bg-gray-700"
                >
                  Postgraduate
                </a>
                <a
                  href="#research"
                  className="block px-4 py-2 hover:bg-sky-100 dark:hover:bg-gray-700"
                >
                  Research
                </a>
              </div>
            </div>

            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-sky-500"
            >
              Contact
            </a>
          </nav> */}
            {/* <nav className="bg-white shadow fixed w-full z-50">
            <ul className="flex justify-center space-x-8 p-4">
              <li
                className="w-8 h-8"
                onMouseEnter={() => homeRef.current.play()}
                onMouseLeave={() => homeRef.current.stop()}
              >
                <Lottie
                  lottieRef={homeRef}
                  animationData={phone}
                  loop={true}
                  autoplay={false}
                />
              </li>
            </ul>
          </nav> */}
            <nav className=" shadow fixed w-full z-50">
              <ul className="flex gap-30 justify-center space-x-8 p-4">
                <li
                  className="w-8 h-8"
                  // onMouseEnter={() => homeRef.current.play()}
                  // onMouseLeave={() => homeRef.current.stop()}
                >
                  <a href="#home">
                    <Lottie
                      // lottieRef={homeRef}
                      animationData={home}
                      loop={true}
                      autoplay={true}
                    />
                  </a>
                </li>
                <li
                  className="w-8 h-8"
                  // onMouseEnter={() => homeRef.current.play()}
                  // onMouseLeave={() => homeRef.current.stop()}
                >
                  <a href="#mission">
                    <Lottie
                      // lottieRef={homeRef}
                      animationData={phone}
                      loop={true}
                      autoplay={true}
                    />
                  </a>
                </li>
                <li
                  className="w-8 h-8"
                  // onMouseEnter={() => homeRef.current.play()}
                  // onMouseLeave={() => homeRef.current.stop()}
                >
                  <a href="#hero">
                    <Lottie
                      // lottieRef={homeRef}
                      animationData={register}
                      loop={true}
                      autoplay={true}
                    />
                  </a>
                </li>
                <li className="w-8 h-8">
                  <a href="#contact">
                    <Lottie
                      // lottieRef={homeRef}
                      animationData={calling}
                      loop={true}
                      autoplay={true}
                    />
                  </a>
                </li>
              </ul>
            </nav>

            {/* Utilities */}
            <div className="hidden md:flex items-center z-50 space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link to="/login">
                <Button variant="outline">{t("auth:login")}</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* 
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <img src="/assets/companylogo.jpg" className="h-[50px] w-full" />
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("college.name")}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("college.subtitle")}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline">{t("auth:login")}</Button>
          </Link>
        </div>
      </header> */}

        <section className="relative bg-gradient-to-r from-blue-900 to-blue-200 text-white h-96 flex items-center ">
          <img
            src="https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg"
            alt="Student Studying"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-left">
            <p className="text-lg mb-2">In the city of Bahirdar</p>
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-900 to-blue-200 px-4 py-2 rounded font-serif">
              <span className="font-bold">DEUTSCHE HOCHSCHULE</span> MEDICIN
              COLLEGE
            </h2>

            {/* <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Take A Tour
          </button> */}
          </div>
          <div className="absolute left-0 right-0 bottom-0 mx-auto mb-[-40px] max-w-3xl bg-white bg-white/40 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <p className="text-sm font-semibold text-blue-900 mb-1">About us</p>
            <h2 className="text-xl font-bold uppercase text-black leading-tight">
              DEUTSCHE HOCHSCHULE <br />
              MEDICIN COLLEGE BAHIRDAR
            </h2>
          </div>
        </section>

        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 py-25 pt-30">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-16">
            {/* Image container 40% width */}
            {/* <div className="w-full sm:w-2/5 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0"> */}
            <div className="w-full px-10 py-10 sm:w-2/5">
              {" "}
              <img
                src="/assets/companylogo.jpg"
                alt="College Logo"
                className="  bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0   rounded-full"
              />
            </div>

            {/* </div> */}

            {/* Text container 60% width */}
            <div className="w-full sm:w-3/5 text-center sm:text-left max-w-4xl">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <div>Excellence In</div>
                <TrueFocus
                  sentence="Medical Education"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="red"
                  animationDuration={2}
                  pauseBetweenAnimations={1}
                />
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Join our vibrant University College community! Begin your
                academic journey by completing the Life History Form for
                undergraduate admission. This straightforward form collects your
                personal details, educational background (including EHEECE
                grades for subjects like Math and English), and employment
                history to ensure a smooth registration process. Submit it with
                your academic credentials to the Registrar’s Office by the
                deadline.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8 py-3">
                    {t("auth:register")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="hero" className="relative h-screen text-white ">
          {/* Background video */}

          {/* this is the video recylce background */}
          {/* <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl"
            autoPlay
            loop
            muted
            playsInline
          ></video> */}

          {/* this is the video recylce background */}

          {/* Dark overlay */}
          <div className="absolute inset-0 "></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end pb-4 items-center h-full px-6 text-center text-sky-300 animate-fade-up">
            <h1
              className="text-5xl md:text-6xl font-extrabold mb-4 
          bg-gradient-to-r from-blue-900 to-blue-200 bg-clip-text text-transparent"
            >
              {/* Welcome to BrightFuture Medical College */}
              Embark on your journey
            </h1>

            <p className="text-xl md:text-2xl bg-gradient-to-r from-blue-900 to-blue-200 bg-clip-text text-transparent mb-2">
              Pursue your dreams in{" "}
              <span className="font-semibold text-blue-900">Medicine</span> and{" "}
              <span className="font-semibold text-blue-900">Healthcare</span>
            </p>

            <p className="text-lg md:text-xl text-blue-900 mb-2">
              Whether You Are{" "}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-2 text-blue-800 font-medium">
                Regular
              </span>
              <span className="text-blue-900 font-semibold">or</span>
              <span className="px-4 py-2  text-blue-800  font-medium">
                Distance
              </span>
              <span className="px-4 py-2  text-blue-800  font-medium">
                Extension
              </span>
            </div>

            {/* <p className="text-lg md:text-xl font-semibold text-gray-800">
            Embark on your journey to excellence in medical education today.
          </p> */}
            <div className="flex flex-col sm:flex-row gap-4 bg-gradient-to-r from-blue-900 to-blue-200 rounded-full justify-center sm:justify-start">
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 bg-transparent"
                >
                  {t("auth:register")}{" "}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* College Image */}
        {/* <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <img
            src="https://skyresortbahirdar.com/wp-content/uploads/2021/09/Bahir-Dar-City-View-1-2560x1440.jpg"
            alt="College Campus"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section> */}

        {/* Core Values, Vision, Mission */}
        <section id="mission" className="container mx-auto px-4 py-16">
          <h2 className="text-2xl ml-12 font-bold mb-4 text-gray-800 dark:text-white">
            Values and Missions
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center bg-white dark:bg-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              <CardHeader>
                <img src="/assets/student.jpg" className="h-[200px] w-full" />
                <CardTitle className="text-2xl">Core Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  DHFMC places education at the core of its vision and mission,
                  guiding all our actions and decisions. Five key values support
                  this commitment and shape how we work individually and as a
                  team: Integrity: We uphold honesty and ethical behavior in
                  everything we do. Respect: We treat students, colleagues, and
                  stakeholders with civility in all communications. Empowerment:
                  We focus on supporting disadvantaged groups, especially women,
                  to enroll and succeed. Professional Excellence: We maintain
                  high academic standards and promote effective teaching and
                  learning. Creativity and Innovativeness: We encourage
                  creativity and leadership in a forward-thinking, dynamic
                  environment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white dark:bg-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              <CardHeader>
                <img
                  src="/assets/laboratory.jpg"
                  className="h-[200px] w-full"
                />
                <CardTitle className="text-2xl">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  DHM College envisions becoming the premier center of academic
                  excellence in Ethiopia by the year 2025, committed to
                  fostering innovative learning, groundbreaking research, and
                  community engagement. The college aims to nurture future
                  leaders and professionals who will contribute significantly to
                  the nation’s development and elevate the standards of
                  education across the country
                </CardDescription>
              </CardContent>
            </Card>
            {/* <div style={{ height: "300px", position: "relative" }}>
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  color: "#333",
                  margin: 0,
                }}
              >
                Hover Me
              </h2>
            </GlareHover>
          </div> */}
            <Card className="text-center bg-white dark:bg-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              <CardHeader>
                {/*  */}
                <img
                  src="/assets/intro.jpg"
                  className="h-[200px] w-full object-cover"
                />
                <CardTitle className="text-2xl">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  DHM College aims to produce competent professionals at
                  different levels that are relevant to the development needs of
                  the country by providing qualified teaching; engaging in
                  problem solving research activities and serving the community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={1}
          amplitude={0.6}
          interactive={true}
        />
      </div> */}
        {/* <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={1}
            rayLength={2}
            pulsating={true}
            fadeDistance={1}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="w-full h-full"
          />
        </div>

        <h1 className="relative z-10 text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome
        </h1>
      </div> */}

        {/* <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        /> */}

        <div className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              DISCOVER MORE
            </h2>
            <div className="relative overflow-hidden">
              <div
                ref={carouselRef}
                id="carousel"
                className="flex space-x-4 overflow-x-auto scroll-smooth"
              >
                {/* Card 1 */}
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <img
                    src="/assets/collegephoto.jpg"
                    alt="Ian McEwan"
                    className="w-full h-40 object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    JOIN OUR COLLEGE
                  </h3>
                  <p className="text-sm text-gray-600">
                    Right here in Bahirdar
                  </p>
                </div>
                {/* Card 2 */}
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <video
                    controls
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755066400/4C5A5182_pqbmq6.jpg"
                    preload="none"
                    className="w-full h-40 object-cover mb-2"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755066400/4C5A5182_pqbmq6.mov"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Team Work{" "}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Team Meatings encouraged To Facilitate Learning Process
                  </p>
                </div>
                {/* Card 3 */}
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <video
                    controls
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069448/4C5A5095_kvfnmo.jpg"
                    preload="none"
                    className="w-full h-40 object-cover mb-2"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069448/4C5A5095_kvfnmo.mov"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Laboratories
                  </h3>
                  <p className="text-sm text-gray-600">
                    Full and Equipied Labs For Our Students
                  </p>
                </div>
                <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <video
                    controls
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.jpg"
                    preload="none"
                    className="w-full h-40 object-cover mb-2"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.mov"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h3 className="text-lg font-semibold text-gray-800">
                    WHAT WE CAN KNOW
                  </h3>
                  <p className="text-sm text-gray-600">
                    Video: Ian McEwan in conversation with Richard Ovenden, book
                    now
                  </p>
                </div>
                <div className="relative w-full h-40">
                  <video
                    ref={videoRef}
                    poster="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.jpg"
                    preload="none"
                    className="w-full h-full object-cover"
                  >
                    <source
                      src="https://res.cloudinary.com/djz4nl0ic/video/upload/v1755069644/4C5A5181_llhfsl.mov"
                      type="video/mp4"
                    />
                  </video>

                  {/* {!isPlaying && (
                  <button
                    onClick={() => {
                      videoRef.current.play();
                      setIsPlaying(true);
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-3xl font-bold rounded-full"
                  >
                    ▶
                  </button>
                )} */}
                </div>

                {/* Card 4 */}
                {/* {datas.map((e) => {
                return (
                  <div className="min-w-[250px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                    <img
                      src={e.image}
                      alt="University Response"
                      className="w-full h-40 object-cover mb-2"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #0057B8, #FFD700)",
                      }}
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {e.heading}
                    </h3>
                    <p className="text-sm text-gray-600">{e.detail}</p>
                  </div>
                );
              })} */}
              </div>
              {/* Navigation Arrows */}
              <button
                id="prev"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <button
                id="next"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:block relative h-[600px]">
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>

        {/* Call to Action */}
        {/* <section className="bg-blue-600 dark:bg-blue-800 py-16"> */}

        <section className=" py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have made their mark in
              the medical field. Your future in healthcare starts here.
            </p>
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                {t("auth:register")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
        {/* Footer */}
        <div
          id="contact"
          className="relative w-full   flex items-center justify-center overflow-hidden"
        >
          {/* Light rays absolutely positioned behind content */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={1}
              rayLength={2}
              pulsating={true}
              fadeDistance={1}
              saturation={1}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="w-full h-full"
            />
          </div>
          {/* <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12"> */}

          <footer className="text-white py-1">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 rounded-full   rounded-lg flex items-center justify-center">
                      <img
                        src="/assets/companylogo.jpg"
                        className="h-[50px] w-full rounded-full "
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{t("college.name")}</h3>
                      <p className="text-sm text-">{t("college.subtitle")}</p>
                    </div>
                  </div>
                  <p className="text-gray-400">
                    Excellence in medical education since 1985.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-black">
                    <li>
                      <Link
                        to="/register"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Apply Now
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Student Portal
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Programs
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                      >
                        Research
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">{t("contact")}</h4>
                  <ul className="space-y-2 ">
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      123 Medical Campus Drive
                    </li>
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      Berlin, Germany 10115
                    </li>
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      +49 30 1234 5678
                    </li>
                    <li className="text-black hover:text-gray-400 dark:text-white dark:hover:text-gray-400">
                      info@dhfm-college.de
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Facebook</span>📘
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Twitter</span>🐦
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">LinkedIn</span>💼
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>
                  &copy; 2024 Deutsche Hochschule für Medizin College. All
                  rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
