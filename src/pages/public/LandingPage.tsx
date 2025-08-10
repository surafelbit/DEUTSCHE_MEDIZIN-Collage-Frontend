import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { GraduationCap, Heart, Eye, Target, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function LandingPage() {
  const { t } = useTranslation(["common", "auth"])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t("college.name")}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t("college.subtitle")}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline">{t("auth:login")}</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
            <img src="/placeholder.svg?height=80&width=80" alt="College Logo" className="w-20 h-20 rounded-full" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">{t("college.tagline")}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Germany's premier medical college and embark on a journey of academic excellence, innovation, and
            compassionate healthcare education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                {t("auth:register")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* College Image */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <img
            src="/placeholder.svg?height=400&width=800"
            alt="College Campus"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Core Values, Vision, Mission */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl">Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Compassion, integrity, excellence, and innovation guide everything we do. We foster a culture of
                respect, diversity, and lifelong learning.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                To be the leading medical institution in Europe, recognized globally for producing exceptional
                healthcare professionals and groundbreaking research.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                To provide world-class medical education, conduct innovative research, and serve our community through
                excellence in healthcare delivery.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 dark:bg-blue-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Medical Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful graduates who have made their mark in the medical field. Your future in
            healthcare starts here.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              {t("auth:register")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">{t("college.name")}</h3>
                  <p className="text-sm text-gray-400">{t("college.subtitle")}</p>
                </div>
              </div>
              <p className="text-gray-400">Excellence in medical education since 1985.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/register" className="hover:text-white">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Research
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("contact")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Medical Campus Drive</li>
                <li>Berlin, Germany 10115</li>
                <li>+49 30 1234 5678</li>
                <li>info@dhfm-college.de</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>📘
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>🐦
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>💼
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Deutsche Hochschule für Medizin College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
