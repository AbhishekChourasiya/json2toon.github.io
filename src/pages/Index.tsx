import { useState } from "react";
import { Converter } from "@/components/Converter";
import { ExampleButtons } from "@/components/ExampleButtons";
import { TokenComparison } from "@/components/TokenComparison";
import { CostCalculator } from "@/components/CostCalculator";
import { Code2, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [toonOutput, setToonOutput] = useState("");
  const [selectedExample, setSelectedExample] = useState<string>("");

  // Simple token estimation (approximation: ~4 chars per token)
  const estimateTokens = (text: string): number => {
    return Math.ceil(text.length / 4);
  };

  const jsonTokens = estimateTokens(jsonInput);
  const toonTokens = estimateTokens(toonOutput);

  const handleConvert = (json: string, toon: string) => {
    setJsonInput(json);
    setToonOutput(toon);
  };

  const handleSelectExample = (json: string) => {
    setSelectedExample(json);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">JSON to TOON Converter</h1>
                <p className="text-sm text-muted-foreground">Token-Oriented Object Notation</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/toon-format/toon" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Github className="h-4 w-4" />
                  Official Toon GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Reduce AI API Costs with TOON
          </h2>
          <p className="text-lg text-muted-foreground">
            Convert JSON to TOON format and save up to 30% on token usage. 
            Compare costs across multiple AI models and see your savings in real-time.
          </p>
        </section>

        {/* Try Examples */}
        <section className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Try Examples</h3>
            <p className="text-muted-foreground">Quick-start with pre-built examples</p>
          </div>
          <ExampleButtons onSelectExample={handleSelectExample} />
        </section>

        {/* Converter */}
        <Converter onConvert={handleConvert} exampleJson={selectedExample} />

        {/* Token Comparison */}
        {jsonTokens > 0 && toonTokens > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Token Comparison</h3>
              <p className="text-muted-foreground">See the difference in token count</p>
            </div>
            <TokenComparison jsonTokens={jsonTokens} toonTokens={toonTokens} />
          </section>
        )}

        {/* Cost Calculator */}
        {jsonTokens > 0 && toonTokens > 0 && (
          <CostCalculator jsonTokens={jsonTokens} toonTokens={toonTokens} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Built for developers who want to optimize AI API costs</p>
          <p className="mt-2">
            Learn more about TOON at{" "}
            <a 
              href="https://github.com/toon-format/toon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
