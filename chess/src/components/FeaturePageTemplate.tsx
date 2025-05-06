import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FeaturePageTemplateProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  bgGradient?: string;
}

const FeaturePageTemplate: React.FC<FeaturePageTemplateProps> = ({
  title,
  description,
  icon,
  children,
  bgGradient = 'from-primary/5 via-background to-background'
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className={`flex-grow pt-16 pb-8 bg-gradient-to-b ${bgGradient}`}>
        <div className="max-w-6xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                {icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FeaturePageTemplate;
