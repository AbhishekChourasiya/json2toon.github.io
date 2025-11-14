import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DollarSign, TrendingDown } from "lucide-react";

interface CostCalculatorProps {
  jsonTokens: number;
  toonTokens: number;
}

const API_MODELS = [
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", inputCost: 0.01, outputCost: 0.03 },
  { id: "gpt-4", name: "GPT-4", inputCost: 0.03, outputCost: 0.06 },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", inputCost: 0.0005, outputCost: 0.0015 },
  { id: "claude-3-opus", name: "Claude 3 Opus", inputCost: 0.015, outputCost: 0.075 },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", inputCost: 0.003, outputCost: 0.015 },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", inputCost: 0.00025, outputCost: 0.00125 },
  { id: "gemini-pro", name: "Gemini Pro", inputCost: 0.000125, outputCost: 0.000375 },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", inputCost: 0.00125, outputCost: 0.00375 },
];

export const CostCalculator = ({ jsonTokens, toonTokens }: CostCalculatorProps) => {
  const [selectedModel, setSelectedModel] = useState(API_MODELS[0]);
  const [dailyRequests, setDailyRequests] = useState([10000]);

  const calculateCost = (tokens: number, costPer1k: number) => {
    return (tokens / 1000) * costPer1k;
  };

  const jsonCostPerCall = calculateCost(jsonTokens, selectedModel.inputCost);
  const toonCostPerCall = calculateCost(toonTokens, selectedModel.inputCost);
  const savingsPerCall = jsonCostPerCall - toonCostPerCall;

  const dailyRequestsValue = dailyRequests[0];
  const monthlySavings = savingsPerCall * dailyRequestsValue * 30;

  return (
    <Card className="p-8 space-y-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Cost Savings Calculator</h3>
        <p className="text-muted-foreground">
          Compare API costs between JSON and TOON formats across different models
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Select API Model</label>
          <Select
            value={selectedModel.id}
            onValueChange={(value) => {
              const model = API_MODELS.find(m => m.id === value);
              if (model) setSelectedModel(model);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {API_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Input: ${selectedModel.inputCost}/1K tokens</div>
            <div>Output: ${selectedModel.outputCost}/1K tokens</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Daily API Requests: {dailyRequestsValue.toLocaleString()}
          </label>
          <Slider
            value={dailyRequests}
            onValueChange={setDailyRequests}
            min={1000}
            max={100000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1K</span>
            <span>100K</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 space-y-2 bg-muted/50">
          <div className="text-sm text-muted-foreground">JSON Cost/Call</div>
          <div className="text-2xl font-bold text-foreground flex items-baseline gap-1">
            <DollarSign className="h-5 w-5" />
            {jsonCostPerCall.toFixed(6)}
          </div>
        </Card>

        <Card className="p-4 space-y-2 bg-muted/50">
          <div className="text-sm text-muted-foreground">TOON Cost/Call</div>
          <div className="text-2xl font-bold text-foreground flex items-baseline gap-1">
            <DollarSign className="h-5 w-5" />
            {toonCostPerCall.toFixed(6)}
          </div>
        </Card>

        <Card className="p-4 space-y-2 bg-accent/10 border-accent/30">
          <div className="text-sm text-accent font-medium">Savings/Call</div>
          <div className="text-2xl font-bold text-accent flex items-baseline gap-1">
            <DollarSign className="h-5 w-5" />
            {savingsPerCall.toFixed(6)}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/20 to-primary/20 border-accent/40">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-accent" />
              Estimated Monthly Savings
            </div>
            <div className="text-4xl font-bold text-foreground flex items-baseline gap-1">
              <DollarSign className="h-8 w-8" />
              {monthlySavings.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {dailyRequestsValue.toLocaleString()} requests/day
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
};
