import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { jsonToToon } from "@/utils/toonConverter";

interface ConverterProps {
  onConvert: (json: string, toon: string) => void;
  exampleJson?: string;
}

export const Converter = ({ onConvert, exampleJson }: ConverterProps) => {
  const [jsonInput, setJsonInput] = useState("");
  const [toonOutput, setToonOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto-load example JSON when provided
  useEffect(() => {
    if (exampleJson) {
      setJsonInput(exampleJson);
    }
  }, [exampleJson]);

  const handleConvert = () => {
    try {
      const toon = jsonToToon(jsonInput);
      setToonOutput(toon);
      onConvert(jsonInput, toon);
      toast.success("Converted successfully!");
    } catch (error) {
      toast.error("Invalid JSON input");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(toonOutput);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">JSON Input</h3>
        </div>
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="min-h-[400px] font-mono text-sm bg-code-bg border-code-border"
        />
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">TOON Output</h3>
          {toonOutput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8"
            >
              {copied ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        <div className="min-h-[400px] p-4 rounded-md bg-code-bg border border-code-border overflow-auto">
          <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
            {toonOutput || "Converted TOON will appear here..."}
          </pre>
        </div>
      </Card>

      <div className="md:col-span-2 flex justify-center">
        <Button
          onClick={handleConvert}
          disabled={!jsonInput}
          size="lg"
          className="gap-2"
        >
          Convert to TOON
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
