/**
 * Represents an AI/automation agent and its current runtime state.
 */
export interface Agent {
  /** Unique identifier for the agent. */
  id: string;
  /** Human-readable display name for the agent. */
  name: string;
  /** Current availability/status of the agent. */
  status: 'active' | 'idle' | 'offline';
  /** Current CPU usage percentage in the range 0-100. */
  cpu: number;
  /** Current memory usage percentage in the range 0-100. */
  memory: number;
  /** Number of tasks currently assigned or being handled. */
  tasks: number;
  /** Timestamp of last observed activity (ISO 8601 date-time string). */
  lastActivity: string;
}

/**
 * Represents a work item/task managed by the system.
 */
export interface Task {
  /** Unique identifier for the task. */
  id: string;
  /** Short title describing the task. */
  title: string;
  /** Detailed description of the task requirements. */
  description: string;
  /** Priority level used for scheduling/escalation. */
  priority: 'critical' | 'high' | 'medium' | 'low';
  /** Current execution lifecycle status for the task. */
  status: 'pending' | 'in-progress' | 'completed';
  /** Completion percentage in the range 0-100. */
  progress: number;
  /** Agent identifier (`Agent.id`) currently assigned to this task. */
  assignedTo: string;
}

/**
 * Represents aggregated system-level resource and health metrics.
 */
export interface SystemMetrics {
  /** Overall CPU usage percentage in the range 0-100. */
  cpu: number;
  /** Overall memory usage percentage in the range 0-100. */
  memory: number;
  /** Overall disk usage percentage in the range 0-100. */
  disk: number;
  /** System uptime in seconds. */
  uptime: number;
}

/**
 * Represents a processed voice command interaction.
 */
export interface VoiceCommand {
  /** Unique identifier for the voice command event. */
  id: string;
  /** Raw or normalized command text. */
  command: string;
  /** System response generated for the command. */
  response: string;
  /** Event timestamp (ISO 8601 date-time string). */
  timestamp: string;
}