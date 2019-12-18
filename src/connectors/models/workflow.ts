export interface ServiceMetadata {
  id: string;
  title: string;
  token?: string;
}

export interface ActionMetadata {
  title: string;
  service: ServiceMetadata;
  arguments: [string, any][]
}

export interface WorkflowNode {
  id: string;
  action: ActionMetadata;
  is_conditional?: boolean;
  next_node_id?: string;
}

export interface Workflow {
  id: string;
  title: string;
  nodes: WorkflowNode[];
  last_executed?: string;
  status?: string;
  icon_id?: string;
}
