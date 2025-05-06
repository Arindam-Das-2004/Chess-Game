import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Link } from 'react-router-dom';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-8">
        <div className="max-w-6xl mx-auto p-4">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Test Page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This is a simple test page to check if routing is working correctly.</p>
              
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
