"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Key, Plus, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string | null;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  function generateKey() {
    if (!newKeyName.trim()) {
      toast.error("Enter a name for this key");
      return;
    }

    // Generate a fake key for MVP demo
    const key = `sk_${crypto.randomUUID().replace(/-/g, "")}`;
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name: newKeyName,
      prefix: key.slice(0, 10) + "...",
      createdAt: new Date().toISOString(),
      lastUsed: null,
    };

    setKeys((prev) => [newKey, ...prev]);
    setGeneratedKey(key);
    setNewKeyName("");
    toast.success("API key created");
  }

  function copyKey(key: string) {
    navigator.clipboard.writeText(key);
    toast.success("Copied to clipboard");
  }

  function deleteKey(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast.success("Key deleted");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">API Keys</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your API keys for programmatic access
        </p>
      </div>

      {/* Create key */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Create New Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Key name (e.g., Production)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateKey()}
            />
            <Button onClick={generateKey} className="shrink-0">
              <Plus className="h-4 w-4 mr-1" />
              Create
            </Button>
          </div>

          {generatedKey && (
            <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-2">
                Copy this key now — you won&apos;t see it again
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono bg-muted/30 px-3 py-2 rounded">
                  {generatedKey}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyKey(generatedKey)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API usage example */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto">
            {`curl -X POST https://snapledger.com/api/v1/process \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@invoice.jpg"`}
          </pre>
        </CardContent>
      </Card>

      {/* Existing keys */}
      {keys.length > 0 && (
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Active Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {keys.map((k) => (
              <div
                key={k.id}
                className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted/20"
              >
                <div className="flex items-center gap-3">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{k.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {k.prefix}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {k.lastUsed ? `Used ${k.lastUsed}` : "Never used"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => deleteKey(k.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
