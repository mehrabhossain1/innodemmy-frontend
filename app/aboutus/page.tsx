"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  Shield, 
  Zap, 
  BookOpen, 
  Code, 
  UserCheck, 
  Briefcase, 
  Network,
  ArrowRight,
  GraduationCap,
  Globe,
  Heart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  hover: { 
    y: -8,
    transition: { duration: 0.3 }
  }
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transforming Talent into Expertise
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              At Innodemy, we believe the future belongs to those who never stop learning. Based in
              Bangladesh, we are an innovative EdTech platform dedicated to empowering learners,
              professionals, and organizations with in-demand technology skills that drive career success in
              the digital era.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900 dark:bg-blue-800"
        {...fadeInUp}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Target className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Mission</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 sm:p-12"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Our mission is simple yet impactful: to bridge the gap between traditional education and the
              rapidly evolving job market by providing high-quality, practical, and industry-aligned training
              programs.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you are a student seeking your first job, a professional upgrading your skills, or a
              company looking to upskill your workforce, Innodemy offers learning experiences designed for
              real-world impact.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-300 dark:bg-slate-700"
        {...fadeInUp}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Founding Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Innodemy was founded by passionate technologists and industry experts with a shared vision —
              to make world-class, technology-driven education accessible to every learner in Bangladesh.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={cardHover}>
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-800">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Fakrul Islam Javed</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">Co-Founder & CEO</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    ASIC Physical Design Engineer with expertise in semiconductor design, research, and
                    technology-focused education.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardHover}>
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-800">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Ahmed Ullah Shuvo</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">Co-Founder & COO</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Research Investigator specializing in clinical research and innovation, dedicated to developing
                    globally competitive talent.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-800 dark:bg-blue-700"
        {...fadeInUp}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heart className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Core Values</h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              We are guided by principles that define who we are and how we work:
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Lightbulb, title: "Innovation", description: "We constantly update our methods and content to match industry trends." },
              { icon: Award, title: "Excellence", description: "We maintain the highest standards in training, delivery, and learner outcomes." },
              { icon: Shield, title: "Integrity", description: "We operate with transparency, honesty, and accountability." },
              { icon: Zap, title: "Empowerment", description: "We give our learners the tools and confidence to take charge of their careers." },
              { icon: Globe, title: "Accessibility", description: "We make quality education affordable and available to all." }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:border-blue-200 bg-white dark:bg-slate-800">
                  <CardContent className="p-6 text-center">
                    <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* What Sets Us Apart Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-500 dark:bg-slate-500"
        {...fadeInUp}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">What Sets Us Apart</h2>
            <div className="max-w-4xl mx-auto mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-l-4 border-blue-600">
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                While many offer online courses, <span className="text-blue-600 font-bold">Innodemy stands out</span> for its end-to-end learning experience:
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: BookOpen, title: "Industry-Aligned Curriculum", description: "Designed in consultation with global tech professionals." },
              { icon: Code, title: "Hands-On Learning", description: "Live projects, coding challenges, and real-world problem solving." },
              { icon: UserCheck, title: "Expert Mentorship", description: "One-on-one guidance from seasoned industry practitioners." },
              { icon: Briefcase, title: "Career Pathway Support", description: "CV reviews, mock interviews, and internship/job connections." },
              { icon: Network, title: "Community & Networking", description: "Access to an active network of learners, alumni, and industry leaders." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardHover}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:border-blue-200 bg-white dark:bg-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <feature.icon className="w-8 h-8 text-blue-600 mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              We don't just teach skills — we shape careers.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700"
        {...fadeInUp}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Join Us on This Journey</h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8">
              The future is digital, and opportunities are endless for those who are ready. Innodemy is here to
              ensure that you are prepared, confident, and future-proof.
            </p>
            <p className="text-xl font-semibold text-white mb-8">
              Let's turn your potential into performance.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
