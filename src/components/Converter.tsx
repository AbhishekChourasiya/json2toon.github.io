import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ConverterProps {
  onConvert: (json: string, toon: string) => void;
}

export const Converter = ({ onConvert }: ConverterProps) => {
  const [jsonInput, setJsonInput] = useState("");
  const [toonOutput, setToonOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const jsonToToon = (json: string): string => {
    try {
      const obj = JSON.parse(json);
      return objectToToon(obj);
    } catch (error) {
      throw new Error("Invalid JSON");
    }
  };

  const objectToToon = (obj: any, indent = 0): string => {
    const spaces = "  ".repeat(indent);
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      const items = obj.map(item => objectToToon(item, indent + 1)).join("\n");
      return `[\n${items}\n${spaces}]`;
    }
    
    if (obj === null) return "null";
    if (typeof obj !== "object") return JSON.stringify(obj);
    
    const entries = Object.entries(obj);
    if (entries.length === 0) return "{}";
    
    const lines = entries.map(([key, value]) => {
      const valueStr = objectToToon(value, indent + 1);
      return `${spaces}  ${key}: ${valueStr}`;
    });
    
    return `{\n${lines.join("\n")}\n${spaces}}`;
  };

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
