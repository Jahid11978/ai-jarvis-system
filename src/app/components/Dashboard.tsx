import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Activity, Cpu, HardDrive, Zap, Brain, Wrench, FlaskConical, BookOpen, Target } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'working';
  tasks: number;
  icon: any;
  color: string;
}

interface DashboardProps {
  isListening: boolean;
  setIsListening: (value: boolean) => void;
}

export function Dashboard({ isListening, setIsListening }: DashboardProps) {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [storageUsage, setStorageUsage] = useState(38);
  const [agents] = useState<Agent[]>([
    { id: '1', name: 'Planner', status: 'active', tasks: 3, icon: Target, color: 'from-blue-500 to-cyan-500' },
    { id: '2', name: 'Builder', status: 'working', tasks: 7, icon: Wrench, color: 'from-purple-500 to-pink-500' },
    { id: '3', name: 'Tester', status: 'active', tasks: 5, icon: FlaskConical, color: 'from-green-500 to-emerald-500' },
    { id: '4', name: 'Repairer', status: 'idle', tasks: 0, icon: Zap, color: 'from-orange-500 to-red-500' },
    { id: '5', name: 'Learner', status: 'active', tasks: 2, icon: BookOpen, color: 'from-yellow-500 to-orange-500' },
  ]);

  const [recentLogs, setRecentLogs] = useState([
    { time: '14:32:45', level: 'info', message: 'Planner: Task breakdown completed for web scraper' },
    { time: '14:32:41', level: 'success', message: 'Builder: Generated REST API with authentication' },
    { time: '14:32:38', level: 'info', message: 'Tester: Running validation on new component' },
    { time: '14:32:30', level: 'warning', message: 'Memory usage at 62% - monitoring' },
    { time: '14:32:22', level: 'success', message: 'Learner: Updated knowledge base with 15 new patterns' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(95, Math.max(20, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.min(90, Math.max(30, prev + (Math.random() - 0.5) * 8)));
      setStorageUsage(prev => Math.min(80, Math.max(20, prev + (Math.random() - 0.5) * 5)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cpuUsage.toFixed(1)}%</div>
            <Progress value={cpuUsage} className="mt-2" />
            <p className="text-xs text-slate-400 mt-2">8 cores active</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <Brain className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memoryUsage.toFixed(1)}%</div>
            <Progress value={memoryUsage} className="mt-2" />
            <p className="text-xs text-slate-400 mt-2">9.9 GB / 16 GB</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageUsage.toFixed(1)}%</div>
            <Progress value={storageUsage} className="mt-2" />
            <p className="text-xs text-slate-400 mt-2">19 GB / 50 GB</p>
          </CardContent>
        </Card>
      </div>

      {/* Autonomous Agents */}
      <Card className="bg-slate-900/50 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Autonomous Agents
          </CardTitle>
          <CardDescription>5 specialized agents working 24/7</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <div
                  key={agent.id}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{agent.name}</h3>
                  <Badge
                    variant={agent.status === 'active' ? 'default' : agent.status === 'working' ? 'secondary' : 'outline'}
                    className="mb-2"
                  >
                    {agent.status}
                  </Badge>
                  <p className="text-sm text-slate-400">{agent.tasks} active tasks</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Logs */}
      <Card className="bg-slate-900/50 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Recent Activity
          </CardTitle>
          <CardDescription>Real-time system logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            {recentLogs.map((log, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  log.level === 'success' ? 'bg-green-500/10 border-green-500/30' :
                  log.level === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  log.level === 'error' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <span className="text-slate-400">[{log.time}]</span>{' '}
                <span className={
                  log.level === 'success' ? 'text-green-400' :
                  log.level === 'warning' ? 'text-yellow-400' :
                  log.level === 'error' ? 'text-red-400' :
                  'text-blue-400'
                }>{log.level.toUpperCase()}</span>{' '}
                <span className="text-slate-200">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
            <CardDescription>All systems operational</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'JARVIS-OS', port: 8002, status: 'online' },
                { name: 'Deployment API', port: 8000, status: 'online' },
                { name: 'Visual Interface', port: 3000, status: 'online' },
                { name: 'ChromaDB', port: 8001, status: 'online' },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-slate-400">Port {service.port}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    ● {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader>
            <CardTitle>AI Models</CardTitle>
            <CardDescription>Multi-AI routing active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Ollama (Local)', model: 'llama3.2', status: 'active' },
                { name: 'Claude API', model: 'claude-3', status: 'standby' },
                { name: 'GPT-4', model: 'gpt-4-turbo', status: 'standby' },
              ].map((ai) => (
                <div key={ai.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                  <div>
                    <p className="font-medium">{ai.name}</p>
                    <p className="text-sm text-slate-400">{ai.model}</p>
                  </div>
                  <Badge 
                    className={ai.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                  >
                    {ai.status === 'active' ? '●' : '◐'} {ai.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
