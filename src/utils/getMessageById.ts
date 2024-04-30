import { Node } from "reactflow";

export function getMessageById(node: Node[], messageId: string) {
  const findNodeById = node?.filter((node: Node) => node.id === messageId);
  return findNodeById[0]?.data?.label;
}
